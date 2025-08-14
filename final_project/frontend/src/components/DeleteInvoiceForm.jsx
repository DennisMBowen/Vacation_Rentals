// Date: 08/05/2025
// Adapted from Oregon State Canvas CS 340: Module 6 Exploration: Web Application Technology
// Source URL: https://canvas.oregonstate.edu/courses/2007765/pages/exploration-web-application-technology-2?module_item_id=25664612

const DeleteInvoiceForm = ({ rowObject, backendURL, refreshInvoice }) => {

    const handleDelete = async (e) => {
        // e.preventDefault();
        // await fetch(`${backendURL}/invoices/${rowObject.Invoice_Id}`, {
        //     method: 'DELETE'
        // });
        // refreshInvoice();
        console.log("Delete clicked!");
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