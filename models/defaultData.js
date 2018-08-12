const mongoose = require('mongoose')
const Category = require('./Category')
const Post = require('./Post')
const Comment = require('./Comment')

function loadDefaultData() {
	Category.deleteMany({}, err => {
		if (err) {
			console.log(err.message)
		} else {
			const defaultCategories = [
		    {
		      name: 'all',
		      path: '/'
		    },
		    {
		      name: 'puns',
		      path: '/puns'
		    },
		    {
		      name: 'dad jokes',
		      path: '/dadjokes'
		    },
		    {
		      name: 'word play',
		      path: '/wordplay'
		    }
			]

			Category.insertMany(defaultCategories, err => {
				if (err) {
					console.log(err.message)
				} else {
					console.log('\t...Default category data loaded.')
				}
			})
		}
	})
 
	Post.deleteMany({}, err => {
		if (err) {
			console.log(err.message)
		} else {
			const defaultPosts = [
				{
					timestamp: new Date('April 25, 2018 01:52:12'),
    			title: 'Did you hear about the cross-eyed teacher?',
    			body: 'She had trouble controlling her pupils.',
    			author: 'timmyneutron',
    			category: 'puns',
    			voteScore: 30,
    			commentCount: 2
				},
				{
			    timestamp: new Date('April 25, 2018 14:20:09'),
			    title: "Why couldn't the bike stand up?",
			    body: 'Because it was two-tired.',
			    author: 'dawniedarko',
			    category: 'puns',
			    voteScore: 25,
			    commentCount: 2
				},
				{
			    timestamp: new Date('March 12, 2018 20:31:48'),
			    title: "Did you hear there's a restaurant on the moon?",
			    body: "The food is good, but there's not much atmosphere.",
			    author: 'timmyneutron',
			    category: 'dad jokes',
			    voteScore: 21,
			    commentCount: 1
				},
				{
			    timestamp: new Date('March 9, 2018 12:11:45'),
			    title: "'I live by the church' 'Art thou a churchman?'",
			    body: "No such matter, sir. I do live by the church; for I do live at my house, and my house doth stand by the church.",
			    author: 'willyshakes',
			    category: 'word play',
			    voteScore: 13,
			    commentCount: 1
				},
				{
			    timestamp: new Date('February 13, 2018 23:44:34'),
			    title: "What did the fish say when it swam into a concrete wall?",
			    body: "Dam!",
			    author: 'dawniedarko',
			    category: 'puns',
			    voteScore: 21,
			    commentCount: 2
				},
				{
			    timestamp: new Date('January 29, 2018 13:42:23'),
			    title: "'Whose grave’s this, sirrah?' 'Mine, sir.'",
			    body: "'I think it be thine, indeed, for thou liest in it.' - 'You lie out on it, sir, and therefore it is not yours. For my part, I do not lie in it, and yet it is mine.'",
			    author: 'willyshakes',
			    category: 'word play',
			    voteScore: 28,
			    commentCount: 2
				},
				{
			    timestamp: new Date('January 18, 2018 15:05:40'),
			    title: "What do you call a deer with no eyes?",
			    body: "No idear!",
			    author: 'strawberryshortcake',
			    category: 'puns',
			    voteScore: 40,
			    commentCount: 2
				},
				{
			    timestamp: new Date('April 10, 2018 16:34:21'),
			    title: "I watched a car crush a Coke can today.",
			    body: "I shouldn't be sad about it, but it was just soda pressing...",
			    author: 'timmyneutron',
			    category: 'dad jokes',
			    voteScore: 32,
			    commentCount: 1
				}
			]

			Post.insertMany(defaultPosts, (err, posts) => {
				if (err) {
					console.log(err.message)
				} else {
					console.log('\t...Default post data loaded.')

					Comment.deleteMany({}, err => {
						if (err) {
							console.log(err.message)
						} else {
							const defaultComments = [
								{
							    parentId: posts[0]._id,
							    timestamp: new Date('April 25, 2018 14:59:13'),
							    body: 'Groan!',
							    author: 'dawniedarko',
							    voteScore: 6
							  },
							  {
							  	parentId: posts[0]._id,
							    timestamp: new Date('April 25 2018, 18:33:11'),
							    body: 'So bad! And so good!',
							    author: 'willyshakes',
							    voteScore: 2
							  },
							  {
							  	parentId: posts[1]._id,
							  	timestamp: new Date('April 25, 2018 15:06:30'),
							    body: '~Polite golf clap~',
							    author: 'timmyneutron',
							    voteScore: 3
							  },
							  {
							  	parentId: posts[1]._id,
							    timestamp: new Date('April 25, 2018 15:06:30'),
							    body: 'You know what? I like it. Have an upvote.',
							    author: 'strawberryshortcake',
							    voteScore: 5
							  },
							  {
							    parentId: posts[2]._id,
							    timestamp: new Date('March 13, 2018 21:01:04'),
							    body: 'Dad, I love you but please get off of the internet.',
							    author: 'strawberryshortcake',
							    voteScore: 10
							  },
							  {
							    parentId: posts[3]._id,
							    timestamp: new Date('March 9, 2018 19:45:43'),
							    body: "Quality :-)",
							    author: 'timmyneutron',
							    voteScore: 8
							  },
							  {
							  	parentId: posts[4]._id,
							    timestamp: new Date('February 13, 2018 20:45:22'),
							    body: "Brevity is the soul of wit. UpVote.",
							    author: 'willyshakes',
							    voteScore: 11
							  },
							  {
							    parentId: posts[4]._id,
							    timestamp: new Date('February 13, 2018 23:29:56'),
							    body: "I approve.",
							    author: 'timmyneutron',
							    voteScore: 7
							  },
							  {
							    parentId: posts[5]._id,
							    timestamp: new Date('January 30, 2018 12:08:31'),
							    body: 'Classic Willy :-)',
							    author: 'timmyneutron',
							    voteScore: 9
							  },
							  {
							  	parentId: posts[5]._id,
							    timestamp: new Date('January 31, 2018 09:00:11'),
							    body: 'Omg I LOVE Hamlet!',
							    author: 'strawberryshortcake',
							    voteScore: 5
							  },
							  {
							    parentId: posts[6]._id,
							    timestamp: new Date('January 30, 2018 12:07:31'),
							    body: "Your first pun! I'm so proud! <3",
							    author: 'timmyneutron',
							    voteScore: 10
							  },
							  {
							    parentId: posts[6]._id,
							    timestamp: new Date('January 18, 2018 16:32:21'),
							    body: "Daaaaaaaad! :-P",
							    author: 'strawberryshortcake',
							    voteScore: 8
		  					},
		  					{
							  	parentId: posts[7]._id,
							    timestamp: new Date('April 11, 2018 15:32:22'),
							    body: "Omg whyyyyyyyy",
							    author: 'dawniedarko',
							    voteScore: 8
		  					}
							]

							Comment.insertMany(defaultComments, err => {
								if (err) {
									console.log(err.message)
								} else {
									console.log('\t...Default comment data loaded.')
								}
							})
						}
					})
				}
			})
		}
	})
}

module.exports = loadDefaultData