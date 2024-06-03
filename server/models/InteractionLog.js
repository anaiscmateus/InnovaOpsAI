// models/InteractionLog.js
import mongoose from 'mongoose';

const InteractionLogSchema = new mongoose.Schema({
    logId: {
        type: String,
        required: true,
        unique: true,
    },
    sessionId: {
        type: String,
        required: true,
    },
    eventType: {
        type: String,
        required: true,
    },
    details: String,
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

const InteractionLog = mongoose.model('InteractionLog', InteractionLogSchema);

export default InteractionLog;
