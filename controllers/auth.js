import User from '../models/user.js'

async function registerUser(req, res, next) {
  try {
    const createdUser = User.create(req.body)
    return res.status(201).json({
      message: `Welcome ${createdUser.username}`,
    })
  } catch (err) {
    next(err)
  }
}

export default {
  register: registerUser,
}