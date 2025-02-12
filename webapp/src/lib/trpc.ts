import type { TrpcRouter } from '@ideanick/backend/src/router'
import { createTRPCReact } from '@trpc/react-query'

export const trpc = createTRPCReact<TrpcRouter>()
