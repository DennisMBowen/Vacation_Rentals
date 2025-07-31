const CreatePropertyForm = ({ backendURL, refreshProperty }) => {
    return (
        <>
            <h2>Create a Property</h2>
            <form className='cuForm'>
                <label htmlFor="Address_Line_1">Address Line 1: </label>
                <input type="text" name="Address_Line_1" id="Address_Line_1" required />

                <label htmlFor="Address_Line_2">Address Line 2: </label>
                <input type="text" name="Address_Line_2" id="Address_Line_2" />

                <label htmlFor="City">City: </label>
                <input type="text" name="City" id="City" required />

                <label htmlFor="State">State: </label>
                <input type="text" name="State" id="State" maxLength={2} required />

                <label htmlFor="Zip">Zip: </label>
                <input type="number" name="Zip" id="Zip" required />

                <label htmlFor="Price_Per_Night">Price Per Night: </label>
                <input type="number" step="0.01" name="Price_Per_Night" id="Price_Per_Night" required />

                <label htmlFor="Beds">Beds: </label>
                <input type="number" name="Beds" id="Beds" required />

                <label htmlFor="Baths">Baths: </label>
                <input type="number" name="Baths" id="Baths" required />

                <label htmlFor="Pets_Allowed">Pets Allowed: </label>
                <select name="Pets_Allowed" id="Pets_Allowed" required>
                    <option value="">Select</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>

                <label htmlFor="Monthly_Maintenance_Cost">Monthly Maintenance Cost: </label>
                <input type="number" step="0.01" name="Monthly_Maintenance_Cost" id="Monthly_Maintenance_Cost" required />

                <label htmlFor="Manager_Id">Manager ID: </label>
                <input type="number" name="Manager_Id" id="Manager_Id" required />

                <input type="submit" />
            </form>
        </>
    );
};

export default CreatePropertyForm;