import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import sessionRoutes from "./routes/sessions.js";
import messageRoutes from "./routes/messages.js";
import logRoutes from "./routes/interactionLogs.js";
import { exec } from "child_process";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from "fs";

dotenv.config(); // Load environment variables from .env file

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(cors()); // Enable All CORS Requests
app.use(bodyParser.json()); // Parse incoming request bodies in a middleware before your handlers

// Routes
app.use("/api/sessions", sessionRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/logs", logRoutes);

// Route to handle OpenAI API call via Python script
app.post('/api/chat', (req, res) => {
  const { model, messages } = req.body;

  const apiRequestBody = {
    model,
    messages,
  };

  const scriptPath = path.join(__dirname, 'scripts', 'open_api_call.py');

  // Check if the file exists
  if (!fs.existsSync(scriptPath)) {
    console.error('Error: Script file not found at', scriptPath);
    return res.status(500).json({ error: 'Internal Server Error', details: 'Script file not found' });
  }

  const pythonProcess = exec(`python ${scriptPath}`, (error, stdout, stderr) => {
    if (error) {
      console.error('Error:', error);
      return res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }

    if (stderr) {
      console.error('Stderr:', stderr);
      return res.status(500).json({ error: 'Internal Server Error', details: stderr });
    }

    try {
      const response = JSON.parse(stdout);
      res.json(response);
    } catch (parseError) {
      console.error('Parse Error:', parseError);
      res.status(500).json({ error: 'Internal Server Error', details: parseError.message });
    }
  });

  pythonProcess.stdin.write(JSON.stringify(apiRequestBody));
  pythonProcess.stdin.end();
});

// Define the PORT and start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));