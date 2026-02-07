const db = require('./database');




app.post('/profile', (req, res) => {
    try {
        const { email, firstName, lastName, dietPref, allergies } = req.body;
        const data = db.read();
        
        if (!data) {
            return res.status(500).json({ error: 'Failed to read database' });
        }

        const userIndex = data.findIndex(user => user.email === email);
        
        if (userIndex !== -1) {
            
            data[userIndex] = {
                ...data[userIndex],
                firstName,
                lastName,
                dietPref,
                allergies
            };
        } else {
          
            data.push({
                email,
                firstName,
                lastName,
                dietPref,
                allergies
            });
        }
        
        if (db.write(data)) {
            res.status(200).json({ message: 'Profile updated successfully' });
        } else {
            res.status(500).json({ error: 'Failed to save profile' });
        }

    } catch (error) {

        res.status(500).json({ error: 'Error updating profile' });
    }
});




