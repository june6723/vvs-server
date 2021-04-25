import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Community from '../models/Community.js';

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) return res.status(404).json({ message: "User doesn't exists." });
    
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: existingUser._id }, process.env.TOKEN_SECRET, { expiresIn: "30m" });
    const profile = { name: existingUser.name, profileImg: existingUser.profileImg };

    res.status(200).json({ token, profile });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
};

export const signup = async (req, res) => {
  const { email, password, confirmPassword, name, birthDate, gender } = req.body;
  
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists." });

    if (password !== confirmPassword) return res.status(400).json({ message: "Password don't match." });
    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({ email, password: hashedPassword, name, birthDate, gender });
    const token = jwt.sign({ id: result._id }, process.env.TOKEN_SECRET, { expiresIn: "30m" });
    const profile = { name: result.name, profileImg: result.profileImg };

    res.status(200).json({ token, profile });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong.' });
  }
};

export const getJoinedCommunities = async (req, res) => {
  const userId = req.userId;

  try {
    const { joinedCommunities } = await User.findOne({ _id: userId });
    const result = await Community.find({
      '_id': { $in: joinedCommunities }
    })
    res.status(200).json({ communityList: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong.' });
  }
}