// Get all sessions
import mongoose from 'mongoose';
import Session from '../models/Session.js';

export async function getAllSessions(event, context, callback) {
  await connectDB();
  try {
    const sessions = await Session.find();
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(sessions),
    });
  } catch (err) {
    callback(null, {
      statusCode: 500,
      body: JSON.stringify({ message: err.message }),
    });
  }
}

// Create a new session
export async function createSession(event, context, callback) {
  await connectDB();
  const req = JSON.parse(event.body);
  const newSession = new Session({
    sessionId: req.sessionId,
  });

  try {
    const session = await newSession.save();
    callback(null, {
      statusCode: 201,
      body: JSON.stringify(session),
    });
  } catch (err) {
    callback(null, {
      statusCode: 400,
      body: JSON.stringify({ message: err.message }),
    });
  }
}

// Update a session (e.g., end a session)
export async function updateSession(event, context, callback) {
  await connectDB();
  const { id } = event.pathParameters;
  const req = JSON.parse(event.body);

  try {
    const session = await Session.findById(id);
    if (!session) {
      callback(null, {
        statusCode: 404,
        body: JSON.stringify({ message: "Session not found" }),
      });
      return;
    }

    if (req.endTime) session.endTime = req.endTime;
    if (req.status) session.status = req.status;

    const updatedSession = await session.save();
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(updatedSession),
    });
  } catch (err) {
    callback(null, {
      statusCode: 400,
      body: JSON.stringify({ message: err.message }),
    });
  }
}

// Delete a session
export async function deleteSession(event, context, callback) {
  await connectDB();
  const { id } = event.pathParameters;

  try {
    const session = await Session.findById(id);
    if (!session) {
      callback(null, {
        statusCode: 404,
        body: JSON.stringify({ message: "Session not found" }),
      });
      return;
    }

    await session.remove();
    callback(null, {
      statusCode: 200,
      body: JSON.stringify({ message: "Session removed" }),
    });
  } catch (err) {
    callback(null, {
      statusCode: 500,
      body: JSON.stringify({ message: err.message }),
    });
  }
}
