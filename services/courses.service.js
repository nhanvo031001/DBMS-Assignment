var data = require('../utils/DATA.json');
const courseRepository = require('../repositories/courses.repository');

async function findAll() {
    return courseRepository.findAll();
}

async function findById(id) {
    return courseRepository.findById(id);
}

async function createCourse(name) {
    const newCourse = {
        id: data.length + 1,
        name: name
    }
    data.push(newCourse);
    return data;
}

async function createDummyCourses() {
    return courseRepository.createDummyCourses();
}

async function createDummyCoursesNeo4j() {
    return courseRepository.createDummyCoursesNeo4j();
}

module.exports = {
    findAll,
    findById,
    createCourse,
    createDummyCourses,
    createDummyCoursesNeo4j
}