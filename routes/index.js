const express = require('express')
const Category = require('../models/categories')
const Post = require('../models/posts')

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

router.post('/categories', (req, res, next) => {
	const { name, path } = req.body
	Category.create({ name, path })
	.exec((err, result) => {
		if (err) {
			return next(err)
		} else {
			res.status(200).send(result)
		}
	})
})

router.get('/:category/posts', (req, res, next) => {
	Post.find({ 'category.name': req.params.category })
	.exec((err, posts) => {
		if (err) {
			return next(err)
		} else {
			res.status(200).send(posts)
		}
	})
})

router.get('/posts', (req, res) => {
	res.status(200).send('posts')
})

router.post('/posts', (req, res) => {


	res.status(200).send('create post')
})

router.get('/posts/:id', (req, res) => {
	res.status(200).send('single post')
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