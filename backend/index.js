const express = require('express');
const cors = require('cors');
const getAnswer = require('./llm.js');
const sequelize = require('./config/db.js');
const User = require('./models/User.js');
const authRoutes = require('./routes/auth.js');


require('dotenv').config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());

const chatHistory = [];

app.use('/api/v1/auth', authRoutes);

app.post('/api/v1/chat', async (req, res) => {
    const { baseContent, question } = req.body;

    const response = await getAnswer(baseContent, question, chatHistory);

    chatHistory.push(response?.newChat)

    res.send({ history: chatHistory });
});

sequelize.sync({ force: false }).then(() => {
    console.log('Database connected...and tables synced.');

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}...`);
    });
})


