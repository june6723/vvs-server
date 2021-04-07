import mongoose, { Schema } from 'mongoose';

const commentSchema = mongoose.Schema({
  creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
  text: { type: String, required: true, maxlength: 500 },
  likes: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }],
});

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;