import { useState, useEffect } from 'react';
import TableRow from '../components/TableRow';
import CreatePropertyForm from '../components/CreatePropertyForm';
import UpdatePropertyForm from '../components/UpdatePropertyForm';

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
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {properties.map((property, index) => (
                        <TableRow key={index} rowObject={property} backendURL={backendURL} refreshProperty={getData}/>
                    ))}
                </tbody>
            </table>
            <CreatePropertyForm backendURL={backendURL} refreshProperty={getData} />
            <UpdatePropertyForm properties={properties} backendURL={backendURL} refreshProperty={getData} />
        </>
    );
}

export default Properties;