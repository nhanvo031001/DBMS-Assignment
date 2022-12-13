const bookService = require('../services/book.service');
const APIResponse = require('../models/APIResponse');
// const {createDummyBookMySql, createDummyBookNeo4j, filterDataFromBeersAPI, filterDataFromEntriesAPI,
//     createDummyBookMySqlGenScriptManually, createDummyBookNeo4jGenScriptManually, convertDataMySQLToJSON
// } = require("../utils/helper");

const {createDummyBookMySql, createDummyBookNeo4j, filterDataFromBeersAPI, filterDataFromEntriesAPI,
    convertDataMySQLToJSON
} = require("../utils/helper");
const {createDummyBookMySqlGenScriptManuallyOfficial, createDummyBookNeo4jGenScriptManuallyOfficial} = require("../utils/genDummyBook");
const {createDummyCustomerMySqlGenScriptManuallyOfficial, createDummyCustomerNeo4jGenScriptManuallyOfficial} = require("../utils/genDummyCustomer");
const {createDummyOrderMySqlGenScriptManuallyOfficial} = require("../utils/genDummyOrders");
const {createDummyAuthorMySqlGenScriptManuallyOfficial} = require("../utils/genDummyAuthor");
const {createDummyBelongsBookAuthorMySqlGenScriptManuallyOfficial} = require("../utils/genDummyBelongsBookAuthor");
const {createDummyContainsOrderBookMySqlGenScriptManuallyOfficial} = require("../utils/genDummyContainsOrderBook");


async function findAll(req, res, next) {
    try {
        const result = await bookService.findAll();
        res.send(new APIResponse("200", "OK", result));
    } catch (err) {
        console.error(`Error get courses: `, err.message);
        res.send(new APIResponse("404", "Not Found", null));
    }
}


async function findAllCustomer(req, res, next) {
    try {
        const result = await bookService.findAllCustomer();
        res.send(new APIResponse("200", "OK", result));
    } catch (err) {
        console.error(`Error get courses: `, err.message);
        res.send(new APIResponse("404", "Not Found", null));
    }
}

async function findAllOrders(req, res, next) {
    try {
        const result = await bookService.findAllOrders();
        res.send(new APIResponse("200", "OK", result));
    } catch (err) {
        console.error(`Error get courses: `, err.message);
        res.send(new APIResponse("404", "Not Found", null));
    }
}


async function findByFieldMySql(req, res, next) {
    try {
        let field = req.params.field;
        let text = req.body.text ? req.body.text : req.query.text;
        const {rows, timeExec} = await bookService.findByFieldMySql(field, text);
        res.send(new APIResponse("200", "OK", rows, timeExec));
    } catch (err) {
        console.error(`Error get courses: `, err.message);
        res.send(new APIResponse("404", "Not Found", null));
    }
}


async function findByFieldNeo4j(req, res, next) {
    try {
        let field = req.params.field;
        let text = req.body.text ? req.body.text : req.query.text;
        const {resList, timeExec} = await bookService.findByFieldNeo4j(field, text);
        res.send(new APIResponse("200", "OK", resList, timeExec));
    } catch (err) {
        console.error(`Error get courses: `, err.message);
        res.send(new APIResponse("404", "Not Found", null));
    }
}


async function createDummyForMySql(req, res, next) {
    try {
        await createDummyBookMySql();
        res.send(new APIResponse("200", "OK", "Create for Mysql successfully !"));
    } catch (err) {
        console.error(`Error get courses: `, err.message);
        res.send(new APIResponse("404", "Not Found", null));
    }
}


async function createDummyForMySqlManually(req, res, next) {
    try {
        // await createDummyBookMySqlGenScriptManually();
        await createDummyBookMySqlGenScriptManuallyOfficial();
        res.send(new APIResponse("200", "OK", "Create for Mysql manually successfully !"));
    } catch (err) {
        console.error(`Error get courses: `, err.message);
        res.send(new APIResponse("404", "Not Found", null));
    }
}


async function createDummyForNeo4j(req, res, next) {
    try {
        await createDummyBookNeo4j();
        res.send(new APIResponse("200", "OK", "Create for Neo4j successfully !"));
    } catch (err) {
        console.error(`Error get courses: `, err.message);
        res.send(new APIResponse("404", "Not Found", null));
    }
}


async function createDummyForNeo4jManually(req, res, next) {
    try {
        // await createDummyBookNeo4jGenScriptManually();
        await createDummyBookNeo4jGenScriptManuallyOfficial();
        res.send(new APIResponse("200", "OK", "Create for Neo4j manually successfully !"));
    } catch (err) {
        console.error(`Error get courses: `, err.message);
        res.send(new APIResponse("404", "Not Found", null));
    }
}


async function filterDataAPIBeers(req, res, next) {
    try {
        await filterDataFromBeersAPI();
        res.send(new APIResponse("200", "OK", "Create for Neo4j successfully !"));
    } catch (err) {
        console.error(`Error get courses: `, err.message);
        res.send(new APIResponse("404", "Not Found", null));
    }
}


