const DeletePropertyReservationForm = ({ rowObject, backendURL, refreshPropertyReservation }) => {

    const handleDelete = async (e) => {
        e.preventDefault();

        const formData = {
            property_reservation_id: rowObject.Property_Reservation_Id
        };
        try {
            const response = await fetch(backendURL + '/property_reservations/delete', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                console.log("Property reservation successfully deleted.")
                refreshPropertyReservation();
            }
            else {
                console.error("Error deleting property reservation.");
            }
            refreshPropertyReservation();
        }
        catch (error) {
            console.log('Error during property reservation deletion: ', error);
        }
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