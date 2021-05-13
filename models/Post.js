import mongoose from 'mongoose';
const { Schema } = mongoose; 

const postSchema = mongoose.Schema({
  creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  community: { type: Schema.Types.ObjectId, ref: 'Community' },
  title: { type: String, required: true },
  text: { type: String, required: true},
  images: [{ type: String }],
  videos: [{ type: String }],
  tags: [{ type: String }],
  likes: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }],
  dislikes: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }],
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment', default: [] }],
}, { timestamps: true })

const Post = mongoose.model('Post', postSchema);

export default Post;