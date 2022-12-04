const express = require('express');
const router = express.Router();
const coursesController = require('../controllers/courses.controller');

router.get('/', coursesController.findAll);
router.get('/:id', coursesController.findById);
router.get('/public/apis', coursesController.getDummyFromPublicAPIs);
router.get('/connect/neo4j', coursesController.testConnectNeo4j)
router.get('/index/neo4j', coursesController.indexTestNeo4j)
router.get('/index/mysql', coursesController.indexTestMySql)


router.post('/', coursesController.createCourse);
router.post('/dummy', coursesController.createDummyCourses);
router.post('/dummyNeo4j', coursesController.createDummyCoursesNeo4j);
router.post('/public/apis', coursesController.createDummyFromPublicAPIs);
router.post('/public/apisMySql', coursesController.createDummyFromPublicAPIsMySql);


module.exports = router