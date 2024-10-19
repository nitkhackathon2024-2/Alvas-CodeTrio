// routes/postRoute.js
const express = require('express');
const router = express.Router();
const Post = require('../models/postSchema'); // Import the Post model

// POST route to create a new post
router.post('/p', async (req, res) => {
    console.log('post')
    try {
        const { username, college, question,upvotes=0,downvotes=0,commentsCount=0 } = req.body; // Destructure the request body

        // Create a new post
        const newPost = new Post({
            username,
            college,
            question,
            upvotes,downvotes,commentsCount
        });

        // Save the post to the database
        await newPost.save();
        res.status(201).json(newPost); // Respond with the created post
    } catch (error) {
        res.status(500).json({ message: 'Error creating post', error }); // Handle errors
    }
});

// GET route to retrieve all posts
router.get('/p', async (req, res) => {
    try {
        const posts = await Post.find(); // Fetch all posts from the database
        res.status(200).json(posts); // Respond with the list of posts
    } catch (error) {
        res.status(500).json({ message: 'Error fetching posts', error }); // Handle errors
    }
});

module.exports = router; // Export the router
