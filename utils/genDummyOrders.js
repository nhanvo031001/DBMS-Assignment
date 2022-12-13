const fileWrite = require('fs');
const db = require("../configs/mysql.config");
const session = require("../configs/neo4j.config");
const {MAX_ORDER, MAX_CUSTOMER} = require("./variables");
const MAX_DUMMY_RECORDS = MAX_ORDER;
const {getRandomInt, genBookNameRandom, genBookDescriptionRandom, convertDataMySQLToJSON} = require("./helper");
const mysql = require("../configs/mysql.config");


function genPhoneNumber() {
    let str = '0';
    for (let i = 0; i < 9; i++) {
        str += getRandomInt(1, 9);
    }
    return str;
}

async function createDummyOrderMySqlGenScriptManuallyOfficial() {

    let execQuery = '';

    for (let i = 0; i < MAX_DUMMY_RECORDS; i++) {

        let customerId = getRandomInt(1, MAX_CUSTOMER);
        let quantity = getRandomInt(1, 20);
        let totalPrice = getRandomInt(1000, 50000);

        execQuery += `INSERT INTO ORDERS (CUSTOMER_ID, QUANTITY, TOTAL_PRICE)
                      VALUES ('${customerId}', '${quantity}', '${totalPrice}');`;
    }

    await fileWrite.writeFile(__dirname + '\\MYSQL-SCRIPT-ORDERS.txt', execQuery, function (err) {
        if (err) return console.log(err);
    });


    const [result] = await db.query(execQuery);

    console.log("create successfully mysql manually official orders")
}

// NOT FINISH !!!!!!
async function createDummyOrderNeo4jGenScriptManuallyOfficial() {

    const [rows] = await mysql.query("SELECT * FROM orders");
    let jsonString = JSON.stringify(rows);
    const dummyGeneratedMySql = JSON.parse(jsonString);

    let query = '';
    let queryForWrite = '';
    for (let i = 0; i < dummyGeneratedMySql.length; i++) {
        let id = dummyGeneratedMySql[i].ORDERS_ID;
        let quantity = dummyGeneratedMySql[i].QUANTITY;
        let totalPrice = dummyGeneratedMySql[i].TOTAL_PRICE;
        let customerId = dummyGeneratedMySql[i].CUSTOMER_ID;

        query += `create (:ORDERS {ORDERS_ID: '${id}', TOTAL_PRICE: '${totalPrice}', 
        QUANTITY: '${quantity}'}) \n`;

        // query += `MATCH (C:CUSTOMER {CUSTOMER_ID:'${customerId}'}) MATCH (O:ORDERS {ORDERS_ID: '${id}'}) CREATE (C) -[:HAS]-> (O)\n`;

        queryForWrite += `create (:ORDERS {ORDERS_ID: '${id}', TOTAL_PRICE: '${totalPrice}', 
        QUANTITY: '${quantity}'}); \n`;
    }




    query += ';'

    fileWrite.writeFile(__dirname + '\\NEO4J-SCRIPT-ORDER.txt', queryForWrite, function (err) {
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


    let queryForRelationship = '';
    for (let i = 0; i < dummyGeneratedMySql.length; i++) {
        let id = dummyGeneratedMySql[i].ORDERS_ID;
        let customerId = dummyGeneratedMySql[i].CUSTOMER_ID;

        queryForRelationship = '';
        queryForRelationship += `MATCH (C:CUSTOMER {CUSTOMER_ID:'${customerId}'}) MATCH (O:ORDERS {ORDERS_ID: '${id}'}) CREATE (C) -[:HAS_ORDER]-> (O);`;

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

    console.log("create successfully neo4j manually official order")
}


module.exports = {
    createDummyOrderMySqlGenScriptManuallyOfficial,
    createDummyOrderNeo4jGenScriptManuallyOfficial
}