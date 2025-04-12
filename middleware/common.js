const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

module.exports = function (app) {
  // Security Headers
  app.use(helmet());

  // CORS - Allow requests from specific domains
  app.use(cors());

  // Cookie Parser - Parsing cookies
  app.use(cookieParser());

  // Body Parsing - Parse incoming JSON and url-encoded data
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Logging - HTTP request logging using morgan
  app.use(morgan("dev"));

  // Static Assets - Serve static files (css, js, images, etc.)
  app.use(express.static(path.join(__dirname, "..", "public")));
};
