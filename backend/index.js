const express = require('express');
const cors = require('cors');
const getAnswer = require('./llm.js');
const sequelize = require('./config/db.js');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.js');
const userRoutes = require('./routes/user.js');
const documentRoutes = require('./routes/document.js');


require('dotenv').config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(cookieParser());

const chatHistory = [];

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/document', documentRoutes)


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

//I want to take file as input, and extract content from it, then use some llm model to get the summary of the file content and implement the chat feature where user can ask any question to ai so that model will provide response by analysing the content of the file, provide my step by step process to implement this feature, need system design info to solve this problem statement.


