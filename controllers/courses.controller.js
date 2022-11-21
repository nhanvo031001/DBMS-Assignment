const coursesService = require('../services/courses.service');
const APIResponse = require('../models/APIResponse');
const db = require('../configs/database.config');

async function findAll(req, res, next) {
    try {
        const result = await coursesService.findAll();
        res.send(new APIResponse("200", "OK", result));
    } catch (err) {
        console.error(`Error get courses: `, err.message);
        res.send(new APIResponse("404", "Not Found", null));
    }
}

async function findById(req, res, next) {
    try {
        const result = await coursesService.findById(req.params.id);
        res.send(new APIResponse("200", "OK", result));
    } catch (err) {
        console.error(`Error get courses: `, err.message);
        res.send(new APIResponse("404", "Not Found", null));
    }
}

async function createCourse(req, res, next) {
    try {
        const result = await coursesService.createCourse(req.body.name);
        res.send(new APIResponse("200", "OK", result));
    } catch (err) {
        console.error(`Error get courses: `, err.message);
        res.send(new APIResponse("404", "Not Found", null));
    }
}

async function createDummyCourses(req, res, next) {
    try {
        const result = await coursesService.createDummyCourses();
        res.send(new APIResponse("200", "OK", result));
    } catch (err) {
        console.error(`Error get courses: `, err.message);
        res.send(new APIResponse("404", "Not Found", null));
    }
}

async function createDummyCoursesNeo4j(req, res, next) {
    try {
        const result = await coursesService.createDummyCoursesNeo4j();
        res.send(new APIResponse("200", "OK", result));
    } catch (err) {
        console.error(`Error get courses: `, err.message);
        res.send(new APIResponse("404", "Not Found", null));
    }
}

module.exports = {
    findAll,
    findById,
    createCourse,
    createDummyCourses,
    createDummyCoursesNeo4j
}