import Community from '../models/Community.js';
import User from '../models/User.js';

export const createNewCommunity = async (req, res) => {
  const communityForm = req.body;
  const userId = req.userId;

  const newCommunity = new Community({
    ...communityForm,
    master: userId,
    member: [userId]
  });

  try {
    const user = await User.findOne({ _id: userId });
    const { _id } = await newCommunity.save();
    user.joinedCommunities.push(_id)
    await user.save();
    res.status(201).json(newCommunity);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};




