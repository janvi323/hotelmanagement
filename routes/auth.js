const express = require("express");
const { readUsers, writeUsers } = require("../utils/fileHandler");
const router = express.Router();

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const users = readUsers();

  const user = users.find((u) => u.email === email);
  if (!user) {
    return res.status(401).json({ message: "User not found. Please register." });
  }

  if (user.password !== password) {
    return res.status(401).json({ message: "Invalid password." });
  }

  res.cookie("userSession", user.id, { httpOnly: true, maxAge: 86400000 });

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

router.post("/register", (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  if (password.length < 8) {
    return res.status(400).json({ message: "Password must be at least 8 characters long." });
  }

  const users = readUsers();
  if (users.some((u) => u.email === email)) {
    return res.status(400).json({ message: "Email already in use." });
  }

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
