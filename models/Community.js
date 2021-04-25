import mongoose from 'mongoose';
const { Schema } = mongoose; 

const communitySchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  tags: [{ type: String }],
  master: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  admin: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  member: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  requestToJoin : { type: Boolean, required: true },
  mainImg: { type: String },
  coverImg: { type: String },
}, {timestamps: true})

const Community = mongoose.model('Community', communitySchema);

export default Community;