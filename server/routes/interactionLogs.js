// routes/interactionLogs.js
import express from 'express';
const router = express.Router();
import InteractionLog from '../models/InteractionLog.js';

// Get all interaction logs
router.get('/', async (req, res) => {
    try {
        const logs = await InteractionLog.find();
        res.json(logs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get logs by session ID
router.get('/session/:sessionId', async (req, res) => {
    try {
        const logs = await InteractionLog.find({ sessionId: req.params.sessionId });
        res.json(logs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new log
router.post('/', async (req, res) => {
    const newLog = new InteractionLog({
        logId: req.body.logId,
        sessionId: req.body.sessionId,
        eventType: req.body.eventType,
        details: req.body.details,
    });

    try {
        const log = await newLog.save();
        res.status(201).json(log);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a log
router.delete('/:id', async (req, res) => {
    try {
        const log = await InteractionLog.findById(req.params.id);
        if (!log) return res.status(404).json({ message: 'Log not found' });

        await log.remove();
        res.json({ message: 'Log removed' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
