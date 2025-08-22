// Date: 07/29/2025
// Adapted from Oregon State Canvas CS 340: Module 6 Exploration: Web Application Technology
// Source URL: https://canvas.oregonstate.edu/courses/2007765/pages/exploration-web-application-technology-2?module_item_id=25664612

// Get an instance of mysql we can use in the app
let mysql = require('mysql2')

// Create a 'connection pool' using the provided credentials
const pool = mysql.createPool({
    waitForConnections: true,
    connectionLimit: 10,
    host: '{{host_name}}',
    user: '{{user_name}}',
    password: '{{password}}',
    database: '{{database_name}}'
}).promise(); // This makes it so we can use async / await rather than callbacks

// Export it for use in our application
module.exports = pool;