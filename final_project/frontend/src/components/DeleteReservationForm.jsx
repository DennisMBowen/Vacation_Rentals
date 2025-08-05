const DeleteReservationForm = ({ rowObject, backendURL, refreshReservation }) => {

    const handleDelete = async (e) => {
        e.preventDefault();
        await fetch(`${backendURL}/reservations/${rowObject.Reservation_Id}`, {
            method: 'DELETE'
        });
        refreshReservation();
    };

    return (
        <td>
            <form onSubmit={handleDelete}>
                <button type='submit'>Delete</button>
            </form>
        </td>
    );
};

export default DeleteReservationForm;