import { fastify } from 'fastify'
import { DataBasePostgres } from './database-postgres.js'

const server = fastify()

const database = new DataBasePostgres()

server.post('/videos', async (request, replay) => {
  const { title, description, duration } = request.body
  console.log(title, description, duration)

 await database.create({
    title,
    description,
    duration
  })
  console.log('depois')

  return replay.status(201).send()
})

server.get('/videos', async (request) =>  {
  console.log(request.query.search)
  const search = request.query.search

  const videos = await database.list(search)
  
  return videos
})

server.put('/videos/:id',async (request, replay) =>  {
  const { title, description, duration } = request.body
  const videoID = request.params.id
  
  await database.updated(videoID, {
    title,
    description,
    duration
  })

  return replay.status(204).send()
})

server.delete('/videos/:id', async (request, replay) =>  {
  const videoID = request.params.id

  await database.delete(videoID)

  return replay.status(204).send()
})


server.listen({
  port: 3333
})