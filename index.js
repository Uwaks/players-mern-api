import express from 'express'

import { connectToDb } from './db/helpers.js'
import { logger } from './lib/logger.js'
import router from './config/router.js'
import errorHandler from './lib/errorHandler.js'

const app = express()
const port = 4000


app.use('/', logger)

app.use(express.json())

app.use('/api', router)

app.use(errorHandler)


async function startServer() {
  try {
    await connectToDb()
    console.log('🤖 Database has connected')
    app.listen(port, () => console.log(`🤖 Up and running on port ${port}`))
  } catch (err) {
    console.log('🤖 Something went wrong starting the App')
    console.log(err)
  }
}

startServer()


