const express = require("express");
const router = express.Router();

// Route to the home page, redirect to the dashboard if logged in
router.get("/", (req, res) => {
  if (req.session.user) {
    return res.redirect("/dashboard"); // Redirect to dashboard if logged in
  }
  res.redirect("/login"); // Otherwise, redirect to login page
});

// Route to render the login page
router.get("/login", (req, res) => {
  const errorMessage = req.session.errorMessage || null;
  req.session.errorMessage = null;  // Clear the error message after showing it
  res.render("login", { errorMessage });
});

// Route to handle login form submission
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = { email: "user@example.com", password: "password123" }; // Replace with actual DB query

  if (email === user.email && password === user.password) {
    req.session.user = user; // Store user in session
    return res.redirect("/dashboard"); // Redirect to dashboard after successful login
  }

  req.session.errorMessage = "Invalid credentials!";
  return res.redirect("/login"); // Redirect back to login page if credentials are incorrect
});

// Route to render the register page
router.get("/register", (req, res) => {
  const errorMessage = req.session.errorMessage || null;
  req.session.errorMessage = null;
  res.render("register", { errorMessage });
});

// Route to handle registration form submission
router.post("/register", (req, res) => {
  const { firstName, lastName, email, password, confirmPassword, terms } = req.body;

  if (password !== confirmPassword) {
    req.session.errorMessage = "Passwords do not match!";
    return res.redirect("/register"); // Redirect back to the register page if passwords don't match
  }

  if (!terms) {
    req.session.errorMessage = "You must agree to the terms and conditions!";
    return res.redirect("/register");
  }

  // Registration logic (e.g., saving the user to the database)
  req.session.successMessage = "Account created successfully! Please log in.";
  return res.redirect("/login"); // Redirect to the login page after successful registration
});

// Route to render the dashboard page
router.get("/dashboard", (req, res) => {
  if (!req.session.user) {
    return res.redirect("/login"); // If the user is not logged in, redirect to login
  }
  res.render("dashboard"); // Render dashboard if user is logged in
});

// Route to log out
router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.redirect("/dashboard");
    }
    res.redirect("/login"); // Redirect to login page after logout
  });
});

module.exports = router;
