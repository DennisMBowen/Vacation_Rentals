const CreatePropertyManagerForm = ({ backendURL, refreshPropertyManager }) => {
    return (
        <>
        <h2>Create a Property Manager</h2>
        <form className='cuForm'>
            <label htmlFor="create_manager_fname">First Name: </label>
            <input type="text" name="create_manager_fname" id="create_manager_fname" />

            <label htmlFor="create_manager_lname">Last Name: </label>
            <input type="text" name="create_manager_lname" id="create_manager_lname" />

            <label htmlFor="create_manager_email">Email: </label>
            <input type="text" name="create_manager_email" id="create_manager_email" />

            <label htmlFor="create_manager_phone">Phone Number: </label>
            <input type="text" name="create_manager_phone" id="create_manager_phone" />

            <input type="submit" />
        </form>
        </>
    );
};

export default CreatePropertyManagerForm;