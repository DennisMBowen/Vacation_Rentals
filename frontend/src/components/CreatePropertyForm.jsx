const CreatePropertyForm = ({ backendURL, refreshProperty }) => {
    return (
        <>
        <h2>Create a Property</h2>
        <form className='cuForm'>
            <label htmlFor="create_property_name">Name: </label>
            <input type="text" name="create_property_name" id="create_property_name" />

            <label htmlFor="create_property_address">Address: </label>
            <input type="text" name="create_property_address" id="create_property_address" />

            <label htmlFor="create_property_type">Type: </label>
            <input type="text" name="create_property_type" id="create_property_type" />

            <label htmlFor="create_property_manager_id">Manager ID: </label>
            <input type="number" name="create_property_manager_id" id="create_property_manager_id" />

            <input type="submit" />
        </form>
        </>
    );
};

export default CreatePropertyForm;