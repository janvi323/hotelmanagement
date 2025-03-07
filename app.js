const express = require("express");
const fs = require("fs");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev")); // HTTP request logger
app.use(express.static(path.join(__dirname, "."))); // Serve static files
app.use(cors()); // Enable CORS for all routes
app.use(helmet()); // Secure app with various HTTP headers
app.use(compression()); // Compress response bodies
app.use(cookieParser()); // Parse cookies

// File path for users.json
const usersPath = path.join(__dirname, "users.json");

// Ensure users.json exists
if (!fs.existsSync(usersPath)) {
    fs.writeFileSync(usersPath, JSON.stringify([]));
}

// Utility function to read users.json safely
const readUsers = () => {
    try {
        const data = fs.readFileSync(usersPath, "utf8");
        return JSON.parse(data || "[]");
    } catch (error) {
        console.error("Error reading users.json:", error);
        return [];
    }
};

// Routes
app.get("/", (req, res) => {
    res.status(200).sendFile(path.join(__dirname, "login.html"));
});

app.get("/register", (req, res) => {
    res.status(200).sendFile(path.join(__dirname, "register.html"));
});

app.get("/dashboard", (req, res) => {
    res.status(200).sendFile(path.join(__dirname, "dashboard.html"));
});

// API: User Registration
app.post("/api/register", (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ message: "All fields are required." });
    }

    if (password.length < 8) {
        return res.status(400).json({ message: "Password must be at least 8 characters long." });
    }

    let users = readUsers();

    if (users.some(user => user.email === email)) {
        return res.status(409).json({ message: "Email already in use. Please use a different email." });
    }

    const newUser = {
        id: Date.now().toString(),
        firstName,
        lastName,
        email,
        password,
        createdAt: new Date().toISOString(),
        bookings: []
    };

    users.push(newUser);

    fs.writeFile(usersPath, JSON.stringify(users, null, 2), (err) => {
        if (err) {
            console.error("Error writing to users.json:", err);
            return res.status(500).json({ message: "Internal Server Error" });
        }

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
});

// API: User Login
app.post("/api/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." });
    }

    let users = readUsers();

    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
        return res.status(401).json({ message: "Invalid email or password." });
    }

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

// API: Save Booking
app.post("/api/saveBooking", (req, res) => {
    const { userId, bookingDetails } = req.body;

    if (!userId || !bookingDetails) {
        return res.status(400).json({ message: "User ID and booking details are required" });
    }

    let users = readUsers();

    let user = users.find(u => u.id === userId);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    if (!user.bookings) {
        user.bookings = [];
    }
    user.bookings.push(bookingDetails);

    fs.writeFile(usersPath, JSON.stringify(users, null, 2), (err) => {
        if (err) {
            console.error("Error writing to users.json:", err);
            return res.status(500).json({ message: "Internal Server Error" });
        }
        res.status(200).json({ message: "Booking saved successfully!", user });
    });
});

// 404 Middleware for undefined routes
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Visit http://localhost:${PORT} to access the application`);
});
