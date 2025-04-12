const express = require("express");
const path = require("path");
const session = require("express-session");
const app = express();
const PORT = process.env.PORT || 3000;
const http = require('http');
const server = http.createServer(app); // Use http.createServer(app) for custom server

// View engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
require("./middleware/common")(app);

// Session management
app.use(session({
  secret: 'your-secret-key', // Change this to a secret key
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set 'secure: true' for HTTPS
}));

// Parse incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (CSS, JS, images, etc.)
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", require("./routes/pages"));
app.use("/", require("./routes/auth"));

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start server using http server
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
