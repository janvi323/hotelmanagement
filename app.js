const express = require("express")
const fs = require("fs")
const path = require("path")
const morgan = require("morgan")
const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan("dev")) // HTTP request logger
app.use(express.static(path.join(__dirname, "."))) // Serve static files

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "login.html"))
})

app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "register.html"))
})

app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "dashboard.html"))
})

// API Routes
app.post("/api/login", (req, res) => {
  const { email, password } = req.body

  // Check if users.json exists, if not create it
  if (!fs.existsSync(path.join(__dirname, "users.json"))) {
    fs.writeFileSync(path.join(__dirname, "users.json"), JSON.stringify([]))
  }

  // Read users from file
  const usersData = fs.readFileSync(path.join(__dirname, "users.json"), "utf8")
  const users = JSON.parse(usersData)

  // Find user by email
  const user = users.find((user) => user.email === email)

  // Check if user exists and password matches
  if (!user) {
    return res.status(401).json({ message: "User not found. Please check your email or register." })
  }

  if (user.password !== password) {
    return res.status(401).json({ message: "Invalid password. Please try again." })
  }

  // Successful login
  return res.status(200).json({
    message: "Login successful",
    user: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    },
  })
})

app.post("/api/register", (req, res) => {
  const { firstName, lastName, email, password } = req.body

  // Validate input
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: "All fields are required." })
  }

  if (password.length < 8) {
    return res.status(400).json({ message: "Password must be at least 8 characters long." })
  }

  // Check if users.json exists, if not create it
  if (!fs.existsSync(path.join(__dirname, "users.json"))) {
    fs.writeFileSync(path.join(__dirname, "users.json"), JSON.stringify([]))
  }

  // Read users from file
  const usersData = fs.readFileSync(path.join(__dirname, "users.json"), "utf8")
  const users = JSON.parse(usersData)

  // Check if email already exists
  if (users.some((user) => user.email === email)) {
    return res.status(400).json({ message: "Email already in use. Please use a different email." })
  }

  // Create new user
  const newUser = {
    id: Date.now().toString(),
    firstName,
    lastName,
    email,
    password,
    createdAt: new Date().toISOString(),
  }

  // Add user to array
  users.push(newUser)

  // Write updated users array back to file
  fs.writeFileSync(path.join(__dirname, "users.json"), JSON.stringify(users, null, 2))

  // Successful registration
  return res.status(201).json({
    message: "Registration successful",
    user: {
      id: newUser.id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
    },
  })
})

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`Visit http://loalhost:${PORT} to access the application`)
})