const DeleteInvoiceForm = ({ rowObject, backendURL, refreshInvoice }) => {

    const handleDelete = async (e) => {
        e.preventDefault();
        await fetch(`${backendURL}/invoices/${rowObject.Invoice_Id}`, {
            method: 'DELETE'
        });
        refreshInvoice();
    };

    return (
        <td>
            <form onSubmit={handleDelete}>
                <button type='submit'>Delete</button>
            </form>
        </td>
    );
};

export default DeleteInvoiceForm;