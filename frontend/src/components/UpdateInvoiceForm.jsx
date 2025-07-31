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

                <label htmlFor="update_invoice_reservation_id">Reservation ID: </label>
                <input type="number" name="update_invoice_reservation_id" id="update_invoice_reservation_id" />

                <label htmlFor="update_invoice_amount">Amount: </label>
                <input type="number" name="update_invoice_amount" id="update_invoice_amount" />

                <label htmlFor="update_invoice_status">Status: </label>
                <input type="text" name="update_invoice_status" id="update_invoice_status" />

                <input type="submit" />
            </form>
        </>
    );
};

export default UpdateInvoiceForm;