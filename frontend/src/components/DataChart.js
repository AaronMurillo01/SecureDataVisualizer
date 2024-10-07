import React, { useEffect, useState } from 'react';
import axios from 'axios'; // HTTP client for API requests
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts'; // Chart components
import CryptoJS from 'crypto-js'; // Library for cryptography

// Encryption key and algorithm details (must match the backend)
const ENCRYPTION_KEY = '0123456789abcdef0123456789abcdef'; // 32 bytes key
const ALGORITHM = 'AES'; // Encryption algorithm

/**
 * DataChart component fetches encrypted data from the backend,
 * decrypts it, and renders a line chart.
 */
function DataChart() {
  // State to hold the decrypted data
  const [data, setData] = useState([]);

  // useEffect hook to fetch data on component mount
  useEffect(() => {
    // Function to fetch data
    const fetchData = async () => {
      try {
        // Make a GET request to the backend API
        const response = await axios.get('http://localhost:5000/api/data');
        // Extract encrypted data from the response
        const encryptedData = response.data.data;

        // Decrypt the data
        const decryptedData = decrypt(encryptedData);

        // Update state with the parsed JSON data
        setData(JSON.parse(decryptedData));
      } catch (error) {
        console.error('Error fetching or decrypting data:', error);
      }
    };

    fetchData();
  }, []);

  /**
   * Function to decrypt text using CryptoJS
   * @param {string} encryptedText - Encrypted text in hex format with IV
   * @returns {string} - Decrypted plain text
   */
  function decrypt(encryptedText) {
    // Split the encrypted text to get IV and ciphertext
    const textParts = encryptedText.split(':');
    const iv = CryptoJS.enc.Hex.parse(textParts[0]);
    const ciphertext = CryptoJS.enc.Hex.parse(textParts[1]);

    // Decrypt the ciphertext using AES
    const decrypted = CryptoJS.AES.decrypt(
      { ciphertext },
      CryptoJS.enc.Hex.parse(ENCRYPTION_KEY),
      {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      }
    );

    // Convert decrypted data to UTF-8 string
    return decrypted.toString(CryptoJS.enc.Utf8);
  }

  // Render the line chart using Recharts components
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <LineChart width={600} height={300} data={data}>
        {/* Define the line for the chart */}
        <Line type="monotone" dataKey="value" stroke="#8884d8" />
        {/* Add grid lines to the chart */}
        <CartesianGrid stroke="#ccc" />
        {/* Configure the X-axis */}
        <XAxis dataKey="name" />
        {/* Configure the Y-axis */}
        <YAxis />
        {/* Add tooltips on hover */}
        <Tooltip />
      </LineChart>
    </div>
  );
}

export default DataChart;
