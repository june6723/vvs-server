import Community from '../models/Community.js';

export const createNewCommunity = async (req, res) => {
  const communityForm = req.body;
  const userId = req.userId;

  const newCommunity = new Community({
    ...communityForm,
    master: userId,
    member: [userId]
  });

  try {
    await newCommunity.save();
    res.status(201).json(newCommunity);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};


