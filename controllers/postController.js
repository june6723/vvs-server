import Post from '../models/Post.js';

export const createPost = async (req, res) => {
  const post = req.body;
  const userId = req.userId;
  
  const newPost = new Post({
     ...post, 
     creator: userId, 
     community: null,
  });

  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    console.log(error);
  }
};

export const createPostInCommunity = async (req, res) => {
  const post = req.body;
  const userId = req.userId;
  const communityId = req.params.id;

  const newPost = new Post({
    ...post, 
    creator: userId, 
    community: communityId,
  });

  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json(error);
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