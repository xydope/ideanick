import { applyTrpcToExpressApp } from './lib/trpc'
import cors from 'cors'
import express from 'express'
import { trpcRouter } from './router'

const expressApp = express()

const PORT = 3000

expressApp.use(cors())

expressApp.get('/ping', (req, res) => {
  res.send('Pong!')
})

applyTrpcToExpressApp(expressApp, trpcRouter)

expressApp.listen(PORT, () => {
  console.info(`Listening at http://localhost:${PORT}`)
})
