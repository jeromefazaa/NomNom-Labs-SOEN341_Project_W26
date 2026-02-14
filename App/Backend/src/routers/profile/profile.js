const express = require('express');
const db = require('../../database');

const router = express.Router();


router.post('/', (req, res) => {
    try {
        const { email, firstName, lastName, dietPref, allergies } = req.body; //make other fields optional because might not want to switch name everytime.
        const id = email.toLowerCase();
        //userData: { [email: string]: { firstName, lastName, email, password, dietPref?, allergies? } } | null
        const userData = db.read('users');
        
        if (!userData) {
            return res.status(500).json({ error: 'Failed to read database' });
        }

        //check that user exists and has password (signed up properly)
        if (!userData[id] || !userData[id].password) {
            return res.status(401).json({ error: 'User not found. Please sign up first.' });
        }

        //update only profile fields, preserve password and email
        userData[id].firstName = firstName;
        userData[id].lastName = lastName;
        userData[id].dietPref = dietPref;
        userData[id].allergies = allergies;
        
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
        // userData: { [email: string]: { firstName, lastName, email, password, dietPref?, allergies? } } | null
        const userData = db.read('users');
        
        if (!userData) {
            return res.status(500).json({ error: 'Failed to read database' });
        }

        if (!userData[id]) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        res.status(200).json(userData[id]);

    } catch (error) {
        res.status(500).json({ error: 'Error retrieving profile' });
    }
});

module.exports = router;




