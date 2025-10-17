const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const PORT = 3000;
const SECRET_KEY = "mysecretkey";

// --- Hardcoded user ---
const user = { username: "admin", password: "password123" };

// Login Route → JWT बनाता है
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === user.username && password === user.password) {
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });
    return res.json({ message: "Login successful", token });
  }

  res.status(401).json({ message: "Invalid credentials" });
});

// Middleware to verify token
function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(403).json({ message: "Token required" });

  const token = authHeader.split(" ")[1];
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err)
      return res.status(401).json({ message: "Invalid or expired token" });
    req.user = decoded;
    next();
  });
}

// Protected Route
app.get("/protected", verifyToken, (req, res) => {
  res.json({ message: `Welcome, ${req.user.username}! You have access.` });
});

app.get("/", (req, res) => {
  res.send("Public route. Use POST /login then GET /protected.");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
