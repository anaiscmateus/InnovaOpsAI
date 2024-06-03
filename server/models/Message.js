// models/Message.js
import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
    messageId: {
        type: String,
        required: true,
        unique: true,
    },
    sessionId: {
        type: String,
        required: true,
    },
    sender: {
        type: String,
        enum: ['user', 'bot'],
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

const Message = mongoose.model('Message', MessageSchema);

export default Message;
