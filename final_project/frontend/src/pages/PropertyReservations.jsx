// Date: 07/29/2025
// Adapted from Oregon State Canvas CS 340: Module 6 Exploration: Web Application Technology
// Source URL: https://canvas.oregonstate.edu/courses/2007765/pages/exploration-web-application-technology-2?module_item_id=25664612

import { useState, useEffect } from 'react';
import PRTableRow from '../components/PropertyReservationsTableRow';

function PropertyReservations({ backendURL }) {
    const [propertyReservations, setPropertyReservations] = useState([]);

    const getData = async function () {
        try {
            const response = await fetch(backendURL + '/property_reservations');
            const data = await response.json();
            setPropertyReservations(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <h1>Property Reservations</h1>
            <table>
                <thead>
                    <tr>
                        {propertyReservations.length > 0 && Object.keys(propertyReservations[0]).map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {propertyReservations.map((pr, index) => (
                        <PRTableRow key={index} rowObject={pr} backendURL={backendURL} refreshPropertyReservation={getData} />
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default PropertyReservations;