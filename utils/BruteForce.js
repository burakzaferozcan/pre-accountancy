const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 50,
  message: "Çok fazla deneme yaptınız. Lütfen daha sonra tekrar deneyiniz.",
  standardHeaders: true,
  legacyHeaders: true,
});

module.exports = { limiter };
