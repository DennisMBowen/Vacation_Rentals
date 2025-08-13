import { useState, useEffect } from 'react';
import PRTableRow from '../components/PropertyReservationsTableRow';

function PropertyReservations({ backendURL }) {
    const [propertyReservations, setPropertyReservations] = useState([]);

    const getData = async function () {
        console.log("Property reservations found");
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