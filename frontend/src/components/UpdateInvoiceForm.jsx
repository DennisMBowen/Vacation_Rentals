const UpdateInvoiceForm = ({ invoices, backendURL, refreshInvoice }) => {
    return (
        <>
            <h2>Update an Invoice</h2>
            <form className='cuForm'>
                <label htmlFor="update_invoice_id">Invoice to Update: </label>
                <select name="update_invoice_id" id="update_invoice_id">
                    <option value="">Select an Invoice</option>
                    {invoices.map((invoice) => (
                        <option key={invoice.Invoice_Id} value={invoice.Invoice_Id}>
                            {invoice.Invoice_Id}
                        </option>
                    ))}
                </select>

                <label htmlFor="update_invoice_date">Invoice Date: </label>
                <input type="date" name="update_invoice_date" id="update_invoice_date" />

                <label htmlFor="update_invoice_total_due">Total Due: </label>
                <input type="number" step="0.01" name="update_invoice_total_due" id="update_invoice_total_due" />

                <label htmlFor="update_invoice_date_paid">Date Paid: </label>
                <input type="date" name="update_invoice_date_paid" id="update_invoice_date_paid" />

                <label htmlFor="update_invoice_guest_id">Guest ID: </label>
                <input type="number" name="update_invoice_guest_id" id="update_invoice_guest_id" />

                <label htmlFor="update_invoice_reservation_id">Reservation ID: </label>
                <input type="number" name="update_invoice_reservation_id" id="update_invoice_reservation_id" />

                <input type="submit" />
            </form>
        </>
    );
};

export default UpdateInvoiceForm;