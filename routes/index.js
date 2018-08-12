const express = require('express')
const { validationResult } = require('express-validator/check')
const Category = require('../models/Category')
const Post = require('../models/Post')
const Comment = require('../models/Comment')

const router = express.Router()

router.get('/categories', (req, res, next) => {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  
	console.log("\n\t...Request received: GET /categories")
	Category.find({}, (err, categories) => {
		if (err) {
			return next(err)
		} else {
			res.status(200).send(categories)
		}
	})
})

router.get('/:category/posts', (req, res, next) => {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  
	const { category }  = req.params
	console.log(`\n\t...Request received: GET /${category}/posts`)
	Post.find({ category }, (err, posts) => {
		if (err) {
			return next(err)
		} else {
			res.status(200).send(posts)
		}
	})
})

router.get('/posts', (req, res) => {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  
	console.log("\n\t...Request received: GET /posts")
	Post.find({}, (err, posts) => {
		if (err) {
			return next(err)
		} else {
			res.status(200).send(posts)
		}
	})
})

router.post('/posts', (req, res) => {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

	Post.create(req.body, (err, post) => {
		if (err) {
			return next(err)
		} else {
			res.status(200).send(post)
		}
	})
})

router.get('/posts/:id', (req, res) => {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  
	Post.findById(req.params.id, (err, post) => {
		if (err) {
			return next(err)
		} else {
			res.status(200).send(post)
		}
	})
})

router.delete('/posts/:id', (req, res) => {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  
	Post.deleteOne({ _id: req.params.id }, (err, postResult) => {
		if (err) {
			return next(err)
		} else {
			Comment.deleteMany({ parentId: req.params.id }, (err, commentResult) => {
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

router.put('/posts/:id', (req, res) => {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

	Post.findOneAndUpdate({ _id: req.params.id }, req.body, {new: true}, (err, result) => {
		if (err) {
			return next(err)
		} else {
			res.status(200).send(result)
		}
	})
})

router.get('/posts/:id/comments', (req, res) => {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  
	Comment.find({parentId: req.params.id}, (err, comments) => {
		if (err) {
			return next(err)
		} else {
			res.status(200).send(comments)
		}
	})
})

router.get('/comments/:id', (req, res) => {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  
	Comment.findById(req.params.id, (err, comment) => {
		if (err) {
			return next(err)
		} else {
			res.status(200).send(comment)
		}
	})
})

router.put('/comments/:id', (req, res) => {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

	Comment.findOneAndUpdate({ _id: req.params.id }, req.body, {new: true}, (err, result) => {
		if (err) {
			return next(err)
		} else {
			res.status(200).send(result)
		}
	})
})

router.post('/comments', (req, res) => {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  Comment.create(req.body, (err, comment) => {
  	if (err) {
  		return next(err)
  	} else {
  		res.status(200).send(comment)
  	}
  })
})

router.delete('/comments/:id', (req, res) => {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

	Comment.deleteOne({ _id: req.params.id }, (err, result) => {
		if (err) {
			return next(err)
		} else {
			res.status(200).send(result)
		}
	})
})

module.exports = router;