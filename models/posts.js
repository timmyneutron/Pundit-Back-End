const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
	author: {
		type: String,
		required: true,
		trim: true
	},
	title: {
		type: String,
		required: true,
		trim: true
	},
	body: {
		type: String,
		required: true,
		trim: true
	},
	category: {
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
	},
	deleted: {
		type: Boolean,
		required: true,
		default: false
	},
	commentCount: {
		type: Number,
		required: true,
		default: 0
	}
})

const Post = mongoose.model('Post', PostSchema)

module.exports = Post
