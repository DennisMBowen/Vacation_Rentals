// Date: 08/05/2025
// Adapted from Oregon State Canvas CS 340: Module 6 Exploration: Web Application Technology
// Source URL: https://canvas.oregonstate.edu/courses/2007765/pages/exploration-web-application-technology-2?module_item_id=25664612

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