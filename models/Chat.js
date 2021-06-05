import mongoose from 'mongoose';
const { Schema } = mongoose; 

const chatSchema = mongoose.Schema({
  name: { type: String, required: true },
  community: { type: Schema.Types.ObjectId, ref: 'Community' },
}, {timestamps: true});

const Chat = mongoose.model('Comment', chatSchema);

export default Chat;