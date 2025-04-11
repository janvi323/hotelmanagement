const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "..", "data", "users.json");

function ensureFileExists() {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([]));
  }
}

function readUsers() {
  ensureFileExists();
  const usersData = fs.readFileSync(filePath, "utf8");
  return JSON.parse(usersData);
}

function writeUsers(users) {
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
}

module.exports = { readUsers, writeUsers };
