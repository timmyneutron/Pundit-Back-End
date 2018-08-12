const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
	parentId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Post',
		required: true
	},
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
	voteScore: {
		type: Number,
		required: true,
		default: 0
	}
})

const Comment = mongoose.model('Comment', CommentSchema)

module.exports = Comment
