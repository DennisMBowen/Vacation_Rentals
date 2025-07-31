const UpdatePropertyManagerForm = ({ managers, backendURL, refreshPropertyManager }) => {
    return (
        <>
            <h2>Update a Property Manager</h2>
            <form className='cuForm'>
                <label htmlFor="update_manager_id">Manager to Update: </label>
                <select name="update_manager_id" id="update_manager_id">
                    <option value="">Select a Manager</option>
                    {managers.map((manager) => (
                        <option key={manager.Manager_Id} value={manager.Manager_Id}>
                            {manager.Manager_Id} - {manager.First_Name} {manager.Last_Name}
                        </option>
                    ))}
                </select>

                <label htmlFor="update_manager_fname">First Name: </label>
                <input type="text" name="update_manager_fname" id="update_manager_fname" />

                <label htmlFor="update_manager_lname">Last Name: </label>
                <input type="text" name="update_manager_lname" id="update_manager_lname" />

                <label htmlFor="update_manager_email">Email: </label>
                <input type="text" name="update_manager_email" id="update_manager_email" />

                <input type="submit" />
            </form>
        </>
    );
};

export default UpdatePropertyManagerForm;