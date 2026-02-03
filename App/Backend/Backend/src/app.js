const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());

// Load data from data.json
const dataPath = path.join(__dirname, '../../../Data/data.json');
let userData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

const PORT = process.env.PORT || 3000;


app.post('/signup', (req, res) => {
     const { firstName, lastName, email, password } = req.body;
     const id = `${firstName.toLowerCase()}_${lastName.toLowerCase()}_${email.toLowerCase()}_${password.toLowerCase()}`;
     if (userData[id]) {
        //
         res.status(400).json({ message: 'User Already Exists' });
     } else {
         userData[id] = { firstName, lastName, email, password };
         fs.writeFileSync(dataPath, JSON.stringify(userData, null, 2));
         res.status(200).json({ message: 'User Registered Successfully' });
     }
     });

app.post('/login', (req, res) => {
    const { email, password } = req.body;

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
        


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

