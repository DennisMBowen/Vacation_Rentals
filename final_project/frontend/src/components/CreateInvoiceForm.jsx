import React, { useState } from 'react';

const CreateInvoiceForm = ({ guests = [], reservations = [], backendURL, refreshInvoices }) => {
    const [formData, setFormData] = useState({
        create_invoice_date: '',
        create_invoice_total_due: '',
        create_invoice_date_paid: '',
        create_invoice_guest_id: '',
        create_invoice_reservation_id: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        try {
            const response = await fetch(backendURL + '/invoices/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log("Invoice created successfully.");
                refreshInvoices();
                // Reset form
                setFormData({
                    create_invoice_date: '',
                    create_invoice_total_due: '',
                    create_invoice_date_paid: '',
                    create_invoice_guest_id: '',
                    create_invoice_reservation_id: ''
                });
            } else {
                console.error("Error creating invoice.");
            }
        } catch (error) {
            console.error('Error during form submission:', error);
        }
    };

    return (
        <>
        <h2>Create an Invoice</h2>

        <form className='cuForm' onSubmit={handleSubmit}>
            <label htmlFor="create_invoice_date">Invoice Date: </label>
            <input
                type="date"
                name="create_invoice_date"
                id="create_invoice_date"
                value={formData.create_invoice_date}
                onChange={handleChange}
                required
            />

            <label htmlFor="create_invoice_total_due">Total Due: </label>
            <input
                type="number"
                step="0.01"
                min="0"
                name="create_invoice_total_due"
                id="create_invoice_total_due"
                value={formData.create_invoice_total_due}
                onChange={handleChange}
                required
            />

            <label htmlFor="create_invoice_date_paid">Date Paid (Optional): </label>
            <input
                type="date"
                name="create_invoice_date_paid"
                id="create_invoice_date_paid"
                value={formData.create_invoice_date_paid}
                onChange={handleChange}
            />

            <label htmlFor="create_invoice_guest_id">Guest: </label>
            <select
                name="create_invoice_guest_id"
                id="create_invoice_guest_id"
                value={formData.create_invoice_guest_id}
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

            <label htmlFor="create_invoice_reservation_id">Reservation: </label>
            <select
                name="create_invoice_reservation_id"
                id="create_invoice_reservation_id"
                value={formData.create_invoice_reservation_id}
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

            <input type="submit" value="Create Invoice" />
        </form>
        </>
    );
};

export default CreateInvoiceForm;