const router = require('express').Router();
const { read, write } = require('../../database');


router.post('/signup', (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    const id = email.toLowerCase();
    // userData: { [email: string]: { firstName, lastName, email, password } } | null
    console.log("firstName:", firstName, "lastName:", lastName, "email:", email, "password:", password);
    console.log("before read")
    const userData = read('users')
    console.log("after read")

    if (userData[id]) {
        res.status(400).json({ message: 'User Already Exists' });
    } else {
        userData[id] = { firstName, lastName, email, password };
        write('users', userData);
        res.status(200).json({ message: 'User Registered Successfully' });
    }
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    // userData: { [email: string]: { firstName, lastName, email, password } } | null
    const userData = read('users');
    const user = Object.values(userData).find(

        u => u.email === email && u.password === password
    );

    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });

    }

    res.status(200).json({
        message: 'Login Successful',
        user: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        }
    });
});

module.exports = router;