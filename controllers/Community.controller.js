import Community from '../models/Community.js';
import User from '../models/User.js';
import Post from '../models/Post.js';
import createError from 'http-errors'

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
    console.log(error)
    res.status(409).json({ error: error.message });
  }
};

export const latestCommunities = async (req, res, next) => {
  const { page, lastId } = req.query;
  let lastId_in_this_query;

  if (page === '1') {
    try {
      const result = await Community.find().sort({ createdAt: -1 }).limit(10);
      if (result.length === 0) return res.send()
      lastId_in_this_query = result[result.length-1]._id;
      res.status(201).json({ result, lastId_in_this_query })
    } catch (error) {
      next(error)
    }
  } else {
    try {
      const result = await Community.find({'_id': {'$gt': lastId}}).limit(10);
      lastId_in_this_query = result[result.length-1]._id;
      res.status(201).json({ result, lastId_in_this_query })
    } catch (error) {
      res.status(409).json({ error: error.message });
    }
  }
};

export const findCommunity = async (req, res) => {
  const { cmd, value } = req.query;

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
    const result = await Post.find({ community: communityId }).populate('creator')
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
};

export const requestToJoinCommunity = async (req, res) => {
  const userId = req.userId;
  const communityId = req.params.id;
  try {
    const { requestToJoin, member, memberRequest } = await Community.findOne({ _id: communityId });
    if (requestToJoin) {
      if (memberRequest.includes(userId)) throw new Error('Already joined');
      memberRequest.push(userId);
    } else {
      if (member.includes(userId)) throw new Error('Already sent request to join');
      member.push(userId);
    }
    const updated = await Community.findByIdAndUpdate(communityId, { member, memberRequest }, { new:true });
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

export const handleJoinRequest = async (req, res) => {
  const { communityId, userId } = req.params;
  const approved = req.query.approve === "true" ? true : false;
  const authUser = req.userId;

  try {    
    const currentCommunity = await Community.findOne({ _id: communityId});
    const adminList = currentCommunity.admin.map((id) => id.toString())
    if (currentCommunity.master.equals(authUser) || adminList.includes(authUser)) {
      if (approved) {
        currentCommunity.member.push(userId); 
      }
      currentCommunity.memberRequest = currentCommunity.memberRequest.filter((id) => !id.equals(userId));
      const result = await currentCommunity.save();
      res.status(200).send(result);
    } else {
      console.log('err');
      throw new Error(`Not authorized member.`);
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

