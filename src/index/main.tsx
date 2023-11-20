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
    const doesCookieExist = (name: string) => {
        const cookies = document.cookie.split(';').map(cookie => cookie.trim());
        return cookies.some(cookie => cookie.startsWith(`${name}=`));
    };

    const handleData = (data: any) => {
        if (!doesCookieExist('name')) {
            document.cookie = `name=${data.name}; path=/`;
        } else {
            console.log("Cookie already exists"); // debug
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const passwordInput = document.getElementById('password') as HTMLInputElement;
        const password = passwordInput.value;
        const apiUrl = `https://hours.team4159.org/users/getuserdata?password=${password}`;
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => handleData(data))
            .catch((error) => console.error('Error:', error));
        passwordInput.value = '';
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="submit">
                <div className="input">
                    <input type="submit" className="input-submit" value="Sign In" required></input>
                </div>
            </div>
        </form>
    );
}

export default Main;