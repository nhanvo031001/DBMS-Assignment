const fileWrite = require('fs');
const db = require("../configs/mysql.config");
const session = require("../configs/neo4j.config");
const {MAX_AUTHOR} = require("./variables");
const MAX_DUMMY_RECORDS = MAX_AUTHOR;
const {getRandomInt, genBookNameRandom, genBookDescriptionRandom, convertDataMySQLToJSON} = require("./helper");


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

    const dummyGeneratedMySql = JSON.parse(await convertDataMySQLToJSON());

    let query = '';
    let queryForWrite = '';
    for (let i = 0; i < dummyGeneratedMySql.length; i++) {
        let id = dummyGeneratedMySql[i].BOOK_ID;
        let name = dummyGeneratedMySql[i].BOOK_NAME.replaceAll(',', '').replaceAll(' ', '');
        let description = dummyGeneratedMySql[i].DESCRIPTION;
        let price = dummyGeneratedMySql[i].PRICE;
        let pageNumber = dummyGeneratedMySql[i].PAGE_NUMBER;

        query += `create (:BOOK {BOOK_ID: '${id}', BOOK_NAME: '${name}', 
        DESCRIPTION: '${description}', PRICE: '${price}', PAGE_NUMBER: '${pageNumber}'}) \n`;

        queryForWrite += `create (:BOOK {BOOK_ID: '${id}', BOOK_NAME: '${name}', 
        DESCRIPTION: '${description}', PRICE: '${price}', PAGE_NUMBER: '${pageNumber}'}); \n`;
    }

    query += ';'

    fileWrite.writeFile(__dirname + '\\NEO4J-SCRIPT-BOOK.txt', queryForWrite, function (err) {
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

    console.log("create successfully neo4j manually official book")
}



module.exports = {
    createDummyAuthorMySqlGenScriptManuallyOfficial
}