// Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

const Login = () => {
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });
    const navigate = useNavigate();  // use useNavigate instead of useHistory

    const handleChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://clnodevm150-1.clemson.cloudlab.us/login', credentials);
            if (response.data) {
                alert('Login successful');
                navigate('/dashboard'); // Use navigate instead of history.push
            }
        } catch (error) {
            alert('Login failed: ' + (error.response && error.response.data.message ? error.response.data.message : error.message));
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="username" value={credentials.username} onChange={handleChange} placeholder="Username" required />
            <input type="password" name="password" value={credentials.password} onChange={handleChange} placeholder="Password" required />
            <button type="submit">Log In</button>
        </form>
    );
};

export default Login;
