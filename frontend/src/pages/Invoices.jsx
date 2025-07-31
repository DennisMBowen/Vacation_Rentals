import { useState, useEffect } from 'react';
import TableRow from '../components/TableRow';
import CreateInvoiceForm from '../components/CreateInvoiceForm';
import UpdateInvoiceForm from '../components/UpdateInvoiceForm';

function Invoices({ backendURL }) {
    const [invoices, setInvoices] = useState([]);

    const getData = async function () {
        try {
            const response = await fetch(backendURL + '/invoices');
            const data = await response.json();
            setInvoices(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getData();
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
                        <TableRow key={index} rowObject={invoice} backendURL={backendURL} refreshInvoice={getData}/>
                    ))}
                </tbody>
            </table>
            <CreateInvoiceForm backendURL={backendURL} refreshInvoice={getData} />
            <UpdateInvoiceForm invoices={invoices} backendURL={backendURL} refreshInvoice={getData} />
        </>
    );
}

export default Invoices;