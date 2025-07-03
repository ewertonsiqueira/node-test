import { fastify } from 'fastify'
// import { DataBaseMemory } from './database-memory.js'
import { DataBasePostgres } from './database-postgres.js'

const server = fastify()

// const database = new DataBaseMemory()
const database = new DataBasePostgres()

server.post('/videos', async (request, replay) => {
  const { title, description, duration } = request.body

 await database.create({
    title,
    description,
    duration
  })

  return replay.status(201).send()
})

server.get('/videos', async (request) =>  {
  const search = request.query.search

  const videos = await database.list(search)
  
  return videos
})

server.put('/videos/:id',(request, replay) =>  {
  const { title, description, duration } = request.body
  const videoID = request.params.id
  
  database.updated(videoID, {
    title,
    description,
    duration
  })

  return replay.status(204).send()
})

server.delete('/videos/:id',(request, replay) =>  {
  const videoID = request.params.id

  database.delete(videoID)

  return replay.status(204).send()
})


server.listen({
  port: 3333
})