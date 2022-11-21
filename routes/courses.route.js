const express = require('express');
const router = express.Router();
const coursesController = require('../controllers/courses.controller');

router.get('/', coursesController.findAll);
router.get('/:id', coursesController.findById);
router.post('/', coursesController.createCourse);
router.post('/dummy', coursesController.createDummyCourses);
router.post('/dummyNeo4j', coursesController.createDummyCoursesNeo4j);

module.exports = router;