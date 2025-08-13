// Citation for the following file:
// Date: 8/12/2025
// Starter code/template code was adapted and modified from CS340 Exploration - Implementing CUD operations in your app


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


const PORT = 5647;

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
        const query = `SELECT 
            Reservation_Id,
            DATE_FORMAT(Check_In_Date, '%Y-%m-%d') AS Check_In_Date,
            DATE_FORMAT(Check_Out_Date, '%Y-%m-%d') AS Check_Out_Date,
            Num_Of_Guests,
            Num_Of_Pets
        FROM Reservations;`;
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
        const query = `SELECT 
            Invoice_Id,
            DATE_FORMAT(Invoice_Date, '%Y-%m-%d') AS Invoice_Date,
            Total_Due,
            DATE_FORMAT(Date_Paid, '%Y-%m-%d') AS Date_Paid,
            Guest_Id,
            Reservation_Id
        FROM Invoices;`;
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

app.post('/property_reservations/delete', async function (req, res) {

    let data = req.body;
    console.log(data);

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

// CREATE ROUTES
app.post('/invoices/create', async function (req, res) {
    try {
        // Parse frontend form information
        let data = req.body;

        // Cleanse data - If date_paid is empty, make it NULL.
        let datePaid = data.create_invoice_date_paid || null;
        
        // Validate required fields
        if (!data.create_invoice_date || !data.create_invoice_total_due || 
            !data.create_invoice_guest_id || !data.create_invoice_reservation_id) {
            return res.status(400).send('Missing required fields');
        }

        // Create and execute our queries
        // Using parameterized queries (Prevents SQL injection attacks)
        const query1 = `CALL sp_CreateInvoice(?, ?, ?, ?, ?, @new_id);`;

        // Store ID of last inserted row
        const [[[rows]]] = await db.query(query1, [
            data.create_invoice_date,
            data.create_invoice_total_due,
            datePaid,
            data.create_invoice_guest_id,
            data.create_invoice_reservation_id,
        ]);

        console.log(`CREATE invoice. ID: ${rows.new_id} ` +
            `Total Due: $${data.create_invoice_total_due} ` +
            `Guest ID: ${data.create_invoice_guest_id} ` +
            `Reservation ID: ${data.create_invoice_reservation_id}`
        );

        // Send success status to frontend
        res.status(200).json({ message: 'Invoice created successfully', invoiceId: rows.new_id });
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

// UPDATE ROUTES
app.post('/invoices/update', async function (req, res) {
    try {
        // Parse frontend form information
        const data = req.body;

        // Cleanse data - If date_paid is empty, make it NULL.
        let datePaid = data.update_invoice_date_paid || null;
        
        // Validate required fields
        if (!data.update_invoice_id || !data.update_invoice_date || !data.update_invoice_total_due || 
            !data.update_invoice_guest_id || !data.update_invoice_reservation_id) {
            return res.status(400).send('Missing required fields');
        }

        // Create and execute our query
        // Using parameterized queries (Prevents SQL injection attacks)
        const query1 = 'CALL sp_UpdateInvoice(?, ?, ?, ?, ?, ?);';
        const query2 = 'SELECT Invoice_Id, Total_Due FROM Invoices WHERE Invoice_Id = ?;';
        
        await db.query(query1, [
            data.update_invoice_id,
            data.update_invoice_date,
            data.update_invoice_total_due,
            datePaid,
            data.update_invoice_guest_id,
            data.update_invoice_reservation_id,
        ]);
        
        const [[rows]] = await db.query(query2, [data.update_invoice_id]);

        console.log(`UPDATE invoice. ID: ${data.update_invoice_id} ` +
            `Total Due: $${data.update_invoice_total_due} ` +
            `Guest ID: ${data.update_invoice_guest_id} ` +
            `Reservation ID: ${data.update_invoice_reservation_id}`
        );

        // Send success status to frontend
        res.status(200).json({ message: 'Invoice updated successfully' });
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

// ########################################
// ########## LISTENER

app.listen(PORT, function () {
    console.log('http://classwork.engr.oregonstate.edu:' + PORT + '; press Ctrl-C to terminate.');
});