async function filterDataAPIEntries(req, res, next) {
    try {
        await filterDataFromEntriesAPI();
        res.send(new APIResponse("200", "OK", "Create for Neo4j successfully !"));
    } catch (err) {
        console.error(`Error get courses: `, err.message);
        res.send(new APIResponse("404", "Not Found", null));
    }
}



async function createDummyCustomerForMySqlManually(req, res, next) {
    try {
        // await createDummyBookMySqlGenScriptManually();
        await createDummyCustomerMySqlGenScriptManuallyOfficial();
        res.send(new APIResponse("200", "OK", "Create for Mysql manually successfully customer!"));
    } catch (err) {
        console.error(`Error get courses: `, err.message);
        res.send(new APIResponse("404", "Not Found", null));
    }
}

async function createDummyCustomerForNeo4jManually(req, res, next) {
    try {
        // await createDummyBookMySqlGenScriptManually();
        await createDummyCustomerNeo4jGenScriptManuallyOfficial();
        res.send(new APIResponse("200", "OK", "Create for Neo4j manually successfully customer!"));
    } catch (err) {
        console.error(`Error get courses: `, err.message);
        res.send(new APIResponse("404", "Not Found", null));
    }
}




async function createDummyOrdersForMySqlManually(req, res, next) {
    try {
        // await createDummyBookMySqlGenScriptManually();
        await createDummyOrderMySqlGenScriptManuallyOfficial();
        res.send(new APIResponse("200", "OK", "Create for Mysql manually successfully customer!"));
    } catch (err) {
        console.error(`Error get courses: `, err.message);
        res.send(new APIResponse("404", "Not Found", null));
    }
}



async function createDummyAuthorForMySqlManually(req, res, next) {
    try {
        // await createDummyBookMySqlGenScriptManually();
        await createDummyAuthorMySqlGenScriptManuallyOfficial();
        res.send(new APIResponse("200", "OK", "Create for Mysql manually successfully customer!"));
    } catch (err) {
        console.error(`Error get courses: `, err.message);
        res.send(new APIResponse("404", "Not Found", null));
    }
}



async function createDummyBelongsBookAuthorForMySqlManually(req, res, next) {
    try {
        // await createDummyBookMySqlGenScriptManually();
        await createDummyBelongsBookAuthorMySqlGenScriptManuallyOfficial();
        res.send(new APIResponse("200", "OK", "Create for Mysql manually successfully customer!"));
    } catch (err) {
        console.error(`Error get courses: `, err.message);
        res.send(new APIResponse("404", "Not Found", null));
    }
}



async function createDummyContainsOrderBookForMySqlManually(req, res, next) {
    try {
        // await createDummyBookMySqlGenScriptManually();
        await createDummyContainsOrderBookMySqlGenScriptManuallyOfficial();
        res.send(new APIResponse("200", "OK", "Create for Mysql manually successfully customer!"));
    } catch (err) {
        console.error(`Error get courses: `, err.message);
        res.send(new APIResponse("404", "Not Found", null));
    }
}


async function createDummyAllForMySqlManually(req, res, next) {
    try {
        await createDummyBookMySqlGenScriptManuallyOfficial()
        await createDummyCustomerMySqlGenScriptManuallyOfficial()
        await createDummyOrderMySqlGenScriptManuallyOfficial();
        await createDummyAuthorMySqlGenScriptManuallyOfficial();


        await createDummyContainsOrderBookMySqlGenScriptManuallyOfficial();
        await createDummyBelongsBookAuthorMySqlGenScriptManuallyOfficial();

        res.send(new APIResponse("200", "OK", "Create for Mysql manually successfully customer!"));
    } catch (err) {
        console.error(`Error get courses: `, err.message);
        res.send(new APIResponse("404", "Not Found", null));
    }
}


async function testFunction(req, res, next) {
    try {
        await convertDataMySQLToJSON();
        res.send(new APIResponse("200", "OK", "convert data json"));
    } catch (err) {
        console.error(`Error get courses: `, err.message);
        res.send(new APIResponse("404", "Not Found", null));
    }
}

module.exports = {
    findAll,
    createDummyForMySql,
    createDummyForNeo4j,
    findByFieldMySql,
    findByFieldNeo4j,
    filterDataAPIBeers,
    filterDataAPIEntries,
    createDummyForMySqlManually,
    createDummyForNeo4jManually,
    testFunction,

    createDummyCustomerForMySqlManually,
    createDummyCustomerForNeo4jManually,

    createDummyOrdersForMySqlManually,

    createDummyAuthorForMySqlManually,


    createDummyBelongsBookAuthorForMySqlManually,


    createDummyContainsOrderBookForMySqlManually,


    createDummyAllForMySqlManually,

    findAllCustomer,
    findAllOrders
}