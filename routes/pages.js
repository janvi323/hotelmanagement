const express = require("express");
const router = express.Router();
const { readUsers, writeUsers } = require("../utils/fileHandler");

// Home route
router.get("/", (req, res) => {
  res.redirect("/dashboard"); // Always show dashboard first
});

// Render login page
router.get("/login", (req, res) => {
  const errorMessage = req.session.errorMessage || null;
  req.session.errorMessage = null;
  res.render("login", { errorMessage });
});

// Handle login form
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const users = readUsers();
  const user = users.find(u => u.email === email);

  console.log("🔐 Login attempt:", email);

  if (!user) {
    console.log("❌ Email not found");
    req.session.errorMessage = "Invalid email!";
    return res.redirect("/login");
  }

  // ✅ Simple password comparison (no bcrypt)
  if (password !== user.password) {
    console.log("❌ Password incorrect");
    req.session.errorMessage = "Invalid password!";
    return res.redirect("/login");
  }

  req.session.user = user;
  console.log("✅ Login success:", user.email);
  return res.redirect("/dashboard");
});

// Render register page
router.get("/register", (req, res) => {
  const errorMessage = req.session.errorMessage || null;
  req.session.errorMessage = null;
  res.render("register", { errorMessage });
});

// Handle register form
router.post("/register", (req, res) => {
  const { firstName, lastName, email, password, confirmPassword, terms } = req.body;

  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    req.session.errorMessage = "All fields are required!";
    return res.redirect("/register");
  }

  if (password !== confirmPassword) {
    req.session.errorMessage = "Passwords do not match!";
    return res.redirect("/register");
  }

  if (!terms) {
    req.session.errorMessage = "You must agree to the terms!";
    return res.redirect("/register");
  }

  const users = readUsers();
  const userExists = users.find((u) => u.email === email);
  if (userExists) {
    req.session.errorMessage = "Email already registered!";
    return res.redirect("/register");
  }

  const newUser = {
    id: Date.now().toString(),
    firstName,
    lastName,
    email,
    password, // 👈 plain-text password
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  writeUsers(users);

  req.session.successMessage = "Account created successfully!";
  return res.redirect("/login");
});

// Dashboard route
router.get("/dashboard", (req, res) => {
  console.log("📂 Public dashboard accessed.");
  res.render("dashboard",{ user: req.session.user}); // No session check, public access
});



// Logout
router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.redirect("/dashboard");
    }
    res.redirect("/login");
  });
});

module.exports = router;
