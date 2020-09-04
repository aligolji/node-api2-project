const express = require('express');
const Database = require('../data/db');

const router = express.Router();

// WORKING
router.post('/', (req, res) => {
    const { title, contents } = req.body;
    const newPost = { title, contents };

    Database.insert(newPost)
    if (!title || !contents) {
        res.status(400).json({ errorMessage: 'Please provide title and contents for the post.' });
    } else if (title && contents) {
        res.status(201).json(newPost);
    } else if (Error) {
        res.status(500).json({ error: 'There was an error while saving the post to the database.' });
    }
});

// error 400 returned - provide text for comment
router.post('/:id/comments', (req, res) => {
    const id = req.params.id;
    const { text } = req.body;
    const newComment = { text };

    Database.findById(Number(id))
        .then(post => {
            if (newComment) {
                Database.insertComment(newComment);
                res.status(201).json(newComment);
            } else if (!newComment.length) {
                res.status(400).json({ errorMessage: 'Please provide text for the comment.' });
            } else if (comment.id !== Number(id)) {
                res.status(404).json({ message: 'The post with the specified ID does not exist.' });
            }
        })
        .catch(error => {
            res.status(500).json({ error: 'There was an error while saving the comment to the database.' });
        });
});

// WORKING
router.get('/', (req, res) => {
    Database.find()
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: 'The posts information could not be retrieved.' });
        })
});

// WORKING
router.get('/:id', (req, res) => {
    Database.findById(Number(req.params.id))
        .then(post => {
            if (post.length) {
                res.status(200).json(post);
            } else {
                res.status(404).json({ message: 'The post with the specified ID does not exist.' });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: 'The post information could not be retrieved.' });
        })
});

// WORKING 
router.get('/:id/comments', (req, res) => {
    Database.findPostComments(Number(req.params.id))
        .then(posts => {
            if (posts) {
                res.status(200).json(posts);
            } else {
                res.status(404).json({ message: 'The post with the specified ID does not exist.' });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: 'The comments information could not be retrieved.' })
        })
});

// WORKING
router.delete('/:id', (req, res) => {
    const id = req.params.id

    Database.remove(id)
        .then(count => {
            if (count > 0) {
                res.status(200).json({ message: `Post with ID ${id} successfully deleted.` });
            } else {
                res.status(404).json({ message: 'The post with the specified ID does not exist.' });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: 'The post could not be removed.' });
        });
});

// WORKING - updates the post - returns '1'
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const { title, contents } = req.body;
    const updates = { title, contents };

    Database.update(id, updates)
        .then(post => {
            if (title.length && contents.length) {
                res.status(200).json(post)
            } else if (!post.length) {
                res.status(404).json({ message: 'The post with the specified ID does not exist.' });
            } else if
                (!title || !contents) {
                res.status(400).json({ errorMessage: 'Please provide title and contents for the post.' })
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: 'The post information could not be modified.' });
        })
});


module.exports = router;
