import { useState, useEffect } from 'react';
import TableRow from '../components/TableRow';
import CreateInvoiceForm from '../components/CreateInvoiceForm';
import UpdateInvoiceForm from '../components/UpdateInvoiceForm';

function Invoices({ backendURL }) {
    const [invoices, setInvoices] = useState([]);
    const [guests, setGuests] = useState([]);
    const [reservations, setReservations] = useState([]);

    const getData = async function () {
        try {
            const response = await fetch(backendURL + '/invoices');
            const data = await response.json();
            setInvoices(data);
        } catch (error) {
            console.log(error);
        }
    };

    const getGuestsData = async function () {
        try {
            const response = await fetch(backendURL + '/guests');
            const data = await response.json();
            setGuests(data);
        } catch (error) {
            console.log(error);
        }
    };

    const getReservationsData = async function () {
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
        getGuestsData();
        getReservationsData();
    }, []);

    return (
        <>
            <h1>Invoices</h1>
            <table>
                <thead>
                    <tr>
                        {invoices.length > 0 && Object.keys(invoices[0]).map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {invoices.map((invoice, index) => (
                        <TableRow key={index} rowObject={invoice} backendURL={backendURL} refreshInvoice={getData} />
                    ))}
                </tbody>
            </table>
            <CreateInvoiceForm 
                guests={guests} 
                reservations={reservations} 
                backendURL={backendURL} 
                refreshInvoices={getData} 
            />
            <UpdateInvoiceForm 
                invoices={invoices} 
                guests={guests} 
                reservations={reservations} 
                backendURL={backendURL} 
                refreshInvoices={getData} 
            />
        </>
    );
}

export default Invoices;