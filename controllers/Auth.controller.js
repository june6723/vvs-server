import redisClient from '../config/redis.config.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import createError from 'http-errors'
import { verfiyRefreshToken } from '../utils/jwt_verfiy.js';

const expireTime = 15 * 60

export const signUp = async (req, res, next) => {
  const { email, password, confirmPassword, name, birthDate, gender } = req.body
  
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return next(createError.Conflict('User already exists.'))

    if (password !== confirmPassword) return next(createError.Conflict("Password doesn't match."))
    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({ email, password: hashedPassword, name, birthDate, gender });
    const accessToken = jwt.sign({ id: result._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: expireTime });
    const refreshToken = jwt.sign({}, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1y"})
    const profile = { name: result.name, profileImg: result.profileImg };

    redisClient.SET(result._id.toString(), refreshToken, 'EX', 365*24*60*60, (err, reply) => {
      if(err){
        next(err)
        return
      }
      res.send({ accessToken, accessTokenExp: expireTime, refreshToken, profile });
    })
  } catch (error) {
    next(error)
  }
} 

export const logIn = async (req, res, next) => {
  const { email, password } = req.body;
  
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) return next(createError.NotFound('Email/Password not valid'))
    
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect) return next(createError.NotFound('Email/Password not valid'))

    const accessToken = jwt.sign({ id: existingUser._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: expireTime });
    const refreshToken = jwt.sign({}, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1y"})
    const profile = { name: existingUser.name, profileImg: existingUser.profileImg };

    redisClient.SET(existingUser._id.toString(), refreshToken, 'EX', 365*24*60*60, (err, result) => {
      if(err){
        next(err)
        return
      }
      res.send({ accessToken, accessTokenExp: expireTime, refreshToken, profile });
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
} 

export const signNewToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body
    if (!refreshToken) throw createError.BadRequest();
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.decode(token)
    const userId = decoded.id

    const existingUser = await User.findById(userId);
    if (!existingUser) return next(createError.NotFound("User doesn't exists."))

    await verfiyRefreshToken(refreshToken, userId)

    const accessToken = jwt.sign({ id: userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: expireTime });
    const newRefreshToken = jwt.sign({}, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1y"})
    const profile = { name: existingUser.name, profileImg: existingUser.profileImg };

    redisClient.SET(userId, newRefreshToken, 'EX', 365*24*60*60, (err, result) => {
      if(err){
        next(err)
        return
      }
      res.send({ accessToken, accessTokenExp: expireTime, refreshToken: newRefreshToken, profile });
    })
  } catch (error) {
    next(error);
  }
} 

export const logOut = (req, res, next) => {
  try {
    const {refreshToken} = req.body
    if (!refreshToken) throw createError.BadRequest()

    const accessToken = req.headers.authorization.split(" ")[1];
    const decoded = jwt.decode(accessToken)
    const userId = decoded.id

    redisClient.DEL(userId, (err, value) => {
      if (err) {
        console.log(err.message)
        throw createError.InternalServerError()
      }
      console.log(value)
      res.sendStatus(204)
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
} 