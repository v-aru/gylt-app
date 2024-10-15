import dbConnect from '@/backend/dbConnect';  
import User from '@/backend/model//User';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { username, age, gender, dob, city } = req.body;

      await dbConnect();

      // Assuming you have user authentication to get the current user's ID
      const userId = req.user.id;
      
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: 'User not found' });

      user.username = username;
      user.age = age;
      user.gender = gender;
      user.dob = dob;
      user.city = city;

      await user.save();

      res.status(200).json({ message: 'Profile updated successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error updating profile' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
