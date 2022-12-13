const fileWrite = require('fs');
const db = require("../configs/mysql.config");
const session = require("../configs/neo4j.config");
const {MAX_CUSTOMER} = require("./variables");
const MAX_DUMMY_RECORDS = MAX_CUSTOMER;
const {getRandomInt, genBookNameRandom, genBookDescriptionRandom, convertDataMySQLToJSON} = require("./helper");
const mysql = require("../configs/mysql.config");


function genPhoneNumber() {
    let str = '0';
    for (let i = 0; i < 9; i++) {
        str += getRandomInt(1, 9);
    }
    return str;
}

async function createDummyCustomerMySqlGenScriptManuallyOfficial() {

    let execQuery = '';

    for (let i = 0; i < MAX_DUMMY_RECORDS; i++) {
        let birthday = getRandomInt(1, 29).toString() + "/" + getRandomInt(1, 12).toString() + "/" + getRandomInt(1900, 2022).toString();
        let customerName = genBookNameRandom(2).toUpperCase().replaceAll('"', "").replaceAll(`'`, "");
        let phoneNumber = genPhoneNumber();

        execQuery += `INSERT INTO CUSTOMER (CUSTOMER_NAME, BIRTHDAY, PHONE_NUMBER)
                      VALUES ('${customerName}', '${birthday}', '${phoneNumber}');`;
    }

    await fileWrite.writeFile(__dirname + '\\MYSQL-SCRIPT-CUSTOMER.txt', execQuery, function (err) {
        if (err) return console.log(err);
    });


    const [result] = await db.query(execQuery);

    console.log("create successfully mysql manually official customer")
}


async function createDummyCustomerNeo4jGenScriptManuallyOfficial() {

    const [rows] = await mysql.query("SELECT * FROM customer");
    let jsonString = JSON.stringify(rows);
    const dummyGeneratedMySql = JSON.parse(jsonString);

    let query = '';
    let queryForWrite = '';
    for (let i = 0; i < dummyGeneratedMySql.length; i++) {
        let id = dummyGeneratedMySql[i].CUSTOMER_ID;
        let name = dummyGeneratedMySql[i].CUSTOMER_NAME.replaceAll(',', '').replaceAll(' ', '');
        let birthday = dummyGeneratedMySql[i].BIRTHDAY;
        let phoneNumber = dummyGeneratedMySql[i].PHONE_NUMBER;

        query += `create (:CUSTOMER {CUSTOMER_ID: '${id}', CUSTOMER_NAME: '${name}', 
        BIRTHDAY: '${birthday}', PHONE_NUMBER: '${phoneNumber}'}) \n`;

        queryForWrite += `create (:CUSTOMER {CUSTOMER_ID: '${id}', CUSTOMER_NAME: '${name}', 
        BIRTHDAY: '${birthday}', PHONE_NUMBER: '${phoneNumber}'}); \n`;
    }

    query += ';'

    fileWrite.writeFile(__dirname + '\\NEO4J-SCRIPT-CUSTOMER.txt', queryForWrite, function (err) {
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

    console.log("create successfully neo4j manually official customer")
}



module.exports = {
    createDummyCustomerMySqlGenScriptManuallyOfficial,
    createDummyCustomerNeo4jGenScriptManuallyOfficial,
}