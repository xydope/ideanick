import _ from 'lodash'

export const ideas = _.times(100, (i) => ({
  nick: `cool-idea-nick-${i}`,
  name: `Idea ${i} title`,
  description: `Idea ${i} description`,
  text: _.times(5, (j) => `<p>Paragraph ${j} of idea ${i}</p>`).join(''),
}))
