const axios = require('axios');
const db = require('../configs/database.config');
const session = require('../configs/neo4j.config');
const helper = require('../utils/helper');
const fileWrite = require('fs');
const UPPER = 1, LOWER = 1000;
const DUMMY_COURSES = 2000;

async function findAll() {
    try {
        const [rows] = await db.query("SELECT * FROM course");
        return rows
    } catch (err) {
        console.log("Error: ", err.message);
    }
}

async function findById(id) {
    try {
        const [row] = await db.query("SELECT * FROM course WHERE course.id = ?", [id]);
        return row;
    } catch (err) {
        console.log("Error: ", err.message);
    }
}

async function createDummyCourses() {
    try {
        let content = '';
        for (let i = 1; i <= DUMMY_COURSES; i++) {
            let randomNumber = helper.getRandomInt(UPPER, LOWER);
            // const [result] = await db.query(`
            //     INSERT INTO COURSE (COURSE_NAME, MAX_NUMBER) VALUES("Name ${i}", ${randomNumber})
            // `);
            content += `INSERT INTO COURSE (COURSE_NAME, MAX_NUMBER) VALUES("Name ${i}", ${randomNumber});
            `;
        }

        fileWrite.writeFile(__dirname + '\\script.txt', content, function (err) {
            if (err) return console.log(err);
        })
    } catch (err) {
        console.log("Error: ", err.message);
    }
}

async function createDummyCoursesNeo4j() {
    try {
        let content = '';
        for (let i = 1; i <= DUMMY_COURSES; i++) {
            let randomNumber = helper.getRandomInt(UPPER, LOWER);
            content += `INSERT INTO COURSE (COURSE_NAME, MAX_NUMBER) VALUES("Name ${i}", ${randomNumber});
            `;
        }

        fileWrite.writeFile(__dirname + '\\scriptNeo4j.txt', content, function (err) {
            if (err) return console.log(err);
        })
    } catch (err) {
        console.log("Error: ", err.message);
    }
}

async function getDummyFromPublicAPIs() {
    let data;
    await axios.get("https://api.publicapis.org/entries")
        .then(res => {
            data = res.data;
        })
        .catch(err => {
            {
                console.log("error: ", err)
            }
        })
    return data;
}

async function testConnectNeo4j() {
    let res = [];
    // session.run('match (n) return n').subscribe({
    //     onNext: record => {
    //         // console.log("record: ", record._fields[0])
    //         res = record._fields[0];
    //     },
    //     onCompleted: () => {

    //     }
    // })

    await session
        .run('match (n) return n')
        .then(result => {
            result.records.forEach(record => {
                // console.log(record._fields[0]);
                res.push(record._fields[0]);
            })
        })
        .catch(error => {
            console.log(error)
        })
        .then(() => {
            return res;
        })

    return res;
}


module.exports = {
    findAll,
    createDummyCourses,
    findById,
    createDummyCoursesNeo4j,
    getDummyFromPublicAPIs,
    testConnectNeo4j
}