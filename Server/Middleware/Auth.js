const dotenv = require('dotenv').config();
const JWT = require('jsonwebtoken');

const Secure = (req, res, next) => {
    const authHeader = req.headers?.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader?.split(' ')[1]; // Extract the token from the "Bearer <token>" format

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        JWT.verify(token, 'qwertyuiopasdfghjklzxcvbnm', (err, user) => {
            if (err) {
                console.error('Token verification error:', err);
                return res.status(401).json({ message: "Invalid token" });
            }
            req.user = user;
            next();
        });
    } catch (err) {
        console.error('Token verification exception:', err);
        return res.status(403).json({ message: 'Invalid token' });
    }
};

module.exports = { Secure };