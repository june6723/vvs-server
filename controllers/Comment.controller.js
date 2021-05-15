import Comment from '../models/Comment.js'

export const createComment = async (req, res, next) => {
  try {
    const userId = req.userId
    const { postId } = req.params
    const text = req.body.text

    const newComment = new Comment({
      creator: userId,
      post: postId,
      text,
      likes: [],
      replies: []
    })
    const result = await newComment.save()
    res.send(result)
  } catch (error) {
    next(error) 
  }
}

export const getComments = async (req, res, next) => {
  try {
    const { postId } = req.params
    const result = await Comment.find({ post: postId }).populate('creator', 'replies').exec()
    console.log(result)
    res.send(result)
  } catch (error) {
    next(error)
  }
}

