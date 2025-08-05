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
                            {property.Property_Id} - {property.Address_Line_1}
                        </option>
                    ))}
                </select>

                <label htmlFor="Address_Line_1">Address Line 1: </label>
                <input type="text" name="Address_Line_1" id="Address_Line_1" />

                <label htmlFor="Address_Line_2">Address Line 2: </label>
                <input type="text" name="Address_Line_2" id="Address_Line_2" />

                <label htmlFor="City">City: </label>
                <input type="text" name="City" id="City" />

                <label htmlFor="State">State: </label>
                <input type="text" name="State" id="State" maxLength={2} />

                <label htmlFor="Zip">Zip: </label>
                <input type="number" name="Zip" id="Zip" />

                <label htmlFor="Price_Per_Night">Price Per Night: </label>
                <input type="number" step="0.01" name="Price_Per_Night" id="Price_Per_Night" />

                <label htmlFor="Beds">Beds: </label>
                <input type="number" name="Beds" id="Beds" />

                <label htmlFor="Baths">Baths: </label>
                <input type="number" name="Baths" id="Baths" />

                <label htmlFor="Pets_Allowed">Pets Allowed: </label>
                <select name="Pets_Allowed" id="Pets_Allowed">
                    <option value="">Select</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>

                <label htmlFor="Monthly_Maintenance_Cost">Monthly Maintenance Cost: </label>
                <input type="number" step="0.01" name="Monthly_Maintenance_Cost" id="Monthly_Maintenance_Cost" />

                <label htmlFor="Manager_Id">Manager ID: </label>
                <input type="number" name="Manager_Id" id="Manager_Id" />

                <input type="submit" />
            </form>
        </>
    );
};

export default UpdatePropertyForm;