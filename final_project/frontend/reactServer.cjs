// reactServer.cjs
// Uses common JavaScript to serve the React build folder (/dist)

const express = require('express');
const path = require('path');
const app = express();

// Hardcode react PORT here, but this is normally done inside .env file
const PORT = 50055;

// Serve the stat files from the React app located in the build footer '/dist'
// React router will take over front end routing
app.use(express.static(path.join(__dirname, 'dist')));

// Handles any requests that don't match aboves to return the React app
// A request to '/nonExist' will redirect to the index.html where react router takes over at '/'
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server running: http://classwork.engr.orgeonstate.edu:${PORT}`);
});