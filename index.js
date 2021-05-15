import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/Posts.route.js';
import userRoutes from './routes/User.route.js';
import communityRoutes from './routes/Communities.route.js';
import commentsRoutes from './routes/Comments.route.js';
import authRoutes from './routes/Auth.route.js';
import uploadRoutes from './routes/Upload.route.js';
import dotenv from 'dotenv';
import createError from 'http-errors'

dotenv.config();

const app = express();

app.use(express.json({ limit: "5mb", extended: true }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));
app.use(cors({
  origin: true,
  credentials: true
}));

app.use('/upload', uploadRoutes)
app.use('/auth', authRoutes)
app.use('/user', userRoutes)
app.use('/posts', postRoutes)
app.use('/communities', communityRoutes)
app.use('/comments', commentsRoutes)

app.get('/', (req, res) => {
  res.send('Hello to VVS API');
})

app.use((req, res, next) => {
  next(createError.NotFound());
})

app.use((err, req, res, next) => {
  console.log(err)
  res.status(err.status || 500);
  res.send({
    error:{
      status: err.status || 500,
      message: err.message,
    }
  })
})

const CONNECTION_URL = process.env.DB_CONNECTION;
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
  .catch((error) => console.log(error));

mongoose.set('useFindAndModify', false);