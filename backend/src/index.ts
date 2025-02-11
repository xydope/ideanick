import express from 'express'

import * as trpcExpress from '@trpc/server/adapters/express'

import { trpcRouter } from './trpc'

const expressApp = express()

const PORT = 3000

expressApp.get('/ping', (req, res) => {
  res.send('Pong!')
})

expressApp.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: trpcRouter,
  })
)

expressApp.listen(PORT, () => {
  console.info(`Listening at http://localhost:${PORT}`)
})
