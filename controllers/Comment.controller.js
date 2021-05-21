import Comment from '../models/Comment.js'
import Post from '../models/Post.js'

export const createComment = async (req, res, next) => {
  try {
    const userId = req.userId
    const { text, postId} = req.body

    const newComment = new Comment({
      creator: userId,
      post: postId,
      text,
      likes: [],
      replies: []
    })
    const { _id } = await newComment.save()
    await Post.findByIdAndUpdate(postId, { $push: { comments: _id }})
    const result = await Comment.findOne(_id).populate('creator').exec()
    res.send(result)
  } catch (error) {
    next(error) 
  }
}

export const getComments = async (req, res, next) => {
  try {
    const { postId } = req.params
    const result = await Comment.find({ post: postId })
      .populate('creator', { name:1, profileImg:1 }).exec()
    res.send(result)
  } catch (error) {
    next(error)
  }
}

export const createReply = async (req, res, next) => {
  try {
    const userId = req.userId
    const { commentId, postId, text } = req.body

    const newComment = new Comment({
      creator: userId,
      post: postId,
      text,
      likes: [],
      replyOn: commentId,
      replies: []
    })
    const { _id } = await newComment.save()
    const reply = await Comment.findOne({ _id }).populate('creator').exec()
    await Comment.findByIdAndUpdate(commentId, { $push: { replies: _id }})
    res.send(reply)
  } catch (error) {
    next(error)
  }
}

export const likeComment = async (req, res, next) => {
  try {
    const userId = req.userId
    const { commentId } = req.params
    
    const comment = await Comment.findOne({ _id: commentId })
    let updated
    if(comment.likes.includes(userId)) {
      updated = await Comment.findByIdAndUpdate(commentId, { $pull: { likes: userId }}, { new: true})
        .populate('creator').exec()
    } else {
      updated = await Comment.findByIdAndUpdate(commentId, { $push: { likes: userId }}, { new: true})
        .populate('creator').exec()
    }
    res.send(updated)
  } catch (error) {
    next(error)
  }
}

export const getReplies = async (req, res, next) => {
  try {
    const { commentId } = req.params

    const replies = await Comment.find({ replyOn: commentId }).populate('creator').exec()
    console.log(replies)
    res.send(replies)
  } catch (error) {
    next(error)
  }
}