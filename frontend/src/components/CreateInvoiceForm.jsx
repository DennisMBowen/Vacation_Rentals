const CreateInvoiceForm = ({ backendURL, refreshInvoice }) => {
    return (
        <>
        <h2>Create an Invoice</h2>
        <form className='cuForm'>
            <label htmlFor="create_invoice_reservation_id">Reservation ID: </label>
            <input type="number" name="create_invoice_reservation_id" id="create_invoice_reservation_id" />

            <label htmlFor="create_invoice_amount">Amount: </label>
            <input type="number" name="create_invoice_amount" id="create_invoice_amount" />

            <label htmlFor="create_invoice_status">Status: </label>
            <input type="text" name="create_invoice_status" id="create_invoice_status" />

            <input type="submit" />
        </form>
        </>
    );
};

export default CreateInvoiceForm;