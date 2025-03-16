const express = require('express');
const { getSummary } = require('../llm');
const Documents = require('../models/Documents');
const verifyToken = require('../middlewares/verifyToken');
const { PDFLoader } = require('@langchain/community/document_loaders/fs/pdf');
const { RecursiveCharacterTextSplitter } = require("langchain/text_splitter");
const axios = require('axios');

const router = express.Router();

router.post('/upload', verifyToken, async (req, res) => {
    try {
        const uploadedFileUrl = req?.body?.url;

        const response = await axios.get(uploadedFileUrl, { responseType: 'arraybuffer' });

        // Convert the buffer to a Blob
        const pdfBlob = new Blob([response.data], { type: 'application/pdf' });

        const loader = new PDFLoader(pdfBlob);
        const rawDocs = await loader.load();

        const textSplitter = new RecursiveCharacterTextSplitter({
            chunkSize: 1000,
            chunkOverlap: 200,
        });
        const docs = await textSplitter.splitDocuments(rawDocs);
        let content = docs.map(doc => doc.pageContent).join(' ');

        // Get summary of the content
        const summary = await getSummary(content);

        // Create entry in table
        const newDocument = await Documents.create({
            title: req.body?.fileName,
            summary: summary,
            docUrl: uploadedFileUrl,
            userId: req.user.id
        });
        res.status(201).json({ message: 'File uploaded and processed', document: newDocument });

    } catch (error) {
        console.error('Error processing file:', error);
        res.status(500).json({ error: 'Failed to process file' });
    }
});

router.get('/', verifyToken, async (req, res) => {
    try {
        const documents = await Documents.findAll({ where: { userId: req.user.id } });
        res.status(200).json({ documents });
    } catch (error) {
        console.error('Error fetching documents:', error);
        res.status(500).json({ error: 'Failed to fetch documents' });
    }
});

router.get('/:id', verifyToken, async (req, res) => {
    try {
        const document = await Documents.findOne({ where: { id: req.params.id, userId: req.user.id } });
        if (!document) {
            return res.status(404).json({ error: 'Document not found' });
        }
        return res.status(200).json({ document });
    } catch (error) {
        console.error('Error fetching document:', error);
        return res.status(500).json({ error: 'Failed to fetch document' });
    }
})

module.exports = router;
