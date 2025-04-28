import { AppContext, createAppContext } from './lib/ctx'
import { applyPassportToExpressApp } from './lib/passport'
import { applyTrpcToExpressApp } from './lib/trpc'
import cors from 'cors'
import { env } from './lib/env'
import express from 'express'
import { presetDb } from './scripts/presetDb'
import { trpcRouter } from './router'
;(async () => {
  let ctx: AppContext | null = null

  try {
    ctx = createAppContext()
    await presetDb(ctx)
    const expressApp = express()
    expressApp.use(cors())
    expressApp.get('/ping', (_, res) => {
      res.send('Pong!')
    })

    applyPassportToExpressApp(expressApp, ctx)

    await applyTrpcToExpressApp(expressApp, ctx, trpcRouter)

    expressApp.listen(env.PORT, () => {
      console.info(`Listening at http://localhost:${env.PORT}`)
    })
  } catch (error) {
    console.error(error)
    await ctx?.stop()
  }
})()
