const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
//const Post = require('../models/Post'); // Import the Post model
const router = express.Router();

router.get('/hi', (req, res) => {
    res.send('hii');
});

// Register a new user
router.post('/register', async (req, res) => {
    console.log('hi');
    try {
        const {
            fullName,
            email,
            dob,
            location,
            academicLevel,
            major,
            learningPreferences,
            learningGoals,
            collaborationStyle,
            availability,
            profilePicture,
            bio,
            languagesSpoken,
            skills
        } = req.body;

        const newUser = new User({
            fullName,
            email,
            dob,
            location,
            academicLevel,
            major,
            learningPreferences,
            learningGoals,
            collaborationStyle,
            availability,
            profilePicture,
            bio,
            languagesSpoken,
            skills
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error while saving user:', error);  // Log the error
        res.status(400).json({ error: error.message });
    }
});

router.post('/match-users', async (req, res) => {
    try {
        // Extract user data from the request body
        const {
            fullName, email, dob, location, academicLevel, major,
            learningPreferences, learningGoals, collaborationStyle,
            availability, profilePicture, bio, languagesSpoken, skills
        } = req.body; // Using req.body to get the user data

        // Fetch all users from the database
        const allUsers = await User.find();

        // Create an array to store users and their match points
        const usersWithMatchPoints = allUsers.map(user => {
            let matchPoints = 0;

            // Compare each field and increase match points if they match
            if (user.fullName === fullName) matchPoints++;
            if (user.email === email) matchPoints++;
            if (user.dob === dob) matchPoints++;
            if (user.location === location) matchPoints++;
            if (user.academicLevel === academicLevel) matchPoints++;
            if (user.major === major) matchPoints++;
            if (user.learningPreferences === learningPreferences) matchPoints++;
            if (user.learningGoals === learningGoals) matchPoints++;
            if (user.collaborationStyle === collaborationStyle) matchPoints++;
            if (user.availability === availability) matchPoints++;
            if (user.profilePicture === profilePicture) matchPoints++;
            if (user.bio === bio) matchPoints++;
            if (JSON.stringify(user.languagesSpoken) === JSON.stringify(languagesSpoken)) matchPoints++;
            if (JSON.stringify(user.skills) === JSON.stringify(skills)) matchPoints++;

            return { user, matchPoints };
        });

        // Sort users by match points in descending order
        usersWithMatchPoints.sort((a, b) => b.matchPoints - a.matchPoints);

        // Get the top 10 users with highest match points
        const topUsers = usersWithMatchPoints.slice(0, 10).map(item => item.user);

        res.status(200).json(topUsers);
    } catch (error) {
        console.error('Error while fetching users:', error);
        res.status(400).json({ error: error.message });
    }
});







module.exports = router;
