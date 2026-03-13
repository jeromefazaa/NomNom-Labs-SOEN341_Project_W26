const router = require('express').Router();
const { json } = require('express');
const { read, write } = require('../../database');


router.post('/signup', (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    const normalizedEmail = email.toLowerCase();
    const userData = read('users');

    if (userData[normalizedEmail]) {
        return res.status(400).json({ message: "User already exists" });
    } else {
        userData[normalizedEmail] = { firstName, lastName, email: normalizedEmail, password };
        write('users', userData);
        return res.status(200).json({ message: 'User Registered Successfully' });
    }
});


router.post('/login', (req, res) => {
    const { email, password } = req.body;

    const normalizedEmail = email.toLowerCase();
    const userData = read('users');

    const user = userData[normalizedEmail];

    if (!user || user.password !== password) {
        return res.status(400).json({ message: "Invalid email or password" });
    }

    return res.status(200).json({ email: normalizedEmail });
});

module.exports = router;