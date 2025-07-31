const CreateReservationForm = ({ backendURL, refreshReservation }) => {
    return (
        <>
        <h2>Create a Reservation</h2>
        <form className='cuForm'>
            <label htmlFor="create_reservation_guest_id">Guest ID: </label>
            <input type="number" name="create_reservation_guest_id" id="create_reservation_guest_id" />

            <label htmlFor="create_reservation_property_id">Property ID: </label>
            <input type="number" name="create_reservation_property_id" id="create_reservation_property_id" />

            <label htmlFor="create_reservation_start_date">Start Date: </label>
            <input type="date" name="create_reservation_start_date" id="create_reservation_start_date" />

            <label htmlFor="create_reservation_end_date">End Date: </label>
            <input type="date" name="create_reservation_end_date" id="create_reservation_end_date" />

            <input type="submit" />
        </form>
        </>
    );
};

export default CreateReservationForm;