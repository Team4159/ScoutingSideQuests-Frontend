import "./main.css";

const Main = () => {
    return (
        <div className="container">
            <div className="box">
                <div className="box-login">
                    <div className="header">
                        <h3>Team 4159 Side Quests</h3>
                        <p>Use your hours password to sign in.</p>
                    </div>
                    <br></br>
                    <div className="input-group">
                        <Input />
                        <Submit />
                    </div>
                </div>
            </div>
        </div>
    );
};

const Input = () => {
    return (
        <div className="input">
            <input type="password" className="input-box" id="password"></input>
            <label htmlFor="password"></label>
        </div>
    );
}

const Submit = () => {
    return (
        <div className="submit">
            <div className="input">
                <input type="submit" className="input-submit" value="Sign In" required></input>
            </div>
        </div>
    );
}

export default Main;