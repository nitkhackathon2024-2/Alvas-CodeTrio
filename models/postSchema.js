// models/post.js
const mongoose = require('mongoose');

// Define the Post schema
const postSchema = new mongoose.Schema({
    username: { type: String, required: false }, // Username of the post creator
    college: { type: String, required: false },  // College of the post creator
    question: { type: String, required: false }, // The question being asked
    upvotes: { type: Number, default: 0 },       // Count of upvotes
    downvotes: { type: Number, default: 0 },     // Count of downvotes
    commentsCount: { type: Number, default: 0 }, // Count of comments
    // createdAt: { type: Date, default: Date.now } // Timestamp of post creation
});

// Create a Post model based on the schema
const Post = mongoose.model('Post', postSchema);

// Export the Post model
module.exports = Post;
