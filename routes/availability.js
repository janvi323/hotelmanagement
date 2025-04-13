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
        image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80"
      },
      {
        name: "Rambagh Palace",
        price: "₹32,000 per night",
        rating: 5,
        image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80"
      },
      {
        name: "Taj Jai Mahal Palace",
        price: "₹18,500 per night",
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=80"
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
        rating: 5,
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"
      },
      {
        name: "W Goa",
        price: "₹22,500 per night",
        rating: 5,
        image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80"
      },
      {
        name: "Alila Diwa Goa",
        price: "₹15,800 per night",
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80"
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
        image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=800&q=80"
      },
      {
        name: "Polo Towers",
        price: "₹8,800 per night",
        rating: 4,
        image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80"
      },
      {
        name: "Royal Heritage Tripura Castle",
        price: "₹9,500 per night",
        rating: 4,
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"
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
