import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import getAnswer from './llm.js';

const PORT = 9000;

const app = express();

app.use(cors());
app.use(bodyParser.json());

const chatHistory = [];

app.post('/api/v1/chat', async (req, res) => {
    const { baseContent, question } = req.body;

    const response = await getAnswer(baseContent, question, chatHistory);

    chatHistory.push(response?.newChat)

    res.send({ history: chatHistory });
});

app.listen(PORT, () => {
    console.log('Server running on port 9000');
});
