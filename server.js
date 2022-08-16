// IMPORTS
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const Router = require('./routes')
const HOST = process.env.HOST
const PORT = process.env.PORT

const app = express()

// SETUP
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


// ROUTES
app.use('/api', Router)

// SERVER FUNCTION
const start = async () => {
	try {
		app.listen(PORT, HOST)
		console.log(`Server started on ${HOST}:${PORT}`)
	} catch (err) {
		console.log(err)
	}
}

start()