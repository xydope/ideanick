import _ from 'lodash'
import { initTRPC } from '@trpc/server'
import { z } from 'zod'

const ideas = _.times(100, (i) => ({
  nick: `cool-idea-nick-${i}`,
  name: `Idea ${i} title`,
  description: `Idea ${i} description`,
  text: _.times(5, (j) => `<p>Paragraph ${j} of idea ${i}</p>`).join(''),
}))

const trpc = initTRPC.create()

export const trpcRouter = trpc.router({
  getIdeas: trpc.procedure.query(() => {
    return {
      ideas: ideas.map((idea) => _.pick(idea, ['nick', 'name', 'description'])),
    }
  }),
  getIdea: trpc.procedure.input(z.object({ ideaNick: z.string() })).query(({ input }) => {
    const idea = ideas.find((idea) => idea.nick === input.ideaNick)
    return { idea: idea || null }
  }),
})

export type TrpcRouter = typeof trpcRouter
