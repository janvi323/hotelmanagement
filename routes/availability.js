const express = require("express");
const router = express.Router();

// Sample data for hotels and flights per location
const data = {
  jaipur: {
    hotels: [
      {
        name: "The Oberoi Rajvilas",
        price: "₹25,000 per night",
        rating: 5,
        image: "/images/oberoi.jpg"
      },
      {
        name: "Rambagh Palace",
        price: "₹32,000 per night",
        rating: 5,
        image: "/images/rambagh.jpg"
      },
      {
        name: "Taj Jai Mahal Palace",
        price: "₹18,500 per night",
        rating: 4.5,
        image: "/images/tajmahal.jpg"
      }
    ],
    flights: [
      "IndiGo – ₹3,500", "Air India – ₹5,200", "SpiceJet – ₹2,800"
    ]
  },
  goa: {
    hotels: [
      {
        name: "Taj Fort Aguada Resort",
        price: "₹18,000 per night",
        rating: 4.7,
        image: "/images/tajfort.jpg"
      },
      {
        name: "W Goa",
        price: "₹22,500 per night",
        rating: 5,
        image: "/images/wgoa.webp"
      },
      {
        name: "Alila Diwa Goa",
        price: "₹15,800 per night",
        rating: 4.5,
        image: "/images/alia.jpg"
      }
    ],
    flights: [
      "IndiGo – ₹4,200", "Air India – ₹5,800", "Vistara – ₹6,500"
    ]
  },
  shillong: {
    hotels: [
      {
        name: "Ri Kynjai Resort",
        price: "₹12,500 per night",
        rating: 4.5,
        image: "/images/rikynjai.jpg"
      },
      {
        name: "Polo Towers",
        price: "₹8,800 per night",
        rating: 4,
        image: "/images/polo.avif"
      },
      {
        name: "Royal Heritage Tripura Castle",
        price: "₹9,500 per night",
        rating: 4,
        image: "/images/tripura.jpg"
      }
    ],
    flights: [
      "IndiGo – ₹5,800", "Alliance Air – ₹6,200"
    ]
  }
};

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
