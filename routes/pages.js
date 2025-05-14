const express = require("express");
const router = express.Router();
const User = require("../models/User"); // Mongoose User model import

// Home route
router.get("/", (req, res) => {
  res.redirect("/dashboard"); // Always show dashboard first
});

// Render login page
router.get("/login", (req, res) => {
  const errorMessage = req.session.errorMessage || null;
  req.session.errorMessage = null;
  const successMessage = req.session.successMessage || null;
  req.session.successMessage = null;
  res.render("login", { errorMessage, successMessage });
});

// Handle login form
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      req.session.errorMessage = "Invalid email!";
      return res.redirect("/login");
    }

    if (password !== user.password) {
      req.session.errorMessage = "Invalid password!";
      return res.redirect("/login");
    }

    req.session.user = user;
    return res.redirect("/dashboard");

  } catch (error) {
    console.log(error);
    req.session.errorMessage = "Something went wrong!";
    return res.redirect("/login");
  }
});

// Render register page
router.get("/register", (req, res) => {
  const errorMessage = req.session.errorMessage || null;
  req.session.errorMessage = null;
  const successMessage = req.session.successMessage || null;
  req.session.successMessage = null;
  res.render("register", { errorMessage, successMessage });
});

// Handle register form
router.post("/register", async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword, terms } = req.body;

  console.log("Received registration data:", req.body);

  // Basic validation
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

  try {
    // Check if the email already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      req.session.errorMessage = "Email already registered!";
      return res.redirect("/register");
    }

    // Create a new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
    });

    await newUser.save();
    console.log("New user saved:", newUser);  // Log the saved user

    req.session.successMessage = "Account created successfully!";
    return res.redirect("/login");

  } catch (error) {
    console.log("Error during registration:", error);
    req.session.errorMessage = "Something went wrong!";
    return res.redirect("/register");
  }
});

// Dashboard route
router.get("/dashboard", (req, res) => {
  console.log("📂 Public dashboard accessed.");
  res.render("dashboard", { user: req.session.user });
});

// Handle logout
router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.redirect("/dashboard");
    }
    res.redirect("/login");
  });
});

// Handle delete account
router.post("/delete", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    req.session.errorMessage = "Email is required to delete account!";
    return res.redirect("/dashboard");
  }

  try {
    const deletedUser = await User.findOneAndDelete({ email });

    if (!deletedUser) {
      req.session.errorMessage = "No user found with this email!";
      return res.redirect("/dashboard");
    }

    // Destroy session and logout the user
    req.session.destroy((err) => {
      if (err) {
        return res.redirect("/dashboard");
      }
      req.session.successMessage = "Account deleted successfully!";
      return res.redirect("/login");
    });

  } catch (error) {
    console.log(error);
    req.session.errorMessage = "An error occurred while deleting the account. Please try again.";
    return res.redirect("/dashboard");
  }
});

module.exports = router;
