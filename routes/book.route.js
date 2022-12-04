const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book.controller');

router.get('/', bookController.findAll);
router.get('/mysql/:field', bookController.findByFieldMySql);
router.get('/neo4j/:field', bookController.findByFieldNeo4j);

router.post('/mysql', bookController.createDummyForMySql);
router.post('/neo4j', bookController.createDummyForNeo4j);

module.exports = router