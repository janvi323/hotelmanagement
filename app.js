const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

// View engine setup 👇
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
require("./middleware/common")(app);

// Routes
app.use("/", require("./routes/pages"));
app.use("/api", require("./routes/auth"));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT}`);
});
