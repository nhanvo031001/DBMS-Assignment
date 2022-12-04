require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const coursesRouter = require('./routes/courses.route');
const booksRouter = require('./routes/book.route');

app.use(express.json());
app.use(cors())

app.get('/', (req, res) => {
    res.json({ 'message': 'Hello world from Server' });
});

app.use('/api/courses', coursesRouter);
app.use('/book', booksRouter);

app.listen(port, () => {
    console.log(`Server is listening at port ${port}`);
});