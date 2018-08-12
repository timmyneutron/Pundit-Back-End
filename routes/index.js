const express = require('express')
const Category = require('../models/Category')
const Post = require('../models/Post')

const router = express.Router()

router.get('/categories', (req, res, next) => {
	Category.find()
	.exec((err, categories) => {
		if (err) {
			return next(err)
		} else {
			res.status(200).send(categories)
		}
	})
})

router.get('/:category/posts', (req, res, next) => {
	Post.find({ category: req.params.category })
	.exec((err, posts) => {
		if (err) {
			return next(err)
		} else {
			console.log(posts)
			res.status(200).send(posts)
		}
	})
})

router.get('/posts', (req, res) => {
	Post.find()
	.exec((err, posts) => {
		if (err) {
			return next(err)
		} else {
			res.status(200).send(posts)
		}
	})
})

router.post('/posts', (req, res) => {
	const { author, title, body, category } = req.body
	Post.create({ author, title, body, category })
	.then(result => res.status(200).send(result))
	.catch(err => next(err))
})

router.get('/posts/:id', (req, res) => {
	Post.findById(req.params.id)
	.exec((err, post) => {
		if (err) {
			return next(err)
		} else {
			res.status(200).send(post)
		}
	})
})

router.delete('/posts/:id', (req, res) => {
	res.status(200).send('delete post')
})

router.put('/posts/:id', (req, res) => {
	res.status(200).send('edit post')
})

router.get('/posts/:id/comments', (req, res) => {
	res.status(200).send('comments for a post')
})

router.get('/comments/:id', (req, res) => {
	res.status(200).send('single comment')
})

router.put('/comments/:id', (req, res) => {
	res.status(200).send('edit comment')
})

router.post('/comments', (req, res) => {
	res.status(200).send('new comment')
})

router.put('/comments/:id', (req, res) => {
	res.status(200).send('edit comment')
})

router.delete('/comments/:id', (req, res) => {
	res.status(200).send('delete comment')
})

module.exports = router;