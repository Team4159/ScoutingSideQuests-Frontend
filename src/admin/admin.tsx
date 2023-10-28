import "./admin.css";

const Admin = () => {
    return (
        <div className="admin-container">
            <div className="tinder-container">
                <div className="info-card">
                    <h3>Image:</h3>
                    <img src="https://placekitten.com/300/300" alt="kitten"></img>
                    <h3>Text:</h3>
                    <p>Placeholder text yayayayayayay lorem ipsum yippee i love side quests</p>
                    <div className="action-buttons">
                        <button className="accept-button">Accept</button>
                        <button className="reject-button">Reject</button>
                        <button className="undo-button">Undo Last</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;
