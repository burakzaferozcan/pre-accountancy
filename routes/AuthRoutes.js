const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
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

      const sqlQuery = "CALL userLoginSP (?,?)";
      const existingUser = await connection.query(sqlQuery, [
        userName,
        userPassword,
      ]);
      if (existingUser.length > 0) {
        return res.status(400).json({
          success: false,
          message: "Bu kullanıcı zaten mevcut",
        });
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(userPassword, salt);
      const sqlQuery2 = "CALL addUserSP (?,?)";
      const response = await connection.query(sqlQuery, [
        userName,
        userPassword,
      ]);
      const payload = { user: response[0][0].userName };
      jwt.sign(payload, JWTSECRET, { expiresIn: "12h" }, (err, token) => {
        if (err) throw err;
        res.json({ token, userName, userID: response[0][0].userID });
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
