const mongoose = require('mongoose');
const { Schema } = mongoose;
import { genSalt, hash, compare } from 'bcryptjs';

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  dateOfBirth: { type: String },
  firstName: { type: String, required: true},
  lastName: { type: String, required: true},
  date: { type: Date, default: Date.now },
});


userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); 
  try {
    const salt = await genSalt(10); 
    this.password = await hash(this.password, salt); 
    next();
  } catch (err) {
    next(err);
  }
});


userSchema.methods.comparePassword = async function (candidatePassword) {
  return compare(candidatePassword, this.password);
};

const User = mongoose.models.User ||  mongoose.model('User', userSchema, 'userLogin-collection');
export default User;
