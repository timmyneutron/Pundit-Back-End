require('dotenv').config()
const express = require('express')
const routes = require('./routes')

const app = express()

app.use('/', routes);

app.use((err, req, res, next) => {
	res.status(err.status || 500).send(err.message)
})

const port = process.env.PORT || 3000
app.listen(port, () => {
	console.log(`Listening on port ${port}`)
})