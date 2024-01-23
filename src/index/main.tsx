import React, { useEffect, useState, createContext, useContext } from 'react';
import "./main.css";

const UsernameContext = createContext<{
    username: string | null;
    setUsername: (name: string | null) => void;
  }>({
    username: null,
    setUsername: () => {},
});

const Main: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn, ] = useState(false);

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    return (
        <UsernameContext.Provider value={{ username: null, setUsername: () => {} }}>
            <div>
                {isLoggedIn ? (
                    <AppContainer />
                ) : (
                    <LoginContainer handleLogin={handleLogin} />
                )}
            </div>
        </UsernameContext.Provider>
    );
};

const AppContainer: React.FC = () => {
    const { username } = useContext(UsernameContext);
    console.log('Current username:', username);

    return (
        <div className="app-container">
            <div className="box-app">
                
            </div>
        </div>
    );
}

const doesCookieExist = (name: string) => {
    const cookies = document.cookie.split(';').map(cookie => cookie.trim());
    return cookies.some(cookie => cookie.startsWith(`${name}=`));
};

const LoginContainer: React.FC<{ handleLogin: () => void }> = ({ handleLogin }) => {
    useEffect(() => {
        if (doesCookieExist('name')) {
            handleLogin();
        }
    }, [handleLogin]);

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

interface SubmitProps {
    handleLogin: () => void;
}

const Submit: React.FC<SubmitProps> = ({ handleLogin }) => {
    const { setUsername } = useContext(UsernameContext);

    const handleData = (data: any, password: any) => {
        const name = JSON.stringify(data.name);

        if (!doesCookieExist('name')) {
            console.log("Data: " + name + " Password: " + password);
            document.cookie = `name=${password}; path=/`;     
            setUsername(name);
            handleLogin();
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const passwordInput = document.getElementById('password') as HTMLInputElement;
        const password = passwordInput.value;
        const apiUrl = `https://hours.team4159.org/users/getuserdata?password=${password}`;
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => handleData(data, password))
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