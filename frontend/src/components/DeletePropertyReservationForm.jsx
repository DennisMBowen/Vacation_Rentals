const DeletePropertyReservationForm = ({ rowObject, backendURL, refreshPropertyReservation }) => {

    const handleDelete = async (e) => {
        e.preventDefault();
        await fetch(`${backendURL}/property_reservations/${rowObject.Property_Reservation_Id}`, {
            method: 'DELETE'
        });
        refreshPropertyReservation();
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