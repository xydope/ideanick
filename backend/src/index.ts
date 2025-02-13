import { AppContext, createAppContext } from './lib/ctx'
import { applyTrpcToExpressApp } from './lib/trpc'
import cors from 'cors'
import express from 'express'
import { trpcRouter } from './router'
;(async () => {
  let ctx: AppContext | null = null

  try {
    ctx = createAppContext()

    const expressApp = express()

    const PORT = 3000

    expressApp.use(cors())

    expressApp.get('/ping', (req, res) => {
      res.send('Pong!')
    })

    applyTrpcToExpressApp(expressApp, ctx, trpcRouter)

    expressApp.listen(PORT, () => {
      console.info(`Listening at http://localhost:${PORT}`)
    })
  } catch (error) {
    console.error(error)
    await ctx?.stop()
  }
})()
