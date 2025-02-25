import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import { env } from '../lib/env'
import { httpBatchLink } from '@trpc/client'
import superjson from 'superjson'
import { trpc } from './trpc'
import { useState } from 'react'

export function TrpcProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            refetchOnWindowFocus: false,
          },
        },
      })
  )
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: env.VITE_BACKEND_TRPC_URL,
          transformer: superjson,
          headers: () => {
            const token = Cookies.get('token')
            return {
              ...(token && { authorization: `Bearer ${token}` }),
            }
          },
        }),
      ],
    })
  )
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  )
}
