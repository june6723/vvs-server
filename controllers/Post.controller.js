import Post from '../models/Post.js';

export const createPost = async (req, res) => {
  const post = req.body;
  const userId = req.userId;
  
  const newPost = new Post({
    ...post, 
    creator: userId, 
  });

  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    console.log(error);
  }
};

export const getMyPosts = async (req, res) => {
  const userId = req.userId;
  
  try {
    const result = await Post.find({ creator: userId, community: null }).sort({ _id: -1});

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};

export const likePost = async (req, res, next) => {
  const userId = req.userId
  const postId = req.body.postId
  try {
    const result = await Post.findByIdAndUpdate(postId, { $push: { likes: userId } },{ new: true }).exec()
    res.send(result)
  } catch (error) {
    next(error)
  }
}