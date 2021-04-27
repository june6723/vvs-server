import Community from '../models/Community.js';
import User from '../models/User.js';
import Post from '../models/Post.js';

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

export const findCommunity = async (req, res) => {
  const cmd = req.query.cmd;
  const value = req.query.value;

  if (!cmd) throw new Error("There's no find option."); 
  else if (!value) throw new Error("There's no value.");

  try {
    switch (cmd) {
      case 'id':
        const idResult = await Community.findOne({ _id: value })
        res.status(200).json(idResult);
        break;
      case 'name':
        const nameResult = await Community.find({ name: new RegExp('\\b' + value, 'i') });
        if (!nameResult.length) {
          res.status(204).json();
          break;
        }
        res.status(200).json(nameResult);
        break;
      default:
        res.status(200).json({ message: "no result" });
        break;
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
}

export const getCommunityPosts = async (req, res) => {
  const communityId = req.params.id;
  
  try {
    const result = await Post.find({ community: communityId });
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
};