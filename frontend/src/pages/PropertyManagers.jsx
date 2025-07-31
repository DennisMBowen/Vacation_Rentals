import { useState, useEffect } from 'react';
import TableRow from '../components/TableRow';
import CreatePropertyManagerForm from '../components/CreatePropertyManagerForm';
import UpdatePropertyManagerForm from '../components/UpdatePropertyManagerForm';

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
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {managers.map((manager, index) => (
                        <TableRow key={index} rowObject={manager} backendURL={backendURL} refreshPropertyManager={getData}/>
                    ))}
                </tbody>
            </table>
            <CreatePropertyManagerForm backendURL={backendURL} refreshPropertyManager={getData} />
            <UpdatePropertyManagerForm managers={managers} backendURL={backendURL} refreshPropertyManager={getData} />
        </>
    );
}

export default PropertyManagers;