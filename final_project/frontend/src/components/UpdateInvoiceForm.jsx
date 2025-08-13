// Citation for the following file:
// Date: 8/12/2025
// Starter code/template code was adapted and modified from CS340 Exploration - Implementing CUD operations in your app

import React, { useState, useEffect } from 'react';

const UpdateInvoiceForm = ({ invoices = [], guests = [], reservations = [], backendURL, refreshInvoices }) => {
    const [formData, setFormData] = useState({
        update_invoice_id: '',
        update_invoice_date: '',
        update_invoice_total_due: '',
        update_invoice_date_paid: '',
        update_invoice_guest_id: '',
        update_invoice_reservation_id: ''
    });

    useEffect(() => {
        if (formData.update_invoice_id) {
            const selectedInvoice = invoices.find(invoice => 
                invoice.Invoice_Id === parseInt(formData.update_invoice_id)
            );
            if (selectedInvoice) {
                setFormData(prevState => ({
                    ...prevState,
                    update_invoice_date: selectedInvoice.Invoice_Date || '',
                    update_invoice_total_due: selectedInvoice.Total_Due || '',
                    update_invoice_date_paid: selectedInvoice.Date_Paid || '',
                    update_invoice_guest_id: selectedInvoice.Guest_Id || '',
                    update_invoice_reservation_id: selectedInvoice.Reservation_Id || ''
                }));
            }
        }
    }, [formData.update_invoice_id, invoices]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(backendURL + '/invoices/update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log("Invoice updated successfully.");
                refreshInvoices();
                setFormData({
                    update_invoice_id: '',
                    update_invoice_date: '',
                    update_invoice_total_due: '',
                    update_invoice_date_paid: '',
                    update_invoice_guest_id: '',
                    update_invoice_reservation_id: ''
                });
            } else {
                console.error("Error updating invoice.");
            }
        } catch (error) {
            console.error('Error during form submission:', error);
        }
    };

    return (
        <>
        <h2>Update an Invoice</h2>
        <form className='cuForm' onSubmit={handleSubmit}>
            <label htmlFor="update_invoice_id">Invoice to Update: </label>
            <select
                name="update_invoice_id"
                id="update_invoice_id"
                value={formData.update_invoice_id}
                onChange={handleChange}
                required
            >
                <option value="">Select an Invoice</option>
                {invoices && invoices.length > 0 ? invoices.map((invoice) => (
                    <option key={invoice.Invoice_Id} value={invoice.Invoice_Id}>
                        Invoice #{invoice.Invoice_Id} - ${invoice.Total_Due} ({invoice.Invoice_Date})
                    </option>
                )) : <option disabled>No invoices available</option>}
            </select>

            <label htmlFor="update_invoice_date">Invoice Date: </label>
            <input
                type="date"
                name="update_invoice_date"
                id="update_invoice_date"
                value={formData.update_invoice_date}
                onChange={handleChange}
                required
            />

            <label htmlFor="update_invoice_total_due">Total Due: </label>
            <input
                type="number"
                step="0.01"
                min="0"
                name="update_invoice_total_due"
                id="update_invoice_total_due"
                value={formData.update_invoice_total_due}
                onChange={handleChange}
                required
            />

            <label htmlFor="update_invoice_date_paid">Date Paid (Optional): </label>
            <input
                type="date"
                name="update_invoice_date_paid"
                id="update_invoice_date_paid"
                value={formData.update_invoice_date_paid}
                onChange={handleChange}
            />

            <label htmlFor="update_invoice_guest_id">Guest: </label>
            <select
                name="update_invoice_guest_id"
                id="update_invoice_guest_id"
                value={formData.update_invoice_guest_id}
                onChange={handleChange}
                required
            >
                <option value="">Select a Guest</option>
                {guests && guests.length > 0 ? guests.map((guest) => (
                    <option value={guest.Guest_Id} key={guest.Guest_Id}>
                        {guest.First_Name} {guest.Last_Name} ({guest.Email})
                    </option>
                )) : <option disabled>No guests available</option>}
            </select>

            <label htmlFor="update_invoice_reservation_id">Reservation: </label>
            <select
                name="update_invoice_reservation_id"
                id="update_invoice_reservation_id"
                value={formData.update_invoice_reservation_id}
                onChange={handleChange}
                required
            >
                <option value="">Select a Reservation</option>
                {reservations && reservations.length > 0 ? reservations.map((reservation) => (
                    <option value={reservation.Reservation_Id} key={reservation.Reservation_Id}>
                        Reservation #{reservation.Reservation_Id} - {reservation.Check_In_Date} to {reservation.Check_Out_Date}
                    </option>
                )) : <option disabled>No reservations available</option>}
            </select>

            <input type="submit" value="Update Invoice" />
        </form>
        </>
    );
};

export default UpdateInvoiceForm;