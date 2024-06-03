// models/Session.js
import mongoose from 'mongoose';

const SessionSchema = new mongoose.Schema({
    sessionId: {
        type: String,
        required: true,
        unique: true,
    },
    startTime: {
        type: Date,
        default: Date.now,
    },
    endTime: Date,
    status: {
        type: String,
        enum: ['active', 'completed', 'abandoned'],
        default: 'active',
    },
});

const Session = mongoose.model('Session', SessionSchema);

export default Session;
