// routes/sessions.js
import express from 'express';
const router = express.Router();
import Session from '../models/Session.js';

// Get all sessions
router.get('/', async (req, res) => {
    try {
        const sessions = await Session.find();
        res.json(sessions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new session
router.post('/', async (req, res) => {
    const newSession = new Session({
        sessionId: req.body.sessionId,
    });

    try {
        const session = await newSession.save();
        res.status(201).json(session);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a session (e.g., end a session)
router.patch('/:id', async (req, res) => {
    try {
        const session = await Session.findById(req.params.id);
        if (!session) return res.status(404).json({ message: 'Session not found' });

        if (req.body.endTime) session.endTime = req.body.endTime;
        if (req.body.status) session.status = req.body.status;

        const updatedSession = await session.save();
        res.json(updatedSession);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a session
router.delete('/:id', async (req, res) => {
    try {
        const session = await Session.findById(req.params.id);
        if (!session) return res.status(404).json({ message: 'Session not found' });

        await session.remove();
        res.json({ message: 'Session removed' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
