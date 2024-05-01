import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        address: ''
    });

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://clnodevm150-1.clemson.cloudlab.us/signup', formData);
            alert(response.data.message);
        } catch (error) {
            alert('Signup failed: ' + error.response.data.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" required />
            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
            <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" required />
            <button type="submit">Sign Up</button>
        </form>
    );
};

export default Signup;
