const express = require("express");
const router = express.Router();
const data = require("../locations.json"); 
// Sample data for hotels and flights per location

 

// POST: /search → redirect to destination
router.post("/search", (req, res) => {
  const { destination, checkin, checkout, guests, flights } = req.body;

  if (!data[destination.toLowerCase()]) {
    return res.send("❌ Location not found.");
  }

  const query = new URLSearchParams({
    checkin,
    checkout,
    guests,
    flights: flights ? "true" : "false"
  }).toString();

  res.redirect(`/search/${destination.toLowerCase()}?${query}`);
});

// GET: /search/:location → availability page
router.get("/search/:location", (req, res) => {
  const { location } = req.params;
  const { checkin, checkout, guests, flights } = req.query;

  const city = location.toLowerCase();
  const hotels = data[city]?.hotels || [];
  const showFlights = flights === "true";
  const flightsList = showFlights ? data[city]?.flights || [] : [];

  res.render("availability", {
    location: city,
    hotels,
    flights: flightsList,
    showFlights,
    checkin: req.query.checkin,
  checkout: req.query.checkout, 
  guests: req.query.guests,
  showFlights: req.query.flights === "true",
  user: req.session.user
  });
});

module.exports = router;
