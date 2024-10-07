# Secure Data  Visualizer

## Introduction

**Secure Data Visualizer** is a full-stack web application designed to securely handle and visualize sensitive data. This project demonstrates secure coding practices, backend and frontend development, and effective data visualization techniques. It is tailored to align with national security and data analysis, showcasing the ability to manage sensitive information securely.

## Features

- **Secure Data Handling:** Implements AES-256-CBC encryption for data protection.
- **Backend API:** Built with Node.js and Express.js to serve encrypted data.
- **Interactive Frontend:** Developed using React.js to create a responsive user interface.
- **Data Visualization:** Utilizes Recharts for dynamic and interactive charts.
- **Cross-Origin Resource Sharing (CORS):** Enabled to allow secure cross-origin requests.
- **Comprehensive Documentation:** Detailed comments and explanations within the codebase.

## Technology Stack

- **Backend:**
  - Node.js
  - Express.js
  - Crypto (Node.js built-in module)
  - CORS

- **Frontend:**
  - React.js
  - Axios
  - Recharts
  - Crypto-JS

## Project Structure

```
secure-data-visualizer/
├── backend/
│   ├── package.json
│   ├── server.js
│   └── data/
│       └── sensitiveData.json
├── frontend/
│   ├── package.json
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── App.js
│       ├── index.js
│       └── components/
│           └── DataChart.js
└── README.md
```

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- **Node.js and npm:** [Download and install Node.js](https://nodejs.org/) (npm is included with Node.js).
- **Git:** [Download and install Git](https://git-scm.com/).

## Installation

Follow these steps to set up the Secure Data Visualizer on your local machine.

### Backend Setup

1. **Clone the Repository**

   Open your terminal and clone the repository:

   ```bash
   git clone https://github.com/your-username/secure-data-visualizer.git
   ```

2. **Navigate to the Backend Directory**

   ```bash
   cd secure-data-visualizer/backend
   ```

3. **Install Backend Dependencies**

   Install the required Node.js packages:

   ```bash
   npm install
   ```

4. **Review Sensitive Data**

   The `sensitiveData.json` file contains mock sensitive data. You can modify it as needed:

   ```json
   [
     { "name": "Experiment A", "value": 42 },
     { "name": "Experiment B", "value": 58 },
     { "name": "Experiment C", "value": 36 }
   ]
   ```

### Frontend Setup

1. **Open a New Terminal Window**

   Keep the backend running in the current terminal and open a new one for the frontend.

2. **Navigate to the Frontend Directory**

   ```bash
   cd secure-data-visualizer/frontend
   ```

3. **Install Frontend Dependencies**

   Install the required npm packages:

   ```bash
   npm install
   ```

## Running the Application

After completing the installation steps, you can run both the backend and frontend servers.

### Start the Backend Server

1. **Navigate to the Backend Directory**

   If not already in the backend directory, navigate back:

   ```bash
   cd secure-data-visualizer/backend
   ```

2. **Start the Server**

   ```bash
   npm start
   ```

   The backend server will start on [http://localhost:5000](http://localhost:5000).
   You should see a message in the terminal:

   ```bash
   Backend server is running on port 5000
   ```

### Start the Frontend Application

1. **Navigate to the Frontend Directory**

   Open the frontend terminal if not already there:

   ```bash
   cd secure-data-visualizer/frontend
   ```

2. **Start the React App**

   ```bash
   npm start
   ```

   The frontend application will launch in your default browser at [http://localhost:3000](http://localhost:3000).
   If it doesn't open automatically, navigate to the URL manually.

## Usage

Once both servers are running:

### Access the Application

Open your browser and go to [http://localhost:3000](http://localhost:3000).

### View the Data Visualization

- You will see a heading: **"Secure Data Visualizer"**.
- Below the heading, an interactive line chart displays the decrypted data from the backend.
- The data is securely fetched, encrypted during transit, and decrypted on the frontend before visualization.

### Inspecting the Data

- Open your browser's developer console to view any logs or errors.
- If there are issues with data fetching or decryption, error messages will be displayed here.

## Code Explanation

### Backend (`server.js`)

The `server.js` file handles:

- **Encryption Function (`encrypt`)**: Encrypts plain text using the AES-256-CBC algorithm. It generates a random Initialization Vector (IV) for each encryption to enhance security.
- **API Endpoint (`/api/data`)**: Reads sensitive data from `sensitiveData.json`, encrypts it using the `encrypt` function, and sends the encrypted data as a JSON response.
- **CORS Middleware**: Enables Cross-Origin Resource Sharing to allow the frontend application to communicate with the backend API.

### Frontend (`DataChart.js`)

The `DataChart.js` file handles:

- **State Management**: Utilizes React's `useState` to manage the decrypted data.
- **Data Fetching**: Uses `axios` to send a GET request to the backend API endpoint (`/api/data`) to retrieve the encrypted data.
- **Decryption Function (`decrypt`)**: Decrypts the received encrypted data using CryptoJS, matching the encryption parameters used in the backend.
- **Data Visualization**: Implements Recharts to render a responsive and interactive line chart based on the decrypted data.

## Important Notes

- **Encryption Key Security**: The encryption key (`ENCRYPTION_KEY`) is hardcoded for demonstration purposes. In a production environment, always use environment variables or secure key management systems to handle sensitive keys.
- **Synchronization of Encryption Parameters**: Ensure that the encryption keys and algorithms are consistent between the backend and frontend to enable successful encryption and decryption.
- **CORS Configuration**: Adjust the CORS settings as needed to restrict or allow specific origins.
- **Error Handling**: Basic error handling is implemented. For enhanced user experience, consider displaying user-friendly error messages within the UI.
- **Port Configuration**: Ensure the backend runs on port 5000 and the frontend on port 3000, or adjust as necessary.

## Contributing

Contributions are welcome! If you'd like to enhance the Secure Data Visualizer, feel free to submit a pull request or open an issue.
