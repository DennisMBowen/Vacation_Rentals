import { useState, useEffect } from 'react';
import TableRow from '../components/TableRow';
import CreateReservationForm from '../components/CreateReservationForm';
import UpdateReservationForm from '../components/UpdateReservationForm';

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
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {reservations.map((reservation, index) => (
                        <TableRow key={index} rowObject={reservation} backendURL={backendURL} refreshReservation={getData} />
                    ))}
                </tbody>
            </table>
            <CreateReservationForm backendURL={backendURL} refreshReservation={getData} />
            <UpdateReservationForm reservations={reservations} backendURL={backendURL} refreshReservation={getData} />
        </>
    );
}

export default Reservations;