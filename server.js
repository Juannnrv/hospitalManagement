const express = require('express');
const cors = require('cors');
const DatabaseDriver = require('./server/helpers/db');

const app = express();

app.use(express.json());

DatabaseDriver.getInstance();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});