import { useState, useEffect } from 'react';
import TableRow from '../components/TableRow';
import CreatePropertyReservationForm from '../components/CreatePropertyReservationForm';
import UpdatePropertyReservationForm from '../components/UpdatePropertyReservationForm';

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
                        <TableRow key={index} rowObject={pr} backendURL={backendURL} refreshPropertyReservation={getData} />
                    ))}
                </tbody>
            </table>
            <CreatePropertyReservationForm backendURL={backendURL} refreshPropertyReservation={getData} />
            <UpdatePropertyReservationForm propertyReservations={propertyReservations} backendURL={backendURL} refreshPropertyReservation={getData} />
        </>
    );
}

export default PropertyReservations;