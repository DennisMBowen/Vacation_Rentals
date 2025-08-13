// Date: 07/29/2025
// Adapted from Oregon State Canvas CS 340: Module 6 Exploration: Web Application Technology
// Source URL: https://canvas.oregonstate.edu/courses/2007765/pages/exploration-web-application-technology-2?module_item_id=25664612

// Microsoft Copilot AI was used in return section to remove extra header column in the table.
// Date: 08/12/2025
// Source URL: https://copilot.microsoft.com/
// Prompt used: "Based on the following code block:
// <thead> <tr> {guests.length > 0 && Object.keys(guests[0]).map((header, index) => ( <th key={index}>{header}</th> ))} <th></th> </tr> </thead>
// How do I remove one column in the header?"



import { useState, useEffect } from 'react';  // Importing useState for managing state in the component
import TableRow from '../components/TableRow';

// 


function Guests({ backendURL }) {

    // State for guests array
    const [guests, setGuests] = useState([]);
    ;
    // Fetch guests from backend
    const getData = async function () {
        try {
            // Make a GET request to the backend
            console.log(backendURL);
            const response = await fetch(backendURL + '/guests');

            // Convert the response into JSON format
            const data = await response.json();
            console.log(data);
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
                    </tr>
                </thead>

                <tbody>
                    {guests.map((guest, index) => (
                        <TableRow key={index} rowObject={guest} backendURL={backendURL} refreshGuest={getData} />
                    ))}

                </tbody>
            </table>
        </>
    );

} export default Guests;