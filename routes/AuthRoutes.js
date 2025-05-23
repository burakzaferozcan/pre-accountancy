const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const { getConnection } = require("../config/dbConfig");
const { sanityFunction } = require("../utils/sanityFunction");
const { limiter } = require("../utils/BruteForce");
const JWTSECRET = process.env.JWTSECRET;

router.post(
  "/register",
  limiter,
  [
    check("userName", "Lütfen bir kullanıcı adı girniz").not().isEmpty(),
    check("userPassword", "Şifre en az 6 karakter olmalı").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { userName, userPassword } = req.body;
      const connection = await getConnection();

      const sUserName = sanityFunction(userName);
      const sUserPassword = sanityFunction(userPassword);

      if (!sUserName || !sUserPassword) {
        return res.status(400).json({
          success: false,
          message: "Lütfen geçerli veriler ile tekrar deneyiniz.",
        });
      }

      const sqlQuery = "CALL userLoginSP (?,?)";
      const existingUser = await connection.query(sqlQuery, [
        sUserName,
        sUserPassword,
      ]);

      if (existingUser[0][0].result.isFound === false) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(sUserPassword, salt);
        const sqlQuery2 = "CALL addUserSP (?,?)";
        const response = await connection.query(sqlQuery2, [
          sUserName,
          hashedPassword,
        ]);
        const payload = { user: response[0][0].result.userName };
        jwt.sign(payload, JWTSECRET, { expiresIn: "12h" }, (err, token) => {
          if (err) throw err;
          res.json({
            token,
            userName: response[0][0].result.userName,
            userID: response[0][0].result.userID,
          });
        });
        res.send(response[0][0].result);
      } else if (existingUser.length > 0) {
        return res.status(400).json({
          success: false,
          message: "Bu kullanıcı zaten mevcut",
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "Sunucu hatası",
        isRegistered: false,
      });
    }
  }
);

router.post(
  "/login",
  limiter,
  [
    check("userName", "Lütfen bir kullanıcı adı girniz").not().isEmpty(),
    check("userPassword", "Şifre en az 6 karakter olmalı").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { userName, userPassword } = req.body;
      const connection = await getConnection();

      const sUserName = sanityFunction(userName);
      const sUserPassword = sanityFunction(userPassword);

      if (!sUserName || !sUserPassword) {
        return res.status(400).json({
          success: false,
          message: "Lütfen geçerli veriler ile tekrar deneyiniz.",
        });
      }

      const sqlQuery = "CALL userLoginSP (?)";
      const existingUser = await connection.query(sqlQuery, [sUserName]);
      if (existingUser.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Kullanıcı adı veya şifre yanlış.",
        });
      }

      const currentPassword = existingUser[0][0].result.userPassword;
      const isMatch = await bcrypt.compare(sUserPassword, currentPassword);

      if (!isMatch) {
        return res.status(400).json({
          isLogin: false,
          message: "Kullanıcı adı veya şifre yanlış.",
        });
      }

      const payload = { user: response[0][0].result.userName };
      jwt.sign(payload, JWTSECRET, { expiresIn: "12h" }, (err, token) => {
        if (err) throw err;
        res.json({
          token,
          userName: response[0][0].result.userName,
          userID: existingUser[0][0].result.userID,
        });
      });
      res.send(response[0][0].result);
    } catch (error) {
      res.status(500).json({
        message: "Sunucu hatası",
        isRegistered: false,
      });
    }
  }
);

module.exports = {
  authRoutes: router,
};
