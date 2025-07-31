const UpdateGuestForm = ({ guests, backendURL, refreshGuest }) => {
    return (
        <>
            <h2>Update a Guest</h2>
            <form className='cuForm'>
                <label htmlFor="update_guest_id">Guest to Update: </label>
                <select
                    name="update_guest_id"
                    id="update_guest_id"
                >
                    <option value="">Select a Guest</option>
                    {guests.map((guest) => (
                        <option key={guest.Guest_Id} value={guest.Guest_Id}>
                            {guest.Guest_Id} - {guest.First_Name} {guest.Last_Name}
                        </option>
                    ))}
                </select>

                <label htmlFor="update_guest_email">Email: </label>
                <input
                    type="text"
                    name="update_guest_email"
                    id="update_guest_email"
                />

                <label htmlFor="update_guest_phone">Phone: </label>
                <input
                    type="text"
                    name="update_guest_phone"
                    id="update_guest_phone"
                />
                <input type="submit" />
            </form>
        </>
    );
};

export default UpdateGuestForm;