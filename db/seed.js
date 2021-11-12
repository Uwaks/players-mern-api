import Players from '../models/player.js'
import { connectToDb, truncateDb, disconnectDb } from './helpers.js'
import playerData from './data/players.js'

async function seed() {
  try {
    await connectToDb()
    console.log('🤖 Database Connected')

    await truncateDb()
    console.log('🤖 Database Dropped')

    const player = await Players.create(playerData)
    console.log(`🤖 ${player.length} Players added to Database`)

    console.log('🤖 Goodbye')
  } catch (err) {
    console.log('🤖 Something went wrong')
    console.log(err)
  }

  await disconnectDb()
}

seed()