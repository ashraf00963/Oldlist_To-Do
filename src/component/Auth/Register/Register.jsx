import { useEffect, useRef, useState } from "react";
import axios from 'axios';
import './Register.css';

function Register({ isOpen, onClose}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [strength, SetStrength] = useState('');
    const [error, setError] = useState(null);
    
    const URL = 'https://list-todo.com';
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


    //password strength checker 
    const passStrength = (password) => {
        let strength = 'Weak';
        if (password.length > 6) {
            strength = 'Medium';
        }
        if (password.length > 8 && /[A-Z]/.test(password) && /[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password)) {
            strength = 'Strong';
        }
        return strength;
    }

    //handling the submition
    const handleSubmit = async (e) => {
        e.preventDefault();

        //confirm if username isnt less than 3 chars
        if (username.length <= 3) {
            setError('Username must be longer than three characters');
            return;
        }

        //confirm if password and confirm password are equal
        if(password !== confirmPass) {
            setError('Passwords do not match');
            return;
        }

        //checking password strength 
        const passwordStrength = passStrength(password);
        SetStrength(passwordStrength);

        if(passwordStrength === 'Weak') {
            setError('Password is too weak');
            return;
        }

        //try and catch blockes to post data to server using axios
        try {
            const response = await axios.post(`${URL}/register`, { username, password});
            setError(null);
            alert('Registration successful!');
        } catch (error) {
            setError(error.response.data.message || "Registration failed");
        }
    }
    //handle password strength on password input change
    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        SetStrength(passStrength(newPassword));
    }

    return (
        <div className="register-overlay">
            <div className="register-content" ref={loginRef}>
                <h2>Register</h2>
                {error && <p className="error-p">{error}</p>}
                <form className="register-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={username}
                        className="register-input"
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        required
                    />
                    <input 
                        type="password"
                        value={password}
                        className={`register-input ${strength === 'Weak' ? 'Weak' : strength === 'Medium' ? 'Medium' : strength === 'Strong' ? 'Strong' : ''}`}
                        onChange={handlePasswordChange}
                        placeholder="Password"
                        required
                    />
                    <input
                        type="password"
                        value={confirmPass}
                        className="register-input"
                        onChange={(e) => setConfirmPass(e.target.value)}
                        placeholder="Confirm password"
                        required
                    />
                    <button className="register-sub-btn" type="submit">Sign up</button>
                </form>
            </div>
        </div>
    )
}
export default Register;