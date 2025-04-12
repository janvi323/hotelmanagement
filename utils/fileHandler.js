const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "..", "users.json");

function ensureFileExists() {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([]));
  }
}

function readUsers() {
  try {
    ensureFileExists();
    const usersData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(usersData);
  } catch (err) {
    console.error("Error reading users.json:", err);
    return [];
  }
}

function writeUsers(users) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
  } catch (err) {
    console.error("Error writing to users.json:", err);
  }
}

module.exports = { readUsers, writeUsers };
