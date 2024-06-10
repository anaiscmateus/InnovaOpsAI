import mongoose from 'mongoose';
import InteractionLog from '../models/InteractionLog.js';

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

// Get all interaction logs
export async function getAllInteractionLogs(event, context, callback) {
  await connectDB();
  try {
    const logs = await InteractionLog.find();
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(logs),
    });
  } catch (err) {
    callback(null, {
      statusCode: 500,
      body: JSON.stringify({ message: err.message }),
    });
  }
}

// Get logs by session ID
export async function getLogsBySessionId(event, context, callback) {
  await connectDB();
  const { sessionId } = event.pathParameters;

  try {
    const logs = await InteractionLog.find({ sessionId });
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(logs),
    });
  } catch (err) {
    callback(null, {
      statusCode: 500,
      body: JSON.stringify({ message: err.message }),
    });
  }
}

// Create a new log
export async function createLog(event, context, callback) {
  await connectDB();
  const req = JSON.parse(event.body);
  const newLog = new InteractionLog({
    logId: req.logId,
    sessionId: req.sessionId,
    eventType: req.eventType,
    details: req.details,
  });

  try {
    const log = await newLog.save();
    callback(null, {
      statusCode: 201,
      body: JSON.stringify(log),
    });
  } catch (err) {
    callback(null, {
      statusCode: 400,
      body: JSON.stringify({ message: err.message }),
    });
  }
}

// Delete a log
export async function deleteLog(event, context, callback) {
  await connectDB();
  const { id } = event.pathParameters;

  try {
    const log = await InteractionLog.findById(id);
    if (!log) {
      callback(null, {
        statusCode: 404,
        body: JSON.stringify({ message: 'Log not found' }),
      });
      return;
    }

    await log.remove();
    callback(null, {
      statusCode: 200,
      body: JSON.stringify({ message: 'Log removed' }),
    });
  } catch (err) {
    callback(null, {
      statusCode: 500,
      body: JSON.stringify({ message: err.message }),
    });
  }
}
