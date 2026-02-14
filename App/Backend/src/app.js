const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

const authRouter = require('./routers/auth/auth');
const profileRouter = require('./routers/profile/profile');

app.use('/auth', authRouter);
app.use('/profile', profileRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

