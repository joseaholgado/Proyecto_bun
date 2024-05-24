import express from 'express'
import body_parser from 'body-parser'
import mongoose from 'mongoose'
import Event from './models/event.mjs'

const app = express()
app.use(body_parser.json())
app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  next()
})

mongoose.connect('mongodb://localhost:27017/humanity_events')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err))

app.post('/events', async (req, res) => {
  const event = new Event(req.body)
  try {
    await event.save()
    res.status(201).send(event)
  } catch (error) {
    res.status(400).send(error)
  }
})

app.get('/events', async (req, res) => {
  try {
    const events = await Event.find({})
    res.send(events)
  } catch (error) {
    res.status(500).send(error)
  }
})

app.get('/events/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
    if (!event) {
      res.status(404).send({ message: "Event not found" })
    } else {
      res.send(event)
    }
  } catch (error) {
    console.error("Error retrieving the event:", error)
    res.status(500).send({ message: "Error retrieving the event" })
  }
})

app.patch('/events/:id', async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!event) {
      return res.status(404).send()
    }
    res.send(event)
  } catch (error) {
    res.status(400).send(error)
  }
})

app.delete('/events/:id', async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id)
    if (!event) {
      return res.status(404).send()
    }
    res.send(event)
  } catch (error) {
    res.status(500).send(error)
  }
})

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000/events')
})
