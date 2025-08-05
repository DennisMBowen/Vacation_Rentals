import { useState, useEffect } from 'react';  // Importing useState for managing state in the component
import TableRow from '../components/TableRow';
import CreateGuestForm from '../components/CreateGuestForm';
import UpdateGuestForm from '../components/UpdateGuestForm';


function Guests({ backendURL }) {

    // State for guests array
    const [guests, setGuests] = useState([]);
    ;
    // Fetch guests from backend
    const getData = async function () {
        try {
            // Make a GET request to the backend
            const response = await fetch(backendURL + '/guests');
            // http://classwork.engr.oregonstate.edu:${backendPort}
            // const response = await fetch('http://classwork.engr.oregonstate.edu:43900/guests');

            // Convert the response into JSON format
            const data = await response.json();

            // Update the people state with the response data
            setGuests(data); // Set the guests array directly

        } catch (error) {
            // If the API call fails, print the error to the console
            console.log(error);
        }

    };

    // Load table on page load
    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <h1>Guests</h1>

            <table>
                <thead>
                    <tr>
                        {guests.length > 0 && Object.keys(guests[0]).map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {guests.map((guest, index) => (
                        <TableRow key={index} rowObject={guest} backendURL={backendURL} refreshGuest={getData} />
                    ))}

                </tbody>
            </table>

            <CreateGuestForm backendURL={backendURL} refreshGuest={getData} />
            <UpdateGuestForm guests={guests} backendURL={backendURL} refreshGuest={getData} />
        </>
    );

} export default Guests;