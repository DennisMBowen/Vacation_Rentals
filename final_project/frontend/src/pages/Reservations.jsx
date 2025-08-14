// Date: 07/29/2025
// Adapted from Oregon State Canvas CS 340: Module 6 Exploration: Web Application Technology
// Source URL: https://canvas.oregonstate.edu/courses/2007765/pages/exploration-web-application-technology-2?module_item_id=25664612

import { useState, useEffect } from 'react';
import TableRow from '../components/TableRow';

function Reservations({ backendURL }) {
    const [reservations, setReservations] = useState([]);

    const getData = async function () {
        try {
            const response = await fetch(backendURL + '/reservations');
            const data = await response.json();
            setReservations(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <h1>Reservations</h1>
            <table>
                <thead>
                    <tr>
                        {reservations.length > 0 && Object.keys(reservations[0]).map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {reservations.map((reservation, index) => (
                        <TableRow key={index} rowObject={reservation} backendURL={backendURL} refreshReservation={getData} />
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default Reservations;