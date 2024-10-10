const express = require('express');
const cors = require('cors');
const DatabaseDriver = require('./server/helpers/db');
const  doctorRoutes  = require('./server/routes/doctorRoutes');
const patientRoutes = require('./server/routes/patientRoutes');
const hospitalRoutes = require('./server/routes/hospitalRoutes');
const noticeRoutes = require('./server/routes/noticeRoutes');

const app = express();

app.use(express.json());

DatabaseDriver.getInstance();

app.use('/doctors', doctorRoutes);
app.use('/patients', patientRoutes);
app.use('/hospitals', hospitalRoutes)
app.use('/notices', noticeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});