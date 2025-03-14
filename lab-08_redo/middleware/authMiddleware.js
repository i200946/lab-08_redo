const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config/config');

const authenticate = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ message: "No token provided" });
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return res.status(401).json({ message: "Unauthorized" });
        req.user = decoded.username;
        next();
    });
};

module.exports = { authenticate };