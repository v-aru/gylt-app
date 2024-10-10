import React, { useState } from 'react';
import axios from 'axios';

const SignInForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');

        try {
            const response = await axios.post('http://localhost:5000/api/signin', {
                email,
                password,
            });
            setMessage('Sign in successful!');
            localStorage.setItem('token', response.data.token); 
            window.location.href = '/'; 
        } catch (error) {
            setMessage(error.response.data.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit" disabled={isLoading}>
                {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
            {message && <p>{message}</p>}
        </form>
    );
};

export default SignInForm;
