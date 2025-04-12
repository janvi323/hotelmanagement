const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();



// POST /book - Save booking data
router.post("/book", (req, res) => {
  if (!req.session.user) {
    req.session.errorMessage = "Please login first to book!";
    return res.redirect("/login");
  }
  const { destination, guests, checkin, checkout, flights } = req.body;

  const booking = {
    id: Date.now().toString(),
    user: req.session.user
      ? `${req.session.user.firstName} ${req.session.user.lastName}`
      : "Guest",
    destination,
    guests,
    checkin,
    checkout,
    flights: !!flights,
    bookedAt: new Date().toISOString()
  };

  const filePath = path.join(__dirname, "../bookings.json");
  let bookings = [];

  // Read existing bookings
  if (fs.existsSync(filePath)) {
    try {
      const data = fs.readFileSync(filePath, "utf8");
      bookings = JSON.parse(data);
    } catch (err) {
      console.error("❌ Error reading bookings.json:", err);
    }
  }

  bookings.push(booking);

  try {
    fs.writeFileSync(filePath, JSON.stringify(bookings, null, 2));
    console.log("✅ Booking saved:", booking);
  } catch (err) {
    console.error("❌ Error writing to bookings.json:", err);
  }

  res.redirect("/dashboard"); // or redirect to a confirmation page if you want
});

module.exports = router;
