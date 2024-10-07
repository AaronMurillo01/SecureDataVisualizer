// Import required modules
const express = require('express'); // Web framework for Node.js
const cors = require('cors'); // Middleware to enable CORS
const crypto = require('crypto'); // Built-in module for cryptography
const fs = require('fs'); // File system module
const path = require('path'); // Module for handling file paths

// Initialize Express app
const app = express();

// Use CORS middleware to allow cross-origin requests
app.use(cors());

// Define encryption key and algorithm
const ENCRYPTION_KEY = '0123456789abcdef0123456789abcdef'; // 32 bytes key for AES-256
const ALGORITHM = 'aes-256-cbc'; // Encryption algorithm

/**
 * Function to encrypt text using AES-256-CBC algorithm
 * @param {string} text - Plain text to encrypt
 * @returns {string} - Encrypted text in hex format with IV
 */
function encrypt(text) {
  // Generate a random Initialization Vector
  const iv = crypto.randomBytes(16);
  // Create a Cipher object
  const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(ENCRYPTION_KEY, 'utf-8'), iv);
  // Encrypt the text
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  // Return IV and encrypted text concatenated
  return iv.toString('hex') + ':' + encrypted;
}

/**
 * API endpoint to get encrypted data
 */
app.get('/api/data', (req, res) => {
  // Read sensitive data from JSON file
  const dataPath = path.join(__dirname, 'data', 'sensitiveData.json');
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      // Handle error if file reading fails
      res.status(500).send({ error: 'Failed to read data' });
      return;
    }
    // Encrypt the data before sending
    const encryptedData = encrypt(data);
    // Send encrypted data as response
    res.send({ data: encryptedData });
  });
});

// Start the server on port 5000
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}`);
});
