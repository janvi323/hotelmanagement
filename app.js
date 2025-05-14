const express = require("express");
const path = require("path");
const session = require("express-session");
const app = express();
const PORT =  3000;
const http = require('http');
const server = http.createServer(app);
const mongoose = require("mongoose");
const pagesRouter = require("./routes/pages"); // Your routes file // Use http.createServer(app) for custom server

// View engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
require("./middleware/common")(app);

mongoose.connect("mongodb://localhost:27017/eliteescapes", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch((error) => console.error("Error connecting to MongoDB:", error));

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
app.use((req, res, next) => {
  res.locals.user = req.session.user || null; // 👈 Global access in EJS
  next();
});
// Routes
app.use("/", require("./routes/pages"));
app.use("/", require("./routes/bookingHandler"));
app.use("/", require("./routes/availability"));
app.use("/", pagesRouter);
app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.get('/faq', (req, res) => {
  res.render('faq');
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start server using http server
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
