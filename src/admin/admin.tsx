import "./admin.css"

const Admin = () => {
    return (
        <div className="admin-container">
            <div className="tinder-container">
                <button className="accept-button">Accept</button>
                <div className="info-card">
                    <h3>Image:</h3>
                    <img src="https://placekitten.com/300/300"></img>
                    <h3>Text:</h3>
                    <p>Placeholder text yayayayayayay lorem ipsum yippee i love side quests</p>
                </div>
                <button className="reject-button">Reject</button>
            </div>
            
            <button className="undo-button">Undo Last</button>
        </div>
    );
};

export default Admin;