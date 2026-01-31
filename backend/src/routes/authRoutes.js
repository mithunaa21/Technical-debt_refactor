const express = require("express");
const router = express.Router();

const users = []; // demo only (in-memory)

/* SIGNUP */
router.post("/signup", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields required" });
  }

  const exists = users.find(u => u.email === email);
  if (exists) {
    return res.status(400).json({ error: "User already exists" });
  }

  users.push({ name, email, password });

  res.json({ message: "Signup successful" });
});

/* LOGIN */
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(
    u => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  res.json({
    message: "Login successful",
    user: { name: user.name, email: user.email }
  });
});

module.exports = router;
