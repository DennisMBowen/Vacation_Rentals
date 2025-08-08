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
                <p>Developer information and Project overview here.</p>
                <button onClick={handleRefresh}>Refresh Database</button>
            </div>
        </>
    )
} export default Home;