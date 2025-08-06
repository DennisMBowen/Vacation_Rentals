import DeletePropertyReservationForm from './DeletePropertyReservationForm';

const PRTableRow = ({ rowObject, backendURL, refreshPropertyReservation }) => {
    return (
        <tr>
            {Object.values(rowObject).map((value, index) => (
                <td key={index}>{value}</td>
            ))}

            <DeletePropertyReservationForm rowObject={rowObject} backendURL={backendURL} refreshPropertyReservation={refreshPropertyReservation} />
        </tr>
    );
};

export default PRTableRow;