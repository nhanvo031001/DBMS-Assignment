const axios = require('axios');
const db = require('../configs/mysql.config');
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

async function createDummyFromPublicAPIs() {

    // get data from public api
    let data = [];
    await axios.get("https://api.publicapis.org/entries")
        .then(res => {
            data = res.data.entries;
        })
        .catch(err => {
            {
                console.log("error: ", err)
            }
        })


    let count = 0;
    for (const record of data) {
        await session
            .run('create (shortName:PLAYER{name:$name, description: $description});', {
                shortName: record.API,
                name: record.API,
                description: record.Description
            })
            .then(result => {
                // console.log("result create dummy: ", result);
                // res = result;
            })
            .catch(error => {
                console.log(error)
            })
            .then(() => {

            })

        // count +=1;
        // if (count == 10) {
        //     break;
        // }
    }


    console.log("create successfully")

}

async function createDummyFromPublicAPIsMySql() {

    // get data from public api
    let data = [];
    await axios.get("https://api.publicapis.org/entries")
        .then(res => {
            data = res.data.entries;
        })
        .catch(err => {
            {
                console.log("error: ", err)
            }
        })


    let count = 0;
    let content = ''
    for (const record of data) {
        let api = record.API;
        let des = record.Description

        api = api.replaceAll('"', "");
        api = api.replaceAll(`'`, "");
        des = des.replaceAll('"', "");
        des = des.replaceAll(`'`, "");

        content += `
            INSERT INTO COURSE (COURSE_NAME, DESCRIPTION)
            VALUES ('${api}', '${des}');
        `

        // console.log("content :", content)

        const [result] = await db.query(`
            INSERT INTO COURSE (COURSE_NAME, DESCRIPTION)
            VALUES ('${api}', '${des}');
        `);



        count +=1;
        // if (count == 3) {
        //     break;
        // }
        console.log("count: ", count)
    }


    console.log("create successfully mysql")

    console.log("content :", content)

}

async function indexTestMySql() {
    try {
        var pre_query = new Date().getTime();
        // console.log("rows mysql: ", rows)
        // const [rows] = await db.query("select * from course where match(description) against('cat' IN BOOLEAN MODE);");
        const [rows] = await db.query("SELECT * FROM course WHERE course.description like ?", ["%facts%"]);
        // console.log("rows: ", rows)
        var post_query = new Date().getTime();
        console.log("time exec mysql: ", (post_query - pre_query)/1000);
        return rows
    } catch (err) {
        console.log("Error: ", err.message);
    }
}

async function indexTestNeo4j() {
    let res = [];

    var pre_query = new Date().getTime();
    await session
        .run('CALL db.index.fulltext.queryNodes("fulltext_description_index", "cat")\n' +
            'YIELD node, score\n' +
            'RETURN node.name, node.description, score\n')
        .then(result => {

            result.records.forEach(record => {
                let obj = {};
                for (let i = 0; i < record.keys.length; i++) {
                    obj[record.keys[i]] = record._fields[i];
                }
                // console.log("object after merge: ", obj);
                res.push(obj);
            })
        })
        .catch(error => {
            console.log(error)
        })
        .then(() => {

            var post_query = new Date().getTime();
            console.log("time exec neo4j: ", (post_query - pre_query)/1000);

            return res;
        })

    // console.log("result neo4j index: ", res)
    return res;
}


module.exports = {
    findAll,
    createDummyCourses,
    findById,
    createDummyCoursesNeo4j,
    getDummyFromPublicAPIs,
    testConnectNeo4j,
    createDummyFromPublicAPIs,
    createDummyFromPublicAPIsMySql,
    indexTestNeo4j,
    indexTestMySql
}