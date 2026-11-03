import mongoose from "mongoose";
import { genSalt, hash, compare } from "bcryptjs";

const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  // Only set for email/password accounts; never returned unless explicitly selected.
  password: { type: String, select: false },
  oauthProvider: { type: String },
  dateOfBirth: { type: String },
  gender: { type: String },
  city: { type: String },
  profileImage: { type: String },
  date: { type: Date, default: Date.now },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password") || !this.password) return next();
  try {
    const salt = await genSalt(10);
    this.password = await hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.methods.comparePassword = function (candidatePassword) {
  if (!this.password) return false;
  return compare(candidatePassword, this.password);
};

const User = mongoose.models.User || mongoose.model("User", userSchema, "userLogin-collection");
export default User;
