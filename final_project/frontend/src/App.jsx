import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import Guests from './pages/Guests';
import Properties from './pages/Properties';
import Reservations from './pages/Reservations';
import Invoices from './pages/Invoices';
import PropertyManagers from './pages/PropertyManagers';
import PropertyReservations from './pages/PropertyReservations';

// Components
import Navigation from './components/Navigation';

// Define the backend port and URL for API requests
const backendPort = 43800;  // Use the port you assigned to the backend server, this would normally go in a .env file
const backendURL = `http://classwork.engr.oregonstate.edu:${backendPort}`;

function App() {

    return (
        <>
            <Navigation />
            <Routes>
                <Route path="/" element={<Home backendURL={backendURL} />} />
                <Route path="/guests" element={<Guests backendURL={backendURL} />} />
                <Route path="/properties" element={<Properties backendURL={backendURL} />} />
                <Route path="/reservations" element={<Reservations backendURL={backendURL} />} />
                <Route path="/invoices" element={<Invoices backendURL={backendURL} />} />
                <Route path="/property_managers" element={<PropertyManagers backendURL={backendURL} />} />
                <Route path="/property_reservations" element={<PropertyReservations backendURL={backendURL} />} />
            </Routes>
        </>
    );

} export default App;