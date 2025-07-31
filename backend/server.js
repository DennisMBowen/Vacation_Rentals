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


const PORT = 15542;

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

// ########################################
// ########## LISTENER

app.listen(PORT, function () {
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.');
});