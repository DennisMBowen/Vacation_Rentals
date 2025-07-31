import DeleteGuestForm from './DeleteGuestForm';

const TableRow = ({ rowObject, backendURL, refreshGuest }) => {
    return (
        <tr>
            {Object.values(rowObject).map((value, index) => (
                <td key={index}>{value}</td>
            ))}
            
            <DeleteGuestForm rowObject={rowObject} backendURL={backendURL} refreshGuest={refreshGuest} />
        </tr>
    );
};

export default TableRow;