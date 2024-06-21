import axios from "axios";
import { useEffect, useRef, useState } from "react";
import './login.css';

function Login({ isOpen, onClose, onRegisterOpen }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);

    const URL = 'http://localhost:3001';
    const loginRef = useRef(null);

    //useEffect handling click out side to close login popup
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if(loginRef.current && !loginRef.current.contains(event.target)) {
                onClose();
            }
        }

        if(isOpen) {
            document.addEventListener('mousedown', handleOutsideClick);
        } else {
            document.removeEventListener('mousedown', handleOutsideClick);
        }

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        }
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    //func to handle submit 
    const handleSubmit = async (e) => {
        e.preventDefault();

        //check if username is more than 3 char
        if(username.length <= 3){
            setError("username must be more than 3 characters");
            return;
        }

        //try and catch blacks to fetch and confirm login
        try {
            const response = await axios.post(`${URL}/login`, { username, password});
            setError(null);
            setLoggedIn(true);
            alert("Login successful");
        } catch (error) {
            setError(error.response.data.message || 'Login failed');
        }
    }

    return (
        <div className="login-overlay">
            <div className="login-content" ref={loginRef}>
                <h2>Login</h2>
                {error && <p className="error-p">{error}</p>}
                {loggedIn ? ( 
                    <div>
                        <h2>Welcome, {username}</h2>
                    </div>
                ) : (
                    <form className="login-form" onSubmit={handleSubmit}>
                        <input 
                            type="text"
                            value={username}
                            className="login-input"
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                            required
                        />
                        <input 
                            type="password"
                            value={password}
                            className="login-input"
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                        />
                        <button className="login-sub-btn" type="submit">Sign in</button>
                        <p className="reg-p" onClick={onRegisterOpen}>Create new account</p>
                    </form>
                )}
            </div>
        </div>
    )
}

export default Login;