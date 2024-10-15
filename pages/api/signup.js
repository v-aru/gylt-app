import dbConnect from '@/backend/dbConnect'; 
import User from '@/backend/model/User'; 
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests are allowed.' });
  }

  const { username, email, password, firstName, lastName, dob, gender, location, age } = req.body;

  try {
    await dbConnect();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists.' });
    }

    const newUser = new User({
      username,
      email,
      password,
      firstName,
      lastName,
      dateOfBirth,
      gender,
      location,
      age
    });

    await newUser.save();

    // JWT creation
    const token = jwt.sign({ userId: newUser._id, email: newUser.email }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(201).json({ message: 'User created successfully!', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
