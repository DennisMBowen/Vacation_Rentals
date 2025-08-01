const CreateReservationForm = ({ backendURL, refreshReservation }) => {
    return (
        <>
            <h2>Create a Reservation</h2>
            <form className='cuForm'>
                <label htmlFor="create_reservation_check_in">Check-In Date: </label>
                <input type="date" name="create_reservation_check_in" id="create_reservation_check_in" />

                <label htmlFor="create_reservation_check_out">Check-Out Date: </label>
                <input type="date" name="create_reservation_check_out" id="create_reservation_check_out" />

                <label htmlFor="create_reservation_num_guests">Number of Guests: </label>
                <input type="number" name="create_reservation_num_guests" id="create_reservation_num_guests" min="1" />

                <label htmlFor="create_reservation_num_pets">Number of Pets: </label>
                <input type="number" name="create_reservation_num_pets" id="create_reservation_num_pets" min="0" />

                <input type="submit" />
            </form>
        </>
    );
};

export default CreateReservationForm;