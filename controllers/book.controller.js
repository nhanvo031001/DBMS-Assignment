const bookService = require('../services/book.service');
const APIResponse = require('../models/APIResponse');
const {createDummyBookMySql, createDummyBookNeo4j} = require("../utils/helper");

async function findAll(req, res, next) {
    try {
        const result = await bookService.findAll();
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

async function createDummyForNeo4j(req, res, next) {
    try {
        await createDummyBookNeo4j();
        res.send(new APIResponse("200", "OK", "Create for Neo4j successfully !"));
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
    findByFieldNeo4j
}