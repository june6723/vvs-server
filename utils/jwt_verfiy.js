import createError from 'http-errors'
import redisClient from '../config/redis.config.js'
import jwt from 'jsonwebtoken'


export const verfiyRefreshToken = (refreshToken, userId) => {
  return new Promise((resolve, reject) => {
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err)=> {
      if(err) {
        return reject(createError.Unauthorized('Cannot verified'))
      }
      redisClient.GET(userId, (err, value) => {
        if(err) {
          return reject(createError.InternalServerError('Redis error'))
        }
        if(value!==refreshToken) {
          console.log(value, refreshToken)
          return reject(createError.Unauthorized())
        } else {
          resolve(true)
        }
      })
    })
  })
}