// backend/middleware/verifyToken.js
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Import your User model

const verifyToken = async (req, res, next) => {
    const token = req.cookies.token;

    // 2. Check if Token Exists
    if (!token) {
        return res.status(401).json({ error: 'No token provided, access denied' });
    }

    try {
        // 3. Verify Token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 4. Find User by ID
        const user = await User.findByPk(decoded.id); // Assuming your JWT payload has a user ID

        // 5. Check if User Exists
        if (!user) {
            return res.status(401).json({ error: 'Invalid token, user not found' });
        }

        // 6. Attach User to Request
        req.user = user; // This makes the user object accessible in subsequent routes

        // 7. Call Next Middleware
        next();
    } catch (error) {
        // 8. Handle Token Errors
        console.error('Token verification error:', error);
        return res.status(400).json({ error: 'Invalid token' });
    }
};

module.exports = verifyToken;
