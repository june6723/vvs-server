import User from '../models/User.js';
import Community from '../models/Community.js';
import createError from 'http-errors'

export const getJoinedCommunities = async (req, res) => {
  const userId = req.params.id === "me" ? req.userId : req.params.id;

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

export const findUser = async (req, res) => {
  const cmd = req.query.cmd;
  const value = req.query.value;

  if (!cmd) throw new Error("There's no find option."); 
  else if (!value) throw new Error("There's no value.");

  try {
    switch (cmd) {
      case 'id':
        const idResult = await User.findOne({ _id: value }, '_id email name gender birthDate joinedCommunities follower following profileImg')
        res.status(200).json(idResult);
        break;
      case 'name':
        const nameResult = await User.findOne({ name: value.toLowerCase() }, '_id email name gender birthDate joinedCommunities follower following profileImg');
        if (!nameResult) {
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

export const followOtherUser = async (req, res, next) => {
  try {
    const myId = req.userId
    const { followId } = req.params

    const followUser = await User.findById(followId)
    const add = !followUser.follower.includes(myId)
    if(add) {
      Promise.all([
        followUser.updateOne({ $push: { follower: myId }}, { new: true }),
        User.findByIdAndUpdate(myId, { $push: { following: followId }})
      ])
      .then(() => {
        return res.send(followUser)
      })
      .catch((err) => { return next(err) })
    } else {
      Promise.all([
        followUser.updateOne({ $pull: { follower: myId }}, { new: true }),
        User.findByIdAndUpdate(myId, { $pull: { following: followId }})
      ])
      .then(() => {
        return res.send(followUser)
      })
      .catch((err) => { return next(err) })
    }
  } catch (error) {
    next(error)
  }
}

export const setProfileImg = async (req, res, next) => {
  try {
    const userId = req.userId
    const { url } = req.body

    const result = await User.findByIdAndUpdate(userId, { profileImg: url }, { new: true }).select('_id email name gender birthDate joinedCommunities follower following profileImg')
    res.send(result)
  } catch (error) {
    next(error)
  }
}