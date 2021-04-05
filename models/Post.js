import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
  title: { type: String, required: true },
  text: { type: String, required: true},
})

const Post = mongoose.model('Post', postSchema);

export default Post;