// Date: 08/05/2025
// Adapted from Oregon State Canvas CS 340: Module 6 Exploration: Web Application Technology
// Source URL: https://canvas.oregonstate.edu/courses/2007765/pages/exploration-web-application-technology-2?module_item_id=25664612

const DeleteInvoiceForm = ({ rowObject, backendURL, refreshInvoice }) => {

    const handleDelete = async (e) => {
        e.preventDefault();
        console.log(rowObject);
        const formData = {
            invoice_id: rowObject.Invoice_Id
        };

        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 100); // 100 ms timeout

            const response = await fetch(backendURL + '/invoice/delete', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (response.ok) {
                console.log("Invoice successfully deleted.")
            }
            else {
                console.error("Error deleting invoice.");
            }
        } catch (error) {
            if (error.name === 'AbortError') {
                console.log('Delete request timed out, but operation may have succeeded');
            } else {
                console.log('Error during property reservation deletion: ', error);
            }
        }

        // Wait a moment before refreshing to ensure the delete has completed
        setTimeout(() => {
            refreshInvoice();
        }, 100);
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