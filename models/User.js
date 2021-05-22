import mongoose from 'mongoose';
import validator from 'validator';
const { Schema } = mongoose; 

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { 
    type: String,
    required: [true, 'Please enter an email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please enter a valid email']
  },
  password: { 
    type: String, 
    required: [true, 'Please enter a password'],
    minlength: [8, 'Minimum password length is 8 characters'] 
  },
  phoneNumber: { type: String },
  birthDate: { type: Date },
  gender: { type: String, enum: ['male', 'female', 'others'] },
  profileImg: { type: String, default: null },
  createdAt: { type: Date, default: new Date() },
  pwUpdated: { type: Date, default: new Date() },
  outDate: { type: Date },
  joinedCommunities: [{ type: Schema.Types.ObjectId, ref: 'Community' }],
  follwer: [{ type: Schema.Types.ObjectId, ref: 'User'}],
  following: [{ type: Schema.Types.ObjectId, ref: 'User'}],
})

const User = mongoose.model('User', userSchema);

export default User;