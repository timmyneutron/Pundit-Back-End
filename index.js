require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const routes = require('./routes')
const Category = require('./models/Category')
const Post = require('./models/Post')
const loadDefaultData = require('./models/defaultData')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/pundit'

mongoose.connect(uri, { useNewUrlParser: true })

const db = mongoose.connection

db.on('error', error => console.log(`ERROR: ${error.message}`))

if (process.env.DEFAULT_DATA) {
	loadDefaultData()
}

app.use('/', routes)

app.use((err, req, res, next) => {
	res.status(err.status || 500).send(err)
})

const port = process.env.PORT || 3001
app.listen(port, () => {
	console.log(`\nListening on port ${port}...\n`)
})