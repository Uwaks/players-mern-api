import express from 'express'
import players from '../controllers/players.js'
import auth from '../controllers/auth.js'

const router = express.Router()

router.route('/players')
  .get(players.index)
  .post(players.create)

router.route('/players/:playerId')
  .get(players.show)
  .put(players.edit)
  .delete(players.delete)

router.route('/players/:playerId/comments')
  .post(players.commentCreate)

router.route('/players/:playerId/comments/:commentId')
  .delete(players.commentDelete)

router.post('/register', auth.register) 

export default router