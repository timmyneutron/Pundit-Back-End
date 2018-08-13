const express = require('express')
const { validationResult } = require('express-validator/check')
const Category = require('../models/Category')
const Post = require('../models/Post')
const Comment = require('../models/Comment')

const router = express.Router()

// Get all categories
router.get('/categories', (req, res, next) => {
	console.log("\n...Request received: GET /categories")
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
	console.log("\n...Request received: GET /posts")
	Post.find({}, (err, posts) => {
		if (err) {
			return next(err)
		} else {
			console.log(posts)
			res.status(200).send(posts)
		}
	})
})

// Get posts for single category
router.get('/:category/posts', (req, res, next) => {
	const { category }  = req.params
	console.log(`\n...Request received: GET /${category}`)
	Post.find({ category }, (err, posts) => {
		if (err) {
			return next(err)
		} else {
			res.status(200).send(posts)
		}
	})
})

// Get single post
router.get('/posts/:_id', (req, res, next) => {
	console.log(`\n...Request received: GET /posts/${req.params._id}`)
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
	console.log(`\n...Request received: GET /posts/${req.params._id}/comments`)
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
	console.log(`\n...Request received: GET /comments/${req.params._id}`)
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
	console.log("\n...Request received: POST /posts")
	console.log(req.body)
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
	console.log(`\n...Request received: POST /posts/${req.params._id}`)
	console.log(req.body)

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
	console.log(`\n...Request received: POST /comments/`)
  console.log(req.body)
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
	console.log(`\n...Request received: POST /comments/${req.params._id}`)
	console.log(req.body)

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
	console.log(`\n...Request received: PUT /posts/${req.params._id}`)
	console.log(req.body)
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
	console.log(`\n...Request received: PUT /comments/${req.params._id}`)
  console.log(req.body)
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
	console.log(`\n...Request received: DELETE /posts/${req.params._id}`)
	Post.deleteOne({ _id: req.params._id }, (err, postResult) => {
		if (err) {
			return next(err)
		} else {
			Comment.deleteMany({ parentId: req.params._id }, (err, commentResult) => {
				if (err) {
					return next(err)
				} else {
					const combinedResult = { postResult, commentResult }
					res.status(200).send(combinedResult)
				}
			})
		}
	})
})

// Delete a comment
router.delete('/comments/:_id', (req, res, next) => {
	console.log(`\n...Request received: DELETE /comments/${req.params._id}`)
	Comment.deleteOne({ _id: req.params._id }, (err, result) => {
		if (err) {
			return next(err)
		} else {
			res.status(200).send({ _id: result._id, ok: result.ok })
		}
	})
})

module.exports = router;