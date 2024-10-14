import dbConnect from '@/backend/dbConnect'; 
import User from '@/backend/model/User';
import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  const { email , password } = req.body;
  // console.log('Request body:', req.body);

  try {
    await dbConnect(); 

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User does not exist in the database. Please sign up.' });
    }

    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log('Generated JWT Token:', token);
    return res.status(200).json({ token });

    //res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
} 

