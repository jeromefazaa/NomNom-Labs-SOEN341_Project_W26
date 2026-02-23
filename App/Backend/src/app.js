const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

const authRouter = require('./routers/auth/auth');
const profileRouter = require('./routers/profile/profile');
const recipesRouter = require('./routers/recipes/recipes');


app.use('/auth', authRouter);
app.use('/profile', profileRouter);
app.use('/recipes', recipesRouter);


app.get('/', (req, res) => {
    res.json({ message: 'NomNom Labs API Server is running' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

