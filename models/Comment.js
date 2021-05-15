import mongoose from 'mongoose';
const { Schema } = mongoose; 

const commentSchema = mongoose.Schema({
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
  text: { type: String, required: true, maxlength: 500 },
  likes: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }],
  replies: [{ type: Schema.Types.ObjectId, ref: 'Comment', default: [] }]
});

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;