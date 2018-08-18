const express = require('express')
const { validationResult } = require('express-validator/check')
const Category = require('../models/Category')
const Post = require('../models/Post')
const Comment = require('../models/Comment')

const router = express.Router()

// Get all categories
router.get('/categories', (req, res, next) => {
	Category.find({}, (err, categories) => {
		if (err) {
			return next(err)
		} else {
			res.status(200).send(categories)
		}
	})
})

// Get all posts
router.get('/posts', (req, res, next) => {
	Post.find({}, (err, posts) => {
		if (err) {
			return next(err)
		} else {
			res.status(200).send(posts)
		}
	})
})

// Get posts for single category
router.get('/:category/posts', (req, res, next) => {	
	Post.find({ category: req.params.category }, (err, posts) => {
		if (err) {
			return next(err)
		} else {
			res.status(200).send(posts)
		}
	})
})

// Get single post
router.get('/posts/:_id', (req, res, next) => {	
	Post.findById(req.params._id, (err, post) => {
		if (err) {
			return next(err)
		} else {
			res.status(200).send(post)
		}
	})
})

// Get comments for single post
router.get('/posts/:_id/comments', (req, res, next) => {	
	Comment.find({parentId: req.params._id}, (err, comments) => {
		if (err) {
			return next(err)
		} else {
			res.status(200).send(comments)
		}
	})
})

// Get single comment
router.get('/comments/:_id', (req, res, next) => {	
	Comment.findById(req.params._id, (err, comment) => {
		if (err) {
			return next(err)
		} else {
			res.status(200).send(comment)
		}
	})
})

// Add post
router.post('/posts', (req, res, next) => {
	Post.create(req.body, (err, post) => {
		if (err) {
			return next(err)
		} else {
			res.status(200).send(post)
		}
	})
})

// Vote on a post
router.post('/posts/:_id', (req, res, next) => {
	let incAmount = 0
	if (req.body.option === "upVote") {
		incAmount = 1
	} else if (req.body.option === "downVote") {
		incAmount = -1
	}

	Post.findOneAndUpdate({ _id : req.params._id }, { $inc: { voteScore: incAmount }}, { new: true }, (err, post) => {
		if (err) {
			return next(err)
		} else {
			res.status(200).send(post)
		}
	})
})

// Add a comment
router.post('/comments', (req, res, next) => {
  Comment.create(req.body, (err, comment) => {
  	if (err) {
  		return next(err)
  	} else {
  		res.status(200).send(comment)
  	}
  })
})

// Vote on a comment
router.post('/comments/:_id', (req, res, next) => {
	let incAmount = 0
	if (req.body.option === "upVote") {
		incAmount = 1
	} else if (req.body.option === "downVote") {
		incAmount = -1
	}

	Comment.findOneAndUpdate({ _id : req.params._id }, { $inc: { voteScore: incAmount }}, { new: true }, (err, post) => {
		if (err) {
			return next(err)
		} else {
			res.status(200).send(post)
		}
	})
})

// Edit a post
router.put('/posts/:_id', (req, res, next) => {
	Post.findOneAndUpdate({ _id: req.params._id }, req.body, { new: true }, (err, result) => {
		if (err) {
			return next(err)
		} else {
			res.status(200).send(result)
		}
	})
})

// Edit a comment
router.put('/comments/:_id', (req, res, next) => {
	Comment.findOneAndUpdate({ _id: req.params._id }, req.body, {new: true}, (err, result) => {
		if (err) {
			return next(err)
		} else {
			res.status(200).send(result)
		}
	})
})

// Delete a post and its comments
router.delete('/posts/:_id', (req, res, next) => {
	Post.findOneAndRemove({ _id: req.params._id }, (err, post) => {
		if (err) {
			return next(err)
		} else {
			Comment.deleteMany({ parentId: req.params._id }, (err, commentResult) => {
				if (err) {
					return next(err)
				} else {
					res.status(200).send(JSON.stringify(post))
				}
			})
		}
	})
})

// Delete a comment
router.delete('/comments/:_id', (req, res, next) => {
	Comment.findOneAndRemove({ _id: req.params._id}, (err, comment) => {
		if (err) {
			return next(err)
		} else {
			res.status(200).send(JSON.stringify(comment))
		}
	})
})

module.exports = router;