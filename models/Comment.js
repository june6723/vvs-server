import mongoose from 'mongoose';
const { Schema } = mongoose; 

const commentSchema = mongoose.Schema({
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  post: { type: Schema.Types.ObjectId, ref: 'Post'},
  text: { type: String, required: true, maxlength: 500 },
  likes: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }],
  replyOn: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' },
  replies: [{ type: Schema.Types.ObjectId, ref: 'Comment', default: [] }]
}, {timestamps: true});

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;