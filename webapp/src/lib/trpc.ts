import type { TrpcRouter } from '@ideanick/backend/src/trpc'
import { createTRPCReact } from '@trpc/react-query'

export const trpc = createTRPCReact<TrpcRouter>()
