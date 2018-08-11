const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
	author: {
		type: String,
		required: true,
		trim: true
	},
	body: {
		type: String,
		required: true,
		trim: true
	},
	timestamp: {
		type: Date,
		required: true,
		default: Date.now
	},
	score: {
		type: Number,
		required: true,
		default: 0
	}
})

module.exports = CommentSchema
