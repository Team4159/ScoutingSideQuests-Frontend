import React, { useState } from 'react';
import "./main.css";

const Main: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    return (
        <div>
            {isLoggedIn ? (
                <AppContainer />
            ) : (
                <LoginContainer handleLogin={handleLogin} />
            )}
        </div>
    );
};

const AppContainer: React.FC = () => {
    return (
        <div className="app-container">
            <p>Test!</p>
        </div>
    );
}

interface SubmitProps {
    handleLogin: () => void;
}

const LoginContainer: React.FC<{ handleLogin: () => void }> = ({ handleLogin }) => {
    return (
        <div className="login-container">
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
                        <Submit handleLogin={handleLogin} />
                    </div>
                </div>
            </div>
        </div>
    );
}

const Input: React.FC = () => {
    return (
        <div className="input">
            <input type="password" className="input-box" id="password"></input>
            <label htmlFor="password"></label>
        </div>
    );
}

const Submit: React.FC<SubmitProps> = ({ handleLogin }) => {
    const doesCookieExist = (name: string) => {
        const cookies = document.cookie.split(';').map(cookie => cookie.trim());
        return cookies.some(cookie => cookie.startsWith(`${name}=`));
    };

    const handleData = (data: any) => {
        if (!doesCookieExist('name')) {
            document.cookie = `name=${data.name}; path=/`;
            // handleLogin();
        } else {
            console.log("Cookie already exists"); // debug
        }
        handleLogin();
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