import mongoose from 'mongoose';
import Message from '../models/Message.js';

// Helper function to connect to the database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

// Get all messages
export async function getAllMessages(event, context, callback) {
  await connectDB();
  try {
    const messages = await Message.find();
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(messages),
    });
  } catch (err) {
    callback(null, {
      statusCode: 500,
      body: JSON.stringify({ message: err.message }),
    });
  }
}

// Get messages by session ID
export async function getMessagesBySessionId(event, context, callback) {
  await connectDB();
  const { sessionId } = event.pathParameters;

  try {
    const messages = await Message.find({ sessionId });
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(messages),
    });
  } catch (err) {
    callback(null, {
      statusCode: 500,
      body: JSON.stringify({ message: err.message }),
    });
  }
}

// Create a new message
export async function createMessage(event, context, callback) {
  await connectDB();
  const req = JSON.parse(event.body);
  const newMessage = new Message({
    messageId: req.messageId,
    sessionId: req.sessionId,
    sender: req.sender,
    content: req.content,
  });

  try {
    const message = await newMessage.save();
    callback(null, {
      statusCode: 201,
      body: JSON.stringify(message),
    });
  } catch (err) {
    callback(null, {
      statusCode: 400,
      body: JSON.stringify({ message: err.message }),
    });
  }
}

// Delete a message
export async function deleteMessage(event, context, callback) {
  await connectDB();
  const { id } = event.pathParameters;

  try {
    const message = await Message.findById(id);
    if (!message) {
      callback(null, {
        statusCode: 404,
        body: JSON.stringify({ message: 'Message not found' }),
      });
      return;
    }

    await message.remove();
    callback(null, {
      statusCode: 200,
      body: JSON.stringify({ message: 'Message removed' }),
    });
  } catch (err) {
    callback(null, {
      statusCode: 500,
      body: JSON.stringify({ message: err.message }),
    });
  }
}
