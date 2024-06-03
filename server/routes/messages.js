// routes/messages.js
import express from 'express';
const router = express.Router();
import Message from '../models/Message.js';

// Get all messages
router.get('/', async (req, res) => {
    try {
        const messages = await Message.find();
        res.json(messages);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get messages by session ID
router.get('/session/:sessionId', async (req, res) => {
    try {
        const messages = await Message.find({ sessionId: req.params.sessionId });
        res.json(messages);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new message
router.post('/', async (req, res) => {
    const newMessage = new Message({
        messageId: req.body.messageId,
        sessionId: req.body.sessionId,
        sender: req.body.sender,
        content: req.body.content,
    });

    try {
        const message = await newMessage.save();
        res.status(201).json(message);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a message
router.delete('/:id', async (req, res) => {
    try {
        const message = await Message.findById(req.params.id);
        if (!message) return res.status(404).json({ message: 'Message not found' });

        await message.remove();
        res.json({ message: 'Message removed' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
