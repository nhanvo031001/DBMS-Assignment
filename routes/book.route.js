const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book.controller');
const {filterDataAPIEntries, filterDataAPIBeers, testFunction} = require("../controllers/book.controller");


router.get('/', bookController.findAll);
router.get('/customer', bookController.findAllCustomer);
router.get('/orders', bookController.findAllOrders);


router.get('/mysql/:field', bookController.findByFieldMySql);
router.get('/neo4j/:field', bookController.findByFieldNeo4j);
router.get('/filterDataBeers', filterDataAPIBeers);
router.get('/filterDataEntries', filterDataAPIEntries);
router.get('/test', testFunction)

router.post('/mysql', bookController.createDummyForMySql);
router.post('/mysqlManually', bookController.createDummyForMySqlManually);
router.post('/neo4j', bookController.createDummyForNeo4j);
router.post('/neo4jManually', bookController.createDummyForNeo4jManually);

router.post('/mysqlCustomerManually', bookController.createDummyCustomerForMySqlManually);
router.post('/neo4jCustomerManually', bookController.createDummyCustomerForNeo4jManually);

router.post('/mysqlOrdersManually', bookController.createDummyOrdersForMySqlManually);
router.post('/neo4jOrdersManually', bookController.createDummyOrdersForNeo4jManually);


router.post('/mysqlAuthorManually', bookController.createDummyAuthorForMySqlManually);
router.post('/neo4jAuthorManually', bookController.createDummyAuthorForNeo4jManually);



router.post('/mysqlBelongsBookAuthorManually', bookController.createDummyBelongsBookAuthorForMySqlManually);
router.post('/neo4jBelongsBookAuthorManually', bookController.createDummyBelongsBookAuthorForNeo4jManually);



router.post('/mysqlContainsOrderBookManually', bookController.createDummyContainsOrderBookForMySqlManually);
router.post('/neo4jContainsOrderBookManually', bookController.createDummyContainsOrderBookForNeo4jManually);


router.post('/genAllMySqlManually', bookController.createDummyAllForMySqlManually)
router.post('/genAllNeo4jManually', bookController.createDummyAllForNeo4jManually)


module.exports = router