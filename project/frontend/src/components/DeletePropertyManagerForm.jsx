const DeletePropertyManagerForm = ({ rowObject, backendURL, refreshPropertyManager }) => {

    const handleDelete = async (e) => {
        e.preventDefault();
        await fetch(`${backendURL}/property_managers/${rowObject.Manager_Id}`, {
            method: 'DELETE'
        });
        refreshPropertyManager();
    };

    return (
        <td>
            <form onSubmit={handleDelete}>
                <button type='submit'>Delete</button>
            </form>
        </td>
    );
};

export default DeletePropertyManagerForm;