const express = require('express');
const router = express.Router();
const coursesController = require('../controllers/courses.controller');

router.get('/', coursesController.findAll);
router.get('/:id', coursesController.findById);
router.get('/public/apis', coursesController.getDummyFromPublicAPIs);
router.get('/connect/neo4j', coursesController.testConnectNeo4j)
router.post('/', coursesController.createCourse);
router.post('/dummy', coursesController.createDummyCourses);
router.post('/dummyNeo4j', coursesController.createDummyCoursesNeo4j);

module.exports = router;