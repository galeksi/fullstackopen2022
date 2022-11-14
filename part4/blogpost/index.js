const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const blogsRouter = require('./controllers/blogs')

// const blogSchema = new mongoose.Schema({
//     title: String,
//     author: String,
//     url: String,
//     likes: Number
// })

// const Blog = mongoose.model('Blog', blogSchema)

const mongoUrl = config.MONGODB_URI

mongoose.connect(mongoUrl)
    .then(() => {
        logger.info('connected')
    })
    .catch((err) => logger.error('err'))

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)

app.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`)
})