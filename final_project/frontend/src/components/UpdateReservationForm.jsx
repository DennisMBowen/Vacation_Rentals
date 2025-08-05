const UpdateReservationForm = ({ reservations, backendURL, refreshProperty }) => {
    return (
        <>
            <h2>Update a Property</h2>
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

                <label htmlFor="update_reservation_check_in">Check-In Date: </label>
                <input type="date" name="update_reservation_check_in" id="update_reservation_check_in" />

                <label htmlFor="update_reservation_check_out">Check-Out Date: </label>
                <input type="date" name="update_reservation_check_out" id="update_reservation_check_out" />

                <label htmlFor="update_reservation_num_guests">Number of Guests: </label>
                <input type="number" name="update_reservation_num_guests" id="update_reservation_num_guests" min="1" />

                <label htmlFor="update_reservation_num_pets">Number of Pets: </label>
                <input type="number" name="update_reservation_num_pets" id="update_reservation_num_pets" min="0" />

                <input type="submit" />
            </form>
        </>
    );
};

export default UpdateReservationForm;