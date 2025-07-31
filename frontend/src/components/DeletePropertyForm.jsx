const DeletePropertyForm = ({ rowObject, backendURL, refreshProperty }) => {

    const handleDelete = async (e) => {
        e.preventDefault();
        await fetch(`${backendURL}/properties/${rowObject.Property_Id}`, {
            method: 'DELETE'
        });
        refreshProperty();
    };

    return (
        <td>
            <form onSubmit={handleDelete}>
                <button type='submit'>Delete</button>
            </form>
        </td>
    );
};

export default DeletePropertyForm;