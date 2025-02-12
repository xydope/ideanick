import { ideas } from '../../lib/ideas'
import { trpc } from '../../lib/trpc'
import { z } from 'zod'

export const getIdeaTrpcRoute = trpc.procedure.input(z.object({ ideaNick: z.string() })).query(({ input }) => {
  const idea = ideas.find((idea) => idea.nick === input.ideaNick)
  return { idea: idea || null }
})
