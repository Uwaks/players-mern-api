import Players from '../models/player.js'
import { NotFound } from '../lib/errors.js'


// Get All Players
async function playerIndex(_req, res, next) {
  try {
    const players = await Players.find()
    return res.status(200).json(players)
  } catch (err) {
    next(err)
  }
}

// Create a Single Player
async function playerCreate(req, res, next) {
  try {
    const createdPlayer = await Players.create(req.body)
    return res.status(201).json(createdPlayer)
  } catch (err) {
    next(err)
  }
}

// Get a Player
async function playerShow(req, res, next) {
  const { playerId } = req.params
  try {
    const foundPlayer = await Players.findById(playerId)
    if (!foundPlayer) throw new NotFound()
    return res.status(200).json(foundPlayer)
  } catch (err) {
    next(err)
  }
}

// Edit a Player
async function playerEdit(req, res, next) {
  const { playerId } = req.params
  try {
    const playerToEdit = await Players.findById(playerId)
    if (!playerToEdit) throw new NotFound()
    Object.assign(playerToEdit, req.body)
    await playerToEdit.save()
    return res.status(202).json(playerToEdit)
  } catch (err) {
    next(err)
  }
}

// Delete a Player
async function playerDelete(req, res, next) {
  const { playerId } = req.params
  try {
    const playerToDelete = await Players.findById(playerId)
    if (!playerToDelete) throw new NotFound()
    await playerToDelete.remove()
    return res.sendStatus(204)
  } catch (err) {
    next(err)
  }
}

async function playerCommentCreate(req, res, next) {
  const { playerId } = req.params
  try {
    const commentedPlayer = await Players.findById(playerId)
    if (!commentedPlayer) {
      throw new NotFound()
    }
    commentedPlayer.comments.push(req.body)
    await commentedPlayer.save()
    return res.sendStatus(200).json(commentedPlayer)
  } catch (err) {
    next(err)
  }
}

async function playerCommentDelete(req, res, next) {
  const { playerId, commentId } = req.params
  try {
    const player = await Players.findById(playerId)
    if (!player) {
      throw new NotFound()
    }
    const commentToDelete = await player.comments.index(commentId)
    if (!commentToDelete) {
      throw new NotFound()
    }
    commentToDelete.remove()
    await player.save()
    return res.status(204)
  } catch (err) {
    next(err)
  }
}

export default {
  index: playerIndex,
  create: playerCreate,
  show: playerShow,
  edit: playerEdit,
  delete: playerDelete,
  commentCreate: playerCommentCreate,
  commentDelete: playerCommentDelete,
}