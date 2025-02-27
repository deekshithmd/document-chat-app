const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");

const router = express.Router();

// Register a new user

router.post(
    "/register",
    [
        body("name").notEmpty().withMessage("Name is required"),
        body("email").isEmail().withMessage("Invalid email"),
        body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters long"),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const { name, email, password } = req.body;
            console.log('data:', req.body);
            let user = await User.findOne({ where: { email } });
            if (user) {
                return res.status(400).json({ errors: [{ msg: "Email already exists" }] });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            user = await User.create({ name, email, password: hashedPassword });

            return res.status(201).json({ msg: "User registered successfully" });
        } catch (error) {
            return res.status(500).json({ error: 'Failed to register user' });
        }

    }
)

// Login a user
router.post('/login', [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').notEmpty().withMessage('Password is required')],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ where: { email } });
            if (!user) {
                return res.status(400).json({ errors: [{ msg: 'User not found' }] });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
            }

            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES });


            // Set the token as an HTTP-only cookie
            res.cookie('token', token, {
                httpOnly: true, // Cookie accessible only through HTTP(S)
                //secure: process.env.NODE_ENV === 'production', // Send cookie only over HTTPS in production
                maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
                sameSite: 'Lax', // or 'Strict' for more security
            });


            res.json({ msg: 'Successfully logged in' });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ error: 'Error while finding user data' });
        }
    }
)

router.post('/logout', async (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Logged out successfully' })
})

module.exports = router;

