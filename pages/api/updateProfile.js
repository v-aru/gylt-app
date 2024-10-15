import dbConnect from '@/backend/dbConnect';  
import User from '@/backend/model/User';
import { getToken } from 'next-auth/jwt';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
        //console.log('Request Body:', req.body);
        const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
        if (!token) return res.status(401).json({ message: 'Unauthorized' });
        const { username, age, gender, dateOfBirth, city } = req.body;

        await dbConnect();

        const userId = token.id;
        
        const user = await User.findById(userId);
        // const user = await User.findUserByEmail({ email: token.email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.username = username !== undefined ? username : user.username;
        user.age = age !== undefined ? age : user.age;
        user.gender = gender !== undefined ? gender : user.gender;
        user.dateOfBirth = dateOfBirth !== undefined ? dateOfBirth : user.dateOfBirth;
        user.city = city !== undefined ? city : user.city;

        await user.save();

        res.status(200).json({ message: 'Profile updated successfully' });
        } catch (error) {
            
            console.error('Error updating profile:', error);
        res.status(500).json({ message: 'Error updating profile' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
