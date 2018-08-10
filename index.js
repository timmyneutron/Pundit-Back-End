require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const routes = require('./routes')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

mongoose.connect("mongodb://localhost:27017/pundit", { useNewUrlParser: true })
.catch(() => console.log("\nThere was an error connecting to the database."))

const db = mongoose.connection

app.use('/', routes)

app.use((err, req, res, next) => {
	res.status(err.status || 500).send(err.message)
})

const port = process.env.PORT || 3000
app.listen(port, () => {
	console.log(`\nListening on port ${port}...`)
})