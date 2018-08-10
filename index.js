require('dotenv').config()
const express = require('express')

const app = express()

app.get('/', (req, res) => {
	res.status(200).send('Hello world!')
})

const port = process.env.PORT || 3000
app.listen(port, () => {
	console.log(`Listening on port ${port}`)
})