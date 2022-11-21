require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const coursesRouter = require('./routes/courses.route');

app.use(express.json());

app.get('/', (req, res) => {
    res.json({ 'message': 'Hello world from Server' });
});

app.use('/api/courses', coursesRouter);

app.listen(port, () => {
    console.log(`Server is listening at port ${port}`);
});