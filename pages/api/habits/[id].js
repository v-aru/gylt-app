// import dbConnect from "@/backend/dbConnect";
// import Habit from "@/backend/model/Habit";
// import { getToken } from 'next-auth/jwt'; 

// export default async function handler(req, res) {
//   const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
//   if (!token) {
//     return res.status(401).json({ message: 'Unauthorized' });
//   }

//   const userId = token.sub;
//   await dbConnect();
  
//   const { method } = req;
//   const { id } = req.query;
    
//   switch(method) {   
//       case 'PUT':
//         try {
//           const habit = await Habit.findOne({ _id: id, user: userId });
//           if (!habit) {
//             return res.status(404).json({ message: 'Habit not found or unauthorized' });
//           }

//           const updatedHabit = await Habit.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
//           res.status(200).json(updatedHabit);
//         } catch (error) {
//           res.status(400).json({ success: false, error: error.message });
//         }
//         break;

//       default:
//         res.setHeader('Allow', ['PUT']);
//         res.status(405).end(`Method ${method} Not Allowed`);
//         break;
//     }
//   }

import dbConnect from "@/backend/dbConnect";
import Habit from "@/backend/model/Habit";

export default async function handler(req, res) {
    await dbConnect();
    const { method } = req;
    const { id } = req.query;

    switch (method) {
      case 'GET': 
        try {
          const habit = await Habit.findById(id);
          if (!habit) {
            return res.status(404).json({ success: false, message: 'Habit not found' });
          }
          res.status(200).json(habit);
        } catch (error) {
          res.status(400).json({ success: false, error: error.message });
        }
        break;

        case 'PUT':
          try {
            const existingHabit = await Habit.findById(id);
        
            if (!existingHabit) {
              return res.status(404).json({ success: false, message: 'Habit not found' });
            }

            const updatedData = {
              ...existingHabit.toObject(),
              ...req.body,  
            };
        
            const updatedHabit = await Habit.findByIdAndUpdate(id, updatedData, { new: true });
            
            res.status(200).json(updatedHabit);
          } catch (error) {
            res.status(400).json({ success: false, error: error.message });
          }
          break;
        

      default:
        res.setHeader('Allow', ['GET', 'PUT']);
        res.status(405).end(`Method ${method} Not Allowed`);
        break;
    }
}
