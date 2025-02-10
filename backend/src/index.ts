import express from 'express'

const expressApp = express()

const PORT = 3000

expressApp.get('/ping', (req, res) => {
  res.send('Pong!')
})

const ideas = [
  { nick: 'cool-idea-nick-1', name: 'Idea 1 title', description: 'idea 1 description' },
  { nick: 'cool-idea-nick-2', name: 'Idea 2 title', description: 'idea 2 description' },
  { nick: 'cool-idea-nick-3', name: 'Idea 3 title', description: 'idea 3 description' },
  { nick: 'cool-idea-nick-4', name: 'Idea 4 title', description: 'idea 4 description' },
  { nick: 'cool-idea-nick-5', name: 'Idea 5 title', description: 'idea 5 description' },
]

expressApp.get('/ideas', (req, res) => {
  res.send(ideas)
})

expressApp.listen(PORT, () => {
  console.info(`Listening at http://localhost:${PORT}`)
})
