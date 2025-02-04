const JWT = require('jsonwebtoken');

const  Secure = async (req, res, next) => {
    try {
        const token = req.cookies.token; // Access token directly
        if (!token) {
            return res.status(401).send({ message: 'Please Login First' });
        }

        // Verify the token
        const decode = JWT.verify(token, process.env.JWT_SECRET);
        req.user = decode; // Attach user data to the request
        next(); // Proceed to the next middleware or route
    } catch (error) {
        console.error("Token Verification Error:", error.message); // Debugging log
        return res.status(401).send({ message: 'Invalid Token' });
    }
};

module.exports = { Secure };
