import _ from 'lodash'
import { initTRPC } from '@trpc/server'

const ideas = _.times(100, (i) => ({
  nick: `cool-idea-nick-${i}`,
  name: `Idea ${i} title`,
  description: `idea ${i} description`,
  text: _.times(5, (j) => `<p>Paragraph ${j} of idea ${i}</p>`).join(''),
}))

const trpc = initTRPC.create()

export const trpcRouter = trpc.router({
  getIdeas: trpc.procedure.query(() => {
    return {
      ideas: ideas.map((idea) => _.pick(idea, ['nick', 'name', 'description'])),
    }
  }),
})

export type TrpcRouter = typeof trpcRouter
