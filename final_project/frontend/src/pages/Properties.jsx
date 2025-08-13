// Date: 07/29/2025
// Adapted from Oregon State Canvas CS 340: Module 6 Exploration: Web Application Technology
// Source URL: https://canvas.oregonstate.edu/courses/2007765/pages/exploration-web-application-technology-2?module_item_id=25664612

import { useState, useEffect } from 'react';
import TableRow from '../components/TableRow';

function Properties({ backendURL }) {
    const [properties, setProperties] = useState([]);

    const getData = async function () {
        try {
            const response = await fetch(backendURL + '/properties');
            const data = await response.json();
            setProperties(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <h1>Properties</h1>
            <table>
                <thead>
                    <tr>
                        {properties.length > 0 && Object.keys(properties[0]).map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {properties.map((property, index) => (
                        <TableRow key={index} rowObject={property} backendURL={backendURL} refreshProperty={getData} />
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default Properties;