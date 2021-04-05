import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
  try {
    console.log(req.header);

    next();
  } catch (error) {
    console.log(error);
  }
}

export default auth;