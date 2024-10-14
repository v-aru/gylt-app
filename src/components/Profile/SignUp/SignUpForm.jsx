import React, { useState } from 'react';
import axios from 'axios';
import { Form, InputField, SubmitButton, Message, SelectField, SignUpFormContainer } from '../../../../styles/ProfileStyles'; 

const SignUpForm = ({ isSignUp }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dob, setDob] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('');
    const [location, setLocation] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const calculateAge = (dob) => {
        const birthDate = new Date(dob);
        const ageDiff = Date.now() - birthDate.getTime();
        const ageDate = new Date(ageDiff);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate password confirmation
        if (password !== confirmPassword) {
            setMessage("Passwords do not match.");
            return;
        }

        // Calculate age from date of birth
        const calculatedAge = calculateAge(dob);
        setAge(calculatedAge);

        try {
            const response = await axios.post('/api/signup', {
                firstName,
                lastName,
                dob,
                age: calculatedAge, 
                gender,
                email,
                location,
                username,
                password,
            });
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response.data.message);
        }
    };

    return (
        <SignUpFormContainer style={{ marginTop: isSignUp ? '50px' : '0' }}>
            <Form onSubmit={handleSubmit} style={{ width: '100%' }}>
                <InputField
                    type="text"
                    placeholder="First Name*"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />
                <InputField
                    type="text"
                    placeholder="Last Name*"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />
                <InputField
                    type="date"
                    placeholder="Date of Birth*"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    required
                    style={{color: '#5c677d' }}
                />
                <SelectField
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    required
                    style={{ color: '#5c677d' }}
                >
                    <option value="" disabled>Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Transgender">Transgender</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                </SelectField>
                <InputField
                    type="email"
                    placeholder="Email*"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <InputField
                    type="text"
                    placeholder="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
                <InputField
                    type="text"
                    placeholder="Username*"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <InputField
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <InputField
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <SubmitButton type="submit">Sign Up</SubmitButton>
                {message && <Message>{message}</Message>}
            </Form>
        </SignUpFormContainer>
    );
};

export default SignUpForm;
