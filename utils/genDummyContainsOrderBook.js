const fileWrite = require('fs');
const db = require("../configs/mysql.config");
const session = require("../configs/neo4j.config");
const {MAX_AUTHOR, MAX_BOOK, MAX_ORDER, MAX_CONTAINS_ORDER_BOOK} = require("./variables");
const MAX_DUMMY_RECORDS = MAX_CONTAINS_ORDER_BOOK;
const {getRandomInt, genBookNameRandom, genBookDescriptionRandom, convertDataMySQLToJSON} = require("./helper");


async function createDummyContainsOrderBookMySqlGenScriptManuallyOfficial() {

    let execQuery = '';


    for (let i = 0; i < MAX_DUMMY_RECORDS; i++) {

        let orderId = getRandomInt(1, MAX_ORDER);
        let bookId = getRandomInt(1, MAX_BOOK);
        let quantity = getRandomInt(1, 20);


        execQuery += `INSERT INTO CONTAINS_ORDER_BOOK (ORDER_ID, BOOK_ID, QUANTITY)
                      VALUES (${orderId}, ${bookId}, ${quantity}) ON DUPLICATE KEY UPDATE ORDER_ID = ${orderId};`;
    }

    await fileWrite.writeFile(__dirname + '\\MYSQL-SCRIPT-CONTAINS-ORDER-BOOK.txt', execQuery, function (err) {
        if (err) return console.log(err);
    });


    const [result] = await db.query(execQuery).catch(err => {
        console.error("error sql ne: ", err)
    });

    console.log("create successfully mysql manually official belongs book author")
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
    createDummyContainsOrderBookMySqlGenScriptManuallyOfficial
}