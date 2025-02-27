const { Ollama } = require('ollama')

const ollama = new Ollama({ host: 'http://localhost:11434' })

const getAnswer = async (baseContent, question, chatHistory) => {


    const formattedChatHistory = chatHistory.map(chat => `User: ${chat.question}\nAI: ${chat.answer}`).join('\n');

    const completePrompt = `
    You are a helpful AI assistant. You will be given a question. You must generate a most suitable answer based
    on the following context and don't mention anything about context, as 'based on provided text' or something like this,
     just provided only answer to asked question:
    ${baseContent}
    You have the following chat history:
    ${formattedChatHistory}
    Now you have to answer the following question:
    ${question}
    `

    const response = await ollama.chat({
        model: 'llama2:7b',
        messages: [{ role: 'user', content: completePrompt }],
    })

    const newChat = { question, answer: response?.message?.content };

    return { newChat };
}

module.exports = getAnswer;