const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

module.exports = function (app) {
  //  Security
  app.use(helmet());

  //  Cross-Origin Resource Sharing
  app.use(cors());

  //  Cookie Parsing
  app.use(cookieParser());

  //  Body Parsing
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  //  Logging
  app.use(morgan("dev"));

  // Static Assets from public/ (css, js, images, etc.)
  app.use(express.static(path.join(__dirname, "..", "public")));
};
