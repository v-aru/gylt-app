import { Router } from 'express';
const router = Router();
import User, { findOne } from '../models/user';

router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const newUser = new User({ username, email, password });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to register user' });
  }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }

      const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
  
    //   res.status(200).json({ message: 'Login successful', userId: user._id });
    res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ error: 'Failed to login user' });
    }
  });

export default router;
