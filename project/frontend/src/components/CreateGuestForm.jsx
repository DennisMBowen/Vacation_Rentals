const CreateGuestForm = ({ backendURL, refreshGuest }) => {

    return (
        <>
            <h2>Create a Guest</h2>

            <form className='cuForm'>
                <label htmlFor="create_guest_fname">First Name: </label>
                <input type="text" name="create_guest_fname" id="create_guest_fname" />

                <label htmlFor="create_guest_lname">Last Name: </label>
                <input type="text" name="create_guest_lname" id="create_guest_lname" />

                <label htmlFor="create_guest_email">Email: </label>
                <input type="text" name="create_guest_email" id="create_guest_email" />

                <label htmlFor="create_guest_phone">Phone Number: </label>
                <input type="text" name="create_guest_phone" id="create_guest_phone" />

                <input type="submit" />
            </form>
        </>
    );
};

export default CreateGuestForm;