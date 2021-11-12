import mongoose from 'mongoose'
import mongooseUniqueValidator from 'mongoose-unique-validator'

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true, maxlength: 200 },
  rating: { type: String, required: true, min: 1, max: 5 },
}, {
  timestamps: true,
})

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  age: { type: Number, required: true },
  position: { type: String, required: true },
  bio: { type: String, required: true, maxlength: 400 },
  image: { type: String, required: true },
  comments: [commentSchema],
})

playerSchema.plugin(mongooseUniqueValidator)

const Players = mongoose.model('Players', playerSchema)

export default Players