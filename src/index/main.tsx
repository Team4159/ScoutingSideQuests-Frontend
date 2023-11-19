import { useState } from "react";
import "./main.css";

const Main = () => {
    return (
        <div className="container">
            <div className="box">
                <div className="box-login">
                    <div className="header">
                        <h3>Side Quests</h3>
                        <p>You must log in to access this page.</p>
                    </div>
                    <div className="input-group">
                        <Login />
                        <Remember />
                        <Submit />
                    </div>
                </div>
            </div>
        </div>
    );
};

const Login = () => {
    return (
        <div className="login">
            <Input />
        </div>
    );
}

const Input = () => {
    return (
        <div className="input">
            <input type="text" className="input-box" id="password"></input>
            <label htmlFor="password"></label>
            <Eye />
        </div>
    );
}

const Eye = () => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="eye">
            <div className="eye-box" onClick={togglePassword}>
                <i className={`fa-regular fa-eye${showPassword ? '-slash' : ''}`} />
            </div>
        </div>
    );
};

const Remember = () => {
    return (
        <div className="remember">
            <input type="checkbox" id="formCheck" className="check"></input>
            <label htmlFor="formCheck">Remember Me</label>
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