const express = require('express');
const { Database } = require('sqlite3');
const { request } = require('express');
const db = require('../data/db');

const router = express.Router();

router.post('/', (req, res) => {
    const { title, contents } = req.body;
    const newPost = { title, contents };

    if (!title || !contents) {
        res.status(400).json({ errorMessage: 'Please provide title and contents for the post.' });

    } else if (title && contents) {
        db.insert(newPost)
        res.status(201).json(newPost);

    } else if (error) {
        res.status(500).json({ error: 'There was an error while saving the post to the database.' });
    }
});

router.post('/:id/comments', (req, res) => {
    const { id } = req.params;
    const { text } = req.body;
    const newComment = { text };
    const findPostByID = db.findById = id => {
        return post_id == id;
    };    

    if (!findPostByID) {
        res.status(404).json({ message: 'The post with the specified ID does not exist.' });

    } else if (!text) {
        res.status(400).json({ errorMessage: 'Please provide text for the comment.' });

    } else if (text) {
        db.insertComment(newComment)
        res.status(201).json(newComment);

    } else if (error) {
        res.status(500).json({ error: 'There was an error while saving the comment to the database.' });
    }
});



router.get('/', (req, res) => {
    res.status(200).json({ hello: 'posts' })
});



router.get('/:id', (req, res) => {
    res.status(200).json({ hello: 'posts' })
});



router.get('/:id/comments', (req, res) => {
    res.status(200).json({ hello: 'posts' })
});



router.delete('/:id', (req, res) => {
    res.status(200).json({ hello: 'posts' })
});



router.put('/:id', (req, res) => {
    res.status(200).json({ hello: 'posts' })
});


module.exports = router;