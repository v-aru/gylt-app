import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router'; 
import { EyeButton, InputField, LoginButton } from '../../../../styles/ProfileStyles';
import CloseEye from '../../../../public/assets/CloseEye';
import OpenEye from '../../../../public/assets/OpenEye';

const SignInForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [showPassword, setShowPassword] = useState('');

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/signin', {
                email,
                password, 
            },
                {
                    headers: {
                        'Content-Type': 'application/json',
                }
            });
            console.log('Response data:', response.data);

            
            localStorage.setItem('token', response.data.token);
            if (response.status === 200) {
                setMessage('Sign in successful!');
                router.push('/');
            }
        } catch (error) {
            console.error('Error:', error); 
            setMessage('Something went wrong. Please try again.');
        }
    };

    return (
        <>
        <form onSubmit={handleSubmit}>
            <InputField
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <div style={{ position: 'relative', width: '100%' }}>
                <InputField
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <EyeButton
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? <OpenEye /> : <CloseEye />}
                </EyeButton>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%', position: 'relative', right: '-10px' }}>
                <LoginButton type="submit">Sign In</LoginButton>
            </div>
            {message && <p>{message}</p>}
        </form>
        </>
    );
};

export default SignInForm;
