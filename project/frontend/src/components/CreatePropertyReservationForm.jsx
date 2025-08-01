const CreatePropertyReservationForm = ({ backendURL, refreshPropertyReservation }) => {
    return (
        <>
            <h2>Create a Property Reservation</h2>
            <form className='cuForm'>
                <label htmlFor="create_property_reservation_property_id">Property ID: </label>
                <input type="number" name="create_property_reservation_property_id" id="create_property_reservation_property_id" />

                <label htmlFor="create_property_reservation_reservation_id">Reservation ID: </label>
                <input type="number" name="create_property_reservation_reservation_id" id="create_property_reservation_reservation_id" />

                <input type="submit" />
            </form>
        </>
    );
};

export default CreatePropertyReservationForm;