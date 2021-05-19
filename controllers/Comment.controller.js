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
      .populate('creator', { name:1, profileImg:1 }).populate('replies').exec()
    console.log(result)
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
    const reply = await newComment.save()
    const comment = await Comment.findByIdAndUpdate(commentId, { $push: { replies: reply._id }}, { new:true })
      .populate('creator', 'replies').exec()
    res.send(comment)
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
        .populate('creator').populate('replies').exec()
    } else {
      updated = await Comment.findByIdAndUpdate(commentId, { $push: { likes: userId }}, { new: true})
        .populate('creator').populate('replies').exec()
    }
    res.send(updated)
  } catch (error) {
    next(error)
  }
}