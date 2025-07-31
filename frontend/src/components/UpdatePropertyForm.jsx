const UpdatePropertyForm = ({ properties, backendURL, refreshProperty }) => {
    return (
        <>
            <h2>Update a Property</h2>
            <form className='cuForm'>
                <label htmlFor="update_property_id">Property to Update: </label>
                <select name="update_property_id" id="update_property_id">
                    <option value="">Select a Property</option>
                    {properties.map((property) => (
                        <option key={property.Property_Id} value={property.Property_Id}>
                            {property.Property_Id} - {property.Name}
                        </option>
                    ))}
                </select>

                <label htmlFor="update_property_name">Name: </label>
                <input type="text" name="update_property_name" id="update_property_name" />

                <label htmlFor="update_property_address">Address: </label>
                <input type="text" name="update_property_address" id="update_property_address" />

                <label htmlFor="update_property_type">Type: </label>
                <input type="text" name="update_property_type" id="update_property_type" />

                <label htmlFor="update_property_manager_id">Manager ID: </label>
                <input type="number" name="update_property_manager_id" id="update_property_manager_id" />

                <input type="submit" />
            </form>
        </>
    );
};

export default UpdatePropertyForm;