// Date: 07/29/2025
// Adapted from Oregon State Canvas CS 340: Module 6 Exploration: Web Application Technology
// Source URL: https://canvas.oregonstate.edu/courses/2007765/pages/exploration-web-application-technology-2?module_item_id=25664612

// ########################################
// ########## SETUP

// Database
const db = require('./database/db-connector');

// Express
const express = require('express');
const app = express();

// Middleware
const cors = require('cors');
app.use(cors({ credentials: true, origin: "*" }));
app.use(express.json()); // this is needed for post requests


const PORT = 43800;

// ########################################
// ########## ROUTE HANDLERS

// READ ROUTES

// Get all guests
app.get('/guests', async (req, res) => {
    try {
        const query = 'SELECT * FROM Guests;';
        const [guests] = await db.query(query);
        res.status(200).json(guests);
    } catch (error) {
        console.error("Error executing Guests query:", error);
        res.status(500).send("An error occurred while fetching guests.");
    }
});

// Get all properties
app.get('/properties', async (req, res) => {
    try {
        const query = 'SELECT * FROM Properties;';
        const [properties] = await db.query(query);
        res.status(200).json(properties);
    } catch (error) {
        console.error("Error executing Properties query:", error);
        res.status(500).send("An error occurred while fetching properties.");
    }
});

// Get all reservations
app.get('/reservations', async (req, res) => {
    try {
        const query = 'SELECT * FROM Reservations;';
        const [reservations] = await db.query(query);
        res.status(200).json(reservations);
    } catch (error) {
        console.error("Error executing Reservations query:", error);
        res.status(500).send("An error occurred while fetching reservations.");
    }
});

// Get all invoices
app.get('/invoices', async (req, res) => {
    try {
        const query = 'SELECT * FROM Invoices;';
        const [invoices] = await db.query(query);
        res.status(200).json(invoices);
    } catch (error) {
        console.error("Error executing Invoices query:", error);
        res.status(500).send("An error occurred while fetching invoices.");
    }
});

// Get all property managers
app.get('/property_managers', async (req, res) => {
    try {
        const query = 'SELECT * FROM Property_Managers;';
        const [managers] = await db.query(query);
        res.status(200).json(managers);
    } catch (error) {
        console.error("Error executing Property Managers query:", error);
        res.status(500).send("An error occurred while fetching property managers.");
    }
});

// Get all property reservations
app.get('/property_reservations', async (req, res) => {
    try {
        const query = 'SELECT * FROM Property_Reservations;';
        const [propertyReservations] = await db.query(query);
        res.status(200).json(propertyReservations);
    } catch (error) {
        console.error("Error executing Property Reservations query:", error);
        res.status(500).send("An error occurred while fetching property reservations.");
    }
});

// Date: 08/05/225
// Adapted from Oregon State Canvas CS 340: Module 8 Exploration: Implementing CUD operations in your app
// Source URL: https://canvas.oregonstate.edu/courses/2007765/pages/exploration-implementing-cud-operations-in-your-app?module_item_id=25664628
app.post('/property_reservations/delete', async function (req, res) {

    let data = req.body;

    const query = 'DELETE FROM Property_Reservations WHERE Property_Reservation_Id = ?';
    db.query(query, [data.property_reservation_id], (err, result) => {
        if (err) {
            console.error("Error deleting property reservations row", err);
            res.status(500).send(`An error occurred while delete property reservation with id ${prop_res_id}`);
        }
        if (result.afffectRows === 0) {
            res.status(404).send(`Property reservation with id ${prop_res_id} not found`);
        }
        res.status(200).send(`Property reservation with id ${prop_res_id} successfully delete`);
    });

});

app.post('/refresh_database', async function (req, res) {

    try {
        await db.query("CALL sp_PopulateDatabase();");
        res.status(200).send("Database reset");
    }
    catch (error) {
        res.status(500).send("An error occurred while refreshing the database");
    }

});

// ########################################
// ########## LISTENER

app.listen(PORT, function () {
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.');
});