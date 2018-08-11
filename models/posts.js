const mongoose = require('mongoose')
const CommentSchema = require('./comments')
const Category = require('./categories')

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
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Category',
		required: true
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
	commentCount: {
		type: Number,
		required: true,
		default: 0
	},
	comments: [CommentSchema]
})

const Post = mongoose.model('Post', PostSchema)

module.exports = Post
