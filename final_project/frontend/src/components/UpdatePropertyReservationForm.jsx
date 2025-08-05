const UpdatePropertyReservationForm = ({ propertyReservations, backendURL, refreshPropertyReservation }) => {
    return (
        <>
            <h2>Update a Property Reservation</h2>
            <form className='cuForm'>
                <label htmlFor="update_property_reservation_id">Property Reservation to Update: </label>
                <select name="update_property_reservation_id" id="update_property_reservation_id">
                    <option value="">Select a Property Reservation</option>
                    {propertyReservations.map((pr) => (
                        <option key={pr.Property_Reservation_Id} value={pr.Property_Reservation_Id}>
                            {pr.Property_Reservation_Id}
                        </option>
                    ))}
                </select>

                <label htmlFor="update_property_reservation_property_id">Property ID: </label>
                <input type="number" name="update_property_reservation_property_id" id="update_property_reservation_property_id" />

                <label htmlFor="update_property_reservation_reservation_id">Reservation ID: </label>
                <input type="number" name="update_property_reservation_reservation_id" id="update_property_reservation_reservation_id" />

                <input type="submit" />
            </form>
        </>
    );
};

export default UpdatePropertyReservationForm;