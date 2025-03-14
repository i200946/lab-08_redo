const express = require('express');
const jwt = require('jsonwebtoken');
const { SECRET_KEY, users } = require('../config/config');

const router = express.Router();

// Register a new user
router.post('/register', (req, res) => {
    const { username, password } = req.body;
    if (users.find(user => user.username === username)) {
        return res.status(400).json({ message: "User already exists" });
    }
    users.push({ username, password });
    res.json({ message: "User registered successfully" });
});

// User login
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
});

module.exports = router;