// /utils/userUtils.js
import dbConnect from '@/backend/dbConnect'; 
import User from '@/backend/model/User'; 

export const findOrCreateUser = async (userData) => {
  // Connect to the database
  await dbConnect();

  // Check if the user already exists
  const existingUser = await User.findOne({ email: userData.email });
  if (!existingUser) {
    // Create a new user if they don't exist
    const newUser = new User({
      name: userData.name,
      email: userData.email,
      image: userData.image, 
      userId: userData.userId,
      gender: userData.gender,
      dateOfBirth: userData.dateofBirth,
      city: userData.city,
    });

    await newUser.save();
  }
};
