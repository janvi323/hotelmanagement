const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("login"); // login.ejs
});

router.get("/register", (req, res) => {
  res.render("register"); // register.ejs
});

router.get("/dashboard", (req, res) => {
  res.render("dashboard"); // dashboard.ejs
});

module.exports = router;
