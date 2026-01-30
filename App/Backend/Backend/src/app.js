const express = require('express');
const { setRoutes } = require('./routes/index');
const middleware = require('./middleware/index');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(express.json());
app.use(middleware);

// Routes setup
setRoutes(app);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});