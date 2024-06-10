import { exec } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function handler(event, context, callback) {
  const { model, messages } = JSON.parse(event.body);

  const apiRequestBody = {
    model,
    messages,
  };

  // Adjust the path to the script based on the new location
  const scriptPath = path.join(__dirname, '..', 'scripts', 'open_api_call.py');

  // Check if the file exists
  if (!fs.existsSync(scriptPath)) {
    console.error('Error: Script file not found at', scriptPath);
    callback(null, {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Internal Server Error',
        details: 'Script file not found',
      }),
    });
    return;
  }

  const pythonProcess = exec(`python ${scriptPath}`, (error, stdout, stderr) => {
    if (error) {
      console.error('Error:', error);
      callback(null, {
        statusCode: 500,
        body: JSON.stringify({
          error: 'Internal Server Error',
          details: error.message,
        }),
      });
      return;
    }

    if (stderr) {
      console.error('Stderr:', stderr);
      callback(null, {
        statusCode: 500,
        body: JSON.stringify({
          error: 'Internal Server Error',
          details: stderr,
        }),
      });
      return;
    }

    try {
      const response = JSON.parse(stdout);
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(response),
      });
    } catch (parseError) {
      console.error('Parse Error:', parseError);
      callback(null, {
        statusCode: 500,
        body: JSON.stringify({
          error: 'Internal Server Error',
          details: parseError.message,
        }),
      });
    }
  });

  pythonProcess.stdin.write(JSON.stringify(apiRequestBody));
  pythonProcess.stdin.end();
}
