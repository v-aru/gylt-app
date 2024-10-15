// import dbConnect from "@/backend/dbConnect";
// import Habit from "@/backend/model/Habit";
// import { getToken } from 'next-auth/jwt'; 

// export default async function handler(req, res) {
//   const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
//   if (!token) {
//     return res.status(401).json({ error: "Not authenticated" });
//   }
//   await dbConnect();
  
//   const { method } = req;
    
//   switch(method) {
//     case 'GET': 
//       try {
//         const { userId } = req.query;
//         let habits;
//         if (userId) {
//           // Fetch habits tied to the user
//           habits = await Habit.find({ userId: userId });
//         } else {
//           // Fetch habits not tied to any user
//           habits = await Habit.find({ userId: null });
//         }
        
//         if (habits.length === 0) {
//           return res.status(404).json({ message: 'No habits found' });
//         }

//         res.status(200).json(habits);
//       } catch (error) {
//         res.status(500).json({ message: error.message });
//       }
//       break;
    
//       case 'POST':
//         try {
//           const userId = token ? token.sub : null;
//           const habit = new Habit({
//             ...req.body,
//             userId: userId,
//           });
//           const savedHabit = await habit.save();
//           res.status(201).json(savedHabit);
//         } catch (error) {
//           res.status(500).json({ message: error.message });
//         }
//         break;

//       default:
//         res.setHeader('Allow', ['GET', 'POST']);
//         res.status(405).end(`Method ${method} Not Allowed`);
//         break;
//     }
//   }

import dbConnect from "@/backend/dbConnect";
import Habit from "@/backend/model/Habit";
import { getToken } from "next-auth/jwt";

export default async function handler(req, res) {
    await dbConnect();
    const { method } = req;
    // const { userId } = req.query; // Get userId from query params
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const userId = token ? token.id : null;

    switch (method) {
      case 'GET': 
      try {
        let habits;
        if (userId) {
          // Fetch habits for the logged-in user
          habits = await Habit.find({ userId: userId });
        } else {
          // Fetch habits not tied to any user (for example, public or default habits)
          habits = await Habit.find({ userId: null });
        }

        res.status(200).json(habits);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
        break;

      case 'POST':
        try {
          const habit = new Habit(req.body);
          await habit.save();
          res.status(201).json(habit);
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
