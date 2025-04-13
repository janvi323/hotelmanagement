const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

// ✅ Utility to convert dd-mm-yyyy to yyyy-mm-dd
function formatDateToISO(d) {
  if (!d || d.length < 10) return "";
  const [day, month, year] = d.split("-");
  return `${year}-${month}-${day}`;
}

// ✅ GET /book - Render booking confirmation page
router.get("/book", (req, res) => {
  console.log("✅ Book Now route hit:", req.query);

  const {
    hotelName,
    city,
    checkinDate,
    checkoutDate,
    guestName,
    guestEmail,
    guestPhone,
    numberOfGuests,
    includeFlight
  } = req.query;

  const formattedCheckin = formatDateToISO(checkinDate);
  const formattedCheckout = formatDateToISO(checkoutDate);

  // 🔢 Define price per night for each hotel
  let pricePerNight = 10000; // Default fallback
  if (hotelName === "Taj Fort Aguada Resort") pricePerNight = 18000;
  else if (hotelName === "W Goa") pricePerNight = 22500;
  else if (hotelName === "Alila Diwa Goa") pricePerNight = 15800;
  else if (hotelName === "Taj Jai Mahal Palace") pricePerNight = 20000;
  else if (hotelName === "The Oberoi Rajvilas") pricePerNight = 24000;
  else if (hotelName === "Ri Kynjai Resort") pricePerNight = 12500;
  else if (hotelName === "Polo Towers") pricePerNight = 8800;
  else if (hotelName === "Royal Heritage Tripura Castle") pricePerNight = 9500;

  res.render("book", {
    hotelName,
    city,
    checkinDate: formattedCheckin,
    checkoutDate: formattedCheckout,
    guestName,
    guestEmail,
    guestPhone,
    numberOfGuests,
    includeFlight,
    pricePerNight // ✅ required by book.ejs
  });
});

// ✅ POST /book/confirm - Save confirmed booking
router.post("/book/confirm", (req, res) => {
  if (!req.session.user) {
    req.session.errorMessage = "Please login to confirm booking.";
    return res.redirect("/login");
  }

  const {
    hotelName,
    city,
    checkinDate,
    checkoutDate,
    guestName,
    guestEmail,
    guestPhone,
    numberOfGuests,
    includeFlight,
    nights,
    totalPrice
  } = req.body;

  const newBooking = {
    id: Date.now().toString(),
    userEmail: req.session.user.email,
    guestName,
    hotel: hotelName,
    city,
    checkinDate,
    checkoutDate,
    nights,
    numberOfGuests,
    includeFlight: includeFlight === "yes",
    amount: totalPrice,
    bookedAt: new Date().toISOString()
  };

  const bookingsFile = path.join(__dirname, "../bookings.json");
  let bookings = [];

  if (fs.existsSync(bookingsFile)) {
    bookings = JSON.parse(fs.readFileSync(bookingsFile, "utf-8"));
  }

  bookings.push(newBooking);
  fs.writeFileSync(bookingsFile, JSON.stringify(bookings, null, 2));

  req.session.successMessage = "Booking Confirmed!";
  res.redirect("/booked");
});

// ✅ GET /booked - Success message page
router.get("/booked", (req, res) => {
  const msg = req.session.successMessage || "Booking successful!";
  req.session.successMessage = null;
  res.send(`
    <h2 style="font-family:Poppins;color:#013220;text-align:center;margin-top:50px;">✅ ${msg}</h2>
    <p style="text-align:center;"><a href="/dashboard">Back to Dashboard</a></p>
  `);
});

// ✅ GET /my-bookings - Show bookings for logged-in user
router.get("/my-bookings", (req, res) => {
  if (!req.session.user) return res.redirect("/login");

  const filePath = path.join(__dirname, "../bookings.json");
  let bookings = [];

  if (fs.existsSync(filePath)) {
    bookings = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  }

  const userBookings = bookings.filter(b => b.userEmail === req.session.user.email);

  res.render("mybooking", {
    bookings: userBookings,
    user: req.session.user
  });
});

// ✅ POST /book - Initial booking form submission (search page)
router.post("/book", (req, res) => {
  if (!req.session.user) {
    req.session.errorMessage = "Please login first to book!";
    return res.redirect("/login");
  }

  const { destination, guests, checkin, checkout, flights } = req.body;

  const booking = {
    id: Date.now().toString(),
    user: `${req.session.user.firstName} ${req.session.user.lastName}`,
    destination,
    guests,
    checkinDate: checkin,
    checkoutDate: checkout,
    flights: !!flights,
    bookedAt: new Date().toISOString()
  };

  const filePath = path.join(__dirname, "../bookings.json");
  let bookings = [];

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

  res.redirect("/dashboard");
});

module.exports = router;
