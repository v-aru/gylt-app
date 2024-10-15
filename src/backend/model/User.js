const mongoose = require('mongoose');
const { Schema } = mongoose;
import { genSalt, hash, compare } from 'bcryptjs';

const userSchema = new Schema({
  username: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  oauthProvider: { type: String, required: false }, 
  dateOfBirth: { type: String, required: false },
  gender: { type: String, required : false },
  city: { type : String, required: false },
  date: { type: Date, default: Date.now },
  profileImage: { type: String, required: false },
  age: { type: Number, required: false },
});


// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next(); 
//   try {
//     const salt = await genSalt(10); 
//     this.password = await hash(this.password, salt); 
//     next();
//   } catch (err) {
//     next(err);
//   }
// });


// userSchema.methods.comparePassword = async function (candidatePassword) {
//   return compare(candidatePassword, this.password);
// };

const User = mongoose.models.User ||  mongoose.model('User', userSchema, 'userLogin-collection');
export default User;
