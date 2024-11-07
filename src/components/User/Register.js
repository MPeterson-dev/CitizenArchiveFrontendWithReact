import React, { useState } from 'react';
import axios from 'axios';
import './UserForms.css';

const Register = () => {
    const [ firstName, setFirstName ] = useState('');
    const [ lastName, setLastName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');
    const [ error, setError ] = useState('');
    const [ success, setSuccess ] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(password !== confirmPassword){
            setError("Passwords do not match.");
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/register', {
                first_name: firstName,
                last_name: lastName,
                email,
                password,
            });
            if(response.data.success) {
                setSuccess("Registration successful! You can now log in.");
                setError('');
            }else{
                setError(response.data.message);
            }
        } catch(err){
            setError("An error occurred during registration.")
        };
    }
    return (
        <div className='registration-container'>
            <div className='form-card'>
                <h2>Register</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {success && <p style={{ color: 'green' }}>{success}</p>}
                <form onSubmit={handleSubmit}>
                    <input
                    type='text'
                    placeholder='First name'
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    />
                    <input
                    type='text'
                    placeholder='Last name'
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    />
                    <input
                    type='email'
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    />
                    <input
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    />
                    <input
                    type='password'
                    placeholder='Confirm password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    />
                    <button type='submit'>Register</button>
                </form>
            </div>
        </div>
    );
};

export default Register;