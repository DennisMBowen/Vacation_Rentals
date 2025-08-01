const CreateInvoiceForm = ({ backendURL, refreshInvoice }) => {
    return (
        <>
            <h2>Create an Invoice</h2>
            <form className='cuForm'>
                <label htmlFor="create_invoice_date">Invoice Date: </label>
                <input type="date" name="create_invoice_date" id="create_invoice_date" />

                <label htmlFor="create_invoice_total_due">Total Due: </label>
                <input type="number" step="0.01" name="create_invoice_total_due" id="create_invoice_total_due" />

                <label htmlFor="create_invoice_date_paid">Date Paid: </label>
                <input type="date" name="create_invoice_date_paid" id="create_invoice_date_paid" />

                <label htmlFor="create_invoice_guest_id">Guest ID: </label>
                <input type="number" name="create_invoice_guest_id" id="create_invoice_guest_id" />

                <label htmlFor="create_invoice_reservation_id">Reservation ID: </label>
                <input type="number" name="create_invoice_reservation_id" id="create_invoice_reservation_id" />

                <input type="submit" />
            </form>
        </>
    );
};

export default CreateInvoiceForm;