import dbConnect from "@/backend/dbConnect";
import Habit from "@/backend/model/Habit";
import { getToken } from 'next-auth/jwt'; 

export default async function handler(req, res) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  await dbConnect();
  
  const { method } = req;
    
  switch(method) {
    case 'GET': 
      try {
        const { userId } = req.query;
        const habits = await Habit.find({ userId: userId }); // Get all habits
        res.status(200).json(habits);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
      break;
    
      case 'POST':
        try {
          const userId = token.sub;
          const habit = new Habit({
            ...req.body,
            user: userId,
          });
          await habit.save();
          //res.status(201).json(savedHabit);
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
        break;

      default:
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${method} Not Allowed`);
        break;
    }
  }