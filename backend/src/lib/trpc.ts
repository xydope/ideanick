import * as trpcExpress from '@trpc/server/adapters/express'
import { AppContext } from './ctx'
import { Express } from 'express'
import { TrpcRouter } from '../router'
import { initTRPC } from '@trpc/server'

export const trpc = initTRPC.context<AppContext>().create()

export const applyTrpcToExpressApp = (expressApp: Express, appContext: AppContext, trpcRouter: TrpcRouter) => {
  expressApp.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
      router: trpcRouter,
      createContext: () => appContext,
    })
  )
}
