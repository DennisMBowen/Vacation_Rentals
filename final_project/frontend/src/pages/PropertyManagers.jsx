// Date: 07/29/2025
// Adapted from Oregon State Canvas CS 340: Module 6 Exploration: Web Application Technology
// Source URL: https://canvas.oregonstate.edu/courses/2007765/pages/exploration-web-application-technology-2?module_item_id=25664612

import { useState, useEffect } from 'react';
import TableRow from '../components/TableRow';

function PropertyManagers({ backendURL }) {
    const [managers, setManagers] = useState([]);

    const getData = async function () {
        try {
            const response = await fetch(backendURL + '/property_managers');
            const data = await response.json();
            setManagers(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <h1>Property Managers</h1>
            <table>
                <thead>
                    <tr>
                        {managers.length > 0 && Object.keys(managers[0]).map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {managers.map((manager, index) => (
                        <TableRow key={index} rowObject={manager} backendURL={backendURL} refreshPropertyManager={getData} />
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default PropertyManagers;