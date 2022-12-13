const fileWrite = require('fs');
const db = require("../configs/mysql.config");
const session = require("../configs/neo4j.config");
const {MAX_AUTHOR, MAX_BOOK, MAX_BELONGS_BOOK_AUTHOR} = require("./variables");
const MAX_DUMMY_RECORDS = MAX_BELONGS_BOOK_AUTHOR;
const {getRandomInt, genBookNameRandom, genBookDescriptionRandom, convertDataMySQLToJSON} = require("./helper");
const mysql = require("../configs/mysql.config");


async function createDummyBelongsBookAuthorMySqlGenScriptManuallyOfficial() {

    let execQuery = '';
    let checkVal = {}

    for (let i = 0; i < MAX_DUMMY_RECORDS; i++) {

        let authorId = getRandomInt(1, MAX_AUTHOR);
        let bookId = getRandomInt(1, MAX_BOOK);


        execQuery += `INSERT INTO BELONGS_BOOK_AUTHOR (AUTHOR_ID, BOOK_ID)
                      VALUES (${authorId}, ${bookId}) ON DUPLICATE KEY UPDATE AUTHOR_ID = ${authorId};`;
    }

    await fileWrite.writeFile(__dirname + '\\MYSQL-SCRIPT-BELONGS-BOOK-AUTHOR.txt', execQuery, function (err) {
        if (err) return console.log(err);
    });


    const [result] = await db.query(execQuery).catch(err => {
        console.error("error: ", err)
    });

    console.log("create successfully mysql manually official belongs book author")
}


async function createDummyBelongsBookAuthorNeo4jGenScriptManuallyOfficial() {

    const [rows] = await mysql.query("SELECT * FROM BELONGS_BOOK_AUTHOR");
    let jsonString = JSON.stringify(rows);
    const dummyGeneratedMySql = JSON.parse(jsonString);

    let queryForRelationship = '';
    for (let i = 0; i < dummyGeneratedMySql.length; i++) {
        let bookId = dummyGeneratedMySql[i].BOOK_ID;
        let authorId = dummyGeneratedMySql[i].AUTHOR_ID;


        queryForRelationship = '';
        queryForRelationship += `MATCH (B:BOOK {BOOK_ID:'${bookId}'}) MATCH (A:AUTHOR {AUTHOR_ID: '${authorId}'}) 
        CREATE (A) -[:WRITE_BOOK]-> (B);`;

        await session
            .run(queryForRelationship)
            .then(result => {
            })
            .catch(error => {
                console.log(error)
            })
            .then(() => {

            })
    }

    console.log("create successfully neo4j manually official book")
}



module.exports = {
    createDummyBelongsBookAuthorMySqlGenScriptManuallyOfficial,
    createDummyBelongsBookAuthorNeo4jGenScriptManuallyOfficial
}