const fileWrite = require('fs');
const db = require("../configs/mysql.config");
const session = require("../configs/neo4j.config");
const {MAX_AUTHOR, MAX_BOOK, MAX_ORDER, MAX_CONTAINS_ORDER_BOOK} = require("./variables");
const MAX_DUMMY_RECORDS = MAX_CONTAINS_ORDER_BOOK;
const {getRandomInt, genBookNameRandom, genBookDescriptionRandom, convertDataMySQLToJSON} = require("./helper");
const mysql = require("../configs/mysql.config");


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


async function createDummyContainsOrderBookNeo4jGenScriptManuallyOfficial() {

    const [rows] = await mysql.query("SELECT * FROM CONTAINS_ORDER_BOOK");
    let jsonString = JSON.stringify(rows);
    const dummyGeneratedMySql = JSON.parse(jsonString);

    let queryForRelationship = '';
    for (let i = 0; i < dummyGeneratedMySql.length; i++) {
        let bookId = dummyGeneratedMySql[i].BOOK_ID;
        let orderId = dummyGeneratedMySql[i].ORDER_ID;


        queryForRelationship = '';
        queryForRelationship += `MATCH (B:BOOK {BOOK_ID:'${bookId}'}) MATCH (O:ORDERS {ORDERS_ID: '${orderId}'}) 
        CREATE (O) -[:CONTAINS_BOOK]-> (B);`;

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
    createDummyContainsOrderBookMySqlGenScriptManuallyOfficial,
    createDummyContainsOrderBookNeo4jGenScriptManuallyOfficial
}