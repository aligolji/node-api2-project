const express = require('express');
const Database = require('../data/db');

const router = express.Router();

// WORKS
router.post('/', (req, res) => {
    const { title, contents } = req.body;
    const newPost = { title, contents };

    if (!title || !contents) {
        res.status(400).json({ errorMessage: 'Please provide title and contents for the post.' });
    } else if (title && contents) {
        // Database.insert(newPost)  // saves to database without this - odd?
        res.status(201).json(newPost);
    } else if (Error) {
        res.status(500).json({ error: 'There was an error while saving the post to the database.' });
    }
});


// DOESN'T WORK
router.post('/:id/comments', (req, res) => {
    const { id } = req.params;
    const comment = req.body;
    // const newText = newComment.text;

    Database.insertComment(comment)

        .then(comment => {
            if (comment.id == Number(id)) {
                // Database.insertComment(newComment)
                res.status(201).json(comment)
            } else if (!comment) {
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


// WORKING - but returns empty array when id does not exist
router.get('/:id', (req, res) => {
    Database.findById(Number(req.params.id))
        .then(post => {
            if (post) {
                res.status(200).json(post);
            } else { //returns empty array with status 200
                res.status(404).json({ message: 'The post with the specified ID does not exist.' });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: 'The post information could not be retrieved.' });
        })
});


// WORKING - but returns all posts with matching 'post_id'
router.get('/:id/comments', (req, res) => {
    Database.findPostComments(Number(req.params.id))
        .then(posts => {
            if (posts) {
                res.status(200).json(posts);    //returns with matching post_id's
            } else {
                res.status(404).json({ message: 'The post with the specified ID does not exist.' });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: 'The comments information could not be retrieved.' })
        })
});


router.delete('/:id', (req, res) => {
    res.status(200).json({ hello: 'posts' })
});



router.put('/:id', (req, res) => {
    res.status(200).json({ hello: 'posts' })
});


module.exports = router;