import upload from '../middleware/upload.js'
import express from 'express'
// AWS Series
import AWS from 'aws-sdk'
import fs from 'fs'

const router = express.Router();

router.post('/', upload.single('mainImg'), async (req, res, next) => {
  AWS.config.update({
    credentials: {
      accessKeyId:process.env.AWS_KEY,
      secretAccessKey: process.env.AWS_SECRET,
    },
    region: 'us-east-1',
  })
  try {
    const file = req.file
    console.log(file)
    const fileStream = fs.createReadStream(file.path)
    fileStream.on('error', (err)=> {
      return next(err)
    })
    await new AWS.S3().putObject({
      Key: file.filename,
      Body: fileStream,
      Bucket: process.env.BUCEKT_NAME,
      ACL: 'public-read'
    }).promise()
    const url = `https://letzgetitfsjune6723.s3.amazonaws.com/${file.filename}`
    res.send({ url })
  } catch (error) {
    next(error)
  } finally {
    fs.unlink(file.path, (err) => {
      console.log()
    })
  }
})

export default router;