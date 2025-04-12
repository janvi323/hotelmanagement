const express = require("express");
const { readUsers, writeUsers } = require("../utils/fileHandler");
const router = express.Router();

// Login Route
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const users = readUsers();

  const user = users.find((u) => u.email === email);
  if (!user) {
    req.session.errorMessage = "User not found. Please register.";  // Set error message in session
    return res.status(401).json({ message: "User not found. Please register." });
  }

  if (user.password !== password) {
    req.session.errorMessage = "Invalid password.";  // Set error message in session
    return res.status(401).json({ message: "Invalid password." });
  }

  // Set user session cookie
  res.cookie("userSession", user.id, { httpOnly: true, maxAge: 86400000 });

  // Successful login response
  res.status(200).json({
    message: "Login successful",
    user: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    },
  });
});

// Registration Route
router.post("/register", (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName || !email || !password) {
    req.session.errorMessage = "All fields are required.";  // Set error message in session
    return res.status(400).json({ message: "All fields are required." });
  }

  if (password.length < 8) {
    req.session.errorMessage = "Password must be at least 8 characters long.";  // Set error message in session
    return res.status(400).json({ message: "Password must be at least 8 characters long." });
  }

  const users = readUsers();
  if (users.some((u) => u.email === email)) {
    req.session.errorMessage = "Email already in use.";  // Set error message in session
    return res.status(400).json({ message: "Email already in use." });
  }

  // Create new user and save to the database
  const newUser = {
    id: Date.now().toString(),
    firstName,
    lastName,
    email,
    password,
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  writeUsers(users);

  // Successful registration response
  res.status(201).json({
    message: "Registration successful",
    user: {
      id: newUser.id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
    },
  });
});

module.exports = router;
