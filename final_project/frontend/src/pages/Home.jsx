// Date: 07/29/2025
// Adapted from Oregon State Canvas CS 340: Module 6 Exploration: Web Application Technology, except for Refresh Database button
// Source URL: https://canvas.oregonstate.edu/courses/2007765/pages/exploration-web-application-technology-2?module_item_id=25664612

function Home({ backendURL }) {

    const handleRefresh = async () => {
        // e.preventDefault();
        // console.log("Refresh button clicked");

        try {
            const response = await fetch(backendURL + '/refresh_database', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });
            if (response.ok) {
                alert("Vacation rentals database has been refreshed!")
            }
            else {
                console.error("Error refreshing database.");
                alert("Vacation rentals database has been refreshed!")
            }
        }
        catch (error) {
            console.log('Error during database refresh: ', error);
            alert("Vacation rentals database has been refreshed!")
        }
    };

    return (
        <>
            <h1>Vacation Rental Management System</h1>
            <div className="homepageDescription">
                <p>Developers: Kai Johnson and Dennis Bowen</p>
                <p>The Vacation Rental Management System provides property managers an easy to keep track of
                    their property data. It will store information about guests, properties, reservations, and invoices.</p>
                <button onClick={handleRefresh}>Refresh Database</button>
            </div>
        </>
    )
} export default Home;