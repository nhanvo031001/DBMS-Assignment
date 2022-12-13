const fileWrite = require('fs');
const db = require("../configs/mysql.config");
const session = require("../configs/neo4j.config");
const {MAX_AUTHOR} = require("./variables");
const MAX_DUMMY_RECORDS = MAX_AUTHOR;
const {getRandomInt, genBookNameRandom, genBookDescriptionRandom, convertDataMySQLToJSON} = require("./helper");
const mysql = require("../configs/mysql.config");


async function createDummyAuthorMySqlGenScriptManuallyOfficial() {

    let execQuery = '';

    for (let i = 0; i < MAX_DUMMY_RECORDS; i++) {

        let authorName = genBookNameRandom(2).toUpperCase().replaceAll('"', "").replaceAll(`'`, "");

        execQuery += `INSERT INTO AUTHOR (AUTHOR_NAME)
                      VALUES ('${authorName}');`;
    }

    await fileWrite.writeFile(__dirname + '\\MYSQL-SCRIPT-AUTHOR.txt', execQuery, function (err) {
        if (err) return console.log(err);
    });


    const [result] = await db.query(execQuery);

    console.log("create successfully mysql manually official author")
}


async function createDummyAuthorNeo4jGenScriptManuallyOfficial() {

    const [rows] = await mysql.query("SELECT * FROM author");
    let jsonString = JSON.stringify(rows);
    const dummyGeneratedMySql = JSON.parse(jsonString);

    let query = '';
    let queryForWrite = '';
    for (let i = 0; i < dummyGeneratedMySql.length; i++) {
        let id = dummyGeneratedMySql[i].AUTHOR_ID;
        let name = dummyGeneratedMySql[i].AUTHOR_NAME.replaceAll(',', '').replaceAll(' ', '');

        query += `create (:AUTHOR {AUTHOR_ID: '${id}', AUTHOR_NAME: '${name}'}) \n`;

        queryForWrite += `create (:AUTHOR {AUTHOR_ID: '${id}', AUTHOR_NAME: '${name}'}); \n`;
    }

    query += ';'

    fileWrite.writeFile(__dirname + '\\NEO4J-SCRIPT-AUTHOR.txt', queryForWrite, function (err) {
        if (err) return console.log(err);
    });

    await session
        .run(query)
        .then(result => {
        })
        .catch(error => {
            console.log(error)
        })
        .then(() => {

        })

    console.log("create successfully neo4j manually official author")
}



module.exports = {
    createDummyAuthorMySqlGenScriptManuallyOfficial,
    createDummyAuthorNeo4jGenScriptManuallyOfficial
}