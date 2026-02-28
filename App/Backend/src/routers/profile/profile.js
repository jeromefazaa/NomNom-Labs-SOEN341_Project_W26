const express = require('express');
const db = require('../../database');

const router = express.Router();

//edit an already existing profile
router.post('/', (req, res) => {
    try {
        const { email, firstName, lastName, dietPref, allergies } = req.body;
        const id = email.toLowerCase();
        const userData = db.read('users');
        if (!userData) {
            return res.status(500).json({ error: 'Failed to read database' });
        }

        //check that user exists
        if (!userData[id]) {
            return res.status(400).json({ error: 'User not found. Please sign up first.' });
        }
        //update only profile fields, preserve password and email
        if (userData[id].firstName != firstName) {
            userData[id].firstName = firstName;
        }
        if (userData[id].lastName != lastName) {
            userData[id].lastName = lastName;
        }
        if (userData[id].dietPref != dietPref) {
            userData[id].dietPref = dietPref;
        }
        if (userData[id].allergies != allergies) {
            userData[id].allergies = allergies;
        }
        if (db.write('users', userData)) {
            res.status(200).json({ message: 'Profile updated successfully' });
        } else {
            res.status(500).json({ error: 'Failed to save profile' });
        }

    } catch (error) {
        res.status(500).json({ error: 'Error updating profile' });
    }
});

// GET profile by email
router.get('/:email', (req, res) => {
    try {
        const id = req.params.email.toLowerCase();
        const userData = db.read('users');
        const recipes  = db.read('recipes');
        const userRecipes = Object.values(recipes).filter(recipes => recipes.userId === id);
        if (!userData) {
            return res.status(500).json({ error: 'Failed to read database' });
        }

        if (!userData[id]) {
            return res.status(404).json({ error: 'User not found' });
        }
        console.log(``)
        res.status(200).json({user: userData[id], userRecipes: userRecipes? userRecipes: []});

    } catch (error) {
        res.status(500).json({ error: 'Error retrieving profile' });
    }
});

module.exports = router;




