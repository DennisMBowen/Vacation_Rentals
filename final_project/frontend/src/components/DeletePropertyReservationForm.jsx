const DeletePropertyReservationForm = ({ rowObject, backendURL, refreshPropertyReservation }) => {

    const handleDelete = async (e) => {
        e.preventDefault();

        const formData = {
            property_reservation_id: rowObject.Property_Reservation_Id
        };
        
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 100); // 100 ms timeout

            const response = await fetch(backendURL + '/property_reservations/delete', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
                signal: controller.signal
            });
            
            clearTimeout(timeoutId);
            
            if (response.ok) {
                console.log("Property reservation successfully deleted.")
            }
            else {
                console.error("Error deleting property reservation.");
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
            refreshPropertyReservation();
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

export default DeletePropertyReservationForm;
