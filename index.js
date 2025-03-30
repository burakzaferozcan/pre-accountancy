const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const express = require("express");
const Customer = require("./routes/CustomerRoutes");
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,DELETE,PATCH,OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "Origin,X-Requested-With,Content-Type,Accept,Authorization"
  );
  next();
});

app.use("/api/customer", Customer.customerRoutes);

app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor`);
});
