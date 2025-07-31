const UpdateReservationForm = ({ reservations, backendURL, refreshReservation }) => {
    return (
        <>
            <h2>Update a Reservation</h2>
            <form className='cuForm'>
                <label htmlFor="update_reservation_id">Reservation to Update: </label>
                <select name="update_reservation_id" id="update_reservation_id">
                    <option value="">Select a Reservation</option>
                    {reservations.map((reservation) => (
                        <option key={reservation.Reservation_Id} value={reservation.Reservation_Id}>
                            {reservation.Reservation_Id}
                        </option>
                    ))}
                </select>

                <label htmlFor="update_reservation_guest_id">Guest ID: </label>
                <input type="number" name="update_reservation_guest_id" id="update_reservation_guest_id" />

                <label htmlFor="update_reservation_property_id">Property ID: </label>
                <input type="number" name="update_reservation_property_id" id="update_reservation_property_id" />

                <label htmlFor="update_reservation_start_date">Start Date: </label>
                <input type="date" name="update_reservation_start_date" id="update_reservation_start_date" />

                <label htmlFor="update_reservation_end_date">End Date: </label>
                <input type="date" name="update_reservation_end_date" id="update_reservation_end_date" />

                <input type="submit" />
            </form>
        </>
    );
};

export default UpdateReservationForm;