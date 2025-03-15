const { Ollama } = require('ollama')

const ollama = new Ollama({ host: process.env.LLM_URL })

const getSummary = async (content) => {
    const summaryPrompt = `
    Consider yourself as expert in summarizing the large documents, consider following points in while summarizing any documents.
    1. Summary should reflect the overall context of the document.
    2. Summary should not exceed 2000 characters.
    3. Don't missout important terminologies in the document.
    4. Don't mention anything like 'here is a summary' or anything like that kind of sentences before summary, just return only summary of the provided content.
    Now by considering above instructions summarize the following document:
    ${content}
    `
    console.log('getting summary....')
    const response = await ollama.chat({
        model: 'llama2:7b',
        messages: [{ role: 'user', content: summaryPrompt }],
    })

    console.log('summary response....', response)

    return response?.message?.content;
}

const getAnswer = async (baseContent, question, chatHistory) => {


    const formattedChatHistory = chatHistory.map(chat => `User: ${chat.question}\nAI: ${chat.answer}`).join('\n');

    const completePrompt = `
    You are a helpful AI assistant. You will be given a question. You must generate a most suitable answer based
    on the following context and don't mention anything about context, as 'based on provided text' or something like this,
    just provided only answer to the asked question:
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

module.exports = { getAnswer, getSummary };