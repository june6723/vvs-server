import Post from '../models/Post.js';

export const createPost = async (req, res) => {
  const post = req.body;
  const userId = req.userId;
  
  const newPost = new Post({
    ...post, 
    creator: userId, 
  });

  try {
    const { _id } = await newPost.save();
    const result = await Post.findById(_id).populate('creator')
    res.status(201).json(result);
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
  const postId = req.params.id;
  try {
    const post = await Post.findById(postId)
    let result
    if(post.likes.includes(userId)) {
      result = await post.updateOne({ $pull: { likes: userId } },{ new: true }).exec()
    } else {
      result = await post.updateOne({ $push: { likes: userId } },{ new: true }).exec()
    }
    res.send(result)
  } catch (error) {
    next(error)
  }
}

export const dislikePost = async (req, res, next) => {
  const userId = req.userId
  const postId = req.params.id;
  try {
    const post = await Post.findById(postId)
    let result
    if(post.dislikes.includes(userId)) {
      result = await post.updateOne({ $pull: { dislikes: userId } },{ new: true }).exec()
    } else {
      result = await post.updateOne({ $push: { dislikes: userId } },{ new: true }).exec()
    }
    res.send(result)
  } catch (error) {
    next(error)
  }
}