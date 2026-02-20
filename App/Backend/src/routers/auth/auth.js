const router = require('express').Router();
const { json } = require('express');
const { read, write } = require('../../database');


router.post('/signup', (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    const id = email.toLowerCase();
    // userData: { [email: string]: { firstName, lastName, email, password } } | null
    const userData = read('users')
    if (userData[id]) {
        res.status(400)
    } else {
        userData[id] = { firstName, lastName, email, password };
        write('users', userData);
        res.status(200).json({ message: 'User Registered Successfully' });
    }
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    const userData = read('users');
    const user = Object.values(userData).find(

        u => u.email === email && u.password === password
    );
    if (!user) {
        return res.status(400)
    }
    res.status(200).send(JSON.stringify({
        user: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        }
    }));
});

module.exports = router;