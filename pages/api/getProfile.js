import dbConnect from '@/backend/dbConnect';  
import User from '@/backend/model//User';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      await dbConnect();
      const session = await getSession({ req });
      if (!session) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      const userId = session.user.id;
      
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: 'User not found' });

      res.status(200).json({
        username: user.username,
        age: user.age,
        gender: user.gender,
        dateOfBirth: user.dateOfBirth,
        city: user.city,
      });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching profile data' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
