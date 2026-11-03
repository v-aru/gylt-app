import dbConnect from "@/backend/dbConnect";
import User from "@/backend/model/User";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ message: "Only POST requests are allowed." });
  }

  const { username, email, password, firstName, lastName, dateOfBirth, gender, city } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }
  if (password.length < 8) {
    return res.status(400).json({ message: "Password must be at least 8 characters." });
  }

  try {
    await dbConnect();

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: "An account with this email already exists." });
    }

    await User.create({ username, email, password, firstName, lastName, dateOfBirth, gender, city });

    res.status(201).json({ message: "Account created!" });
  } catch (error) {
    console.error("Error signing up:", error);
    res.status(500).json({ message: "Could not create your account. Please try again." });
  }
}
