require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const routes = require('./routes')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

mongoose.connect(process.env.MONGODB_URI)

const db = mongoose.connection

db.on('error', error => console.log(`ERROR: ${error.message}`))

app.use('/', routes)

app.use((err, req, res, next) => {
	res.status(err.status || 500).send(err.message)
})

const port = process.env.PORT || 3000
app.listen(port, () => {
	console.log(`\nListening on port ${port}...`)
})