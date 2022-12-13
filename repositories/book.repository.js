const axios = require('axios');
const mysql = require('../configs/mysql.config');
const neo4j = require('../configs/neo4j.config');
const helper = require('../utils/helper');
const fileWrite = require('fs');
const session = require("../configs/neo4j.config");
const UPPER = 1, LOWER = 1000;
const DUMMY_BOOKS = 2000;

async function findAll() {
    try {
        const [rows] = await mysql.query("SELECT * FROM book");
        return rows
    } catch (err) {
        console.log("Error: ", err.message);
    }
}

async function findAllCustomer() {
    try {
        const [rows] = await mysql.query("SELECT * FROM CUSTOMER");
        return rows
    } catch (err) {
        console.log("Error: ", err.message);
    }
}

async function findAllOrders() {
    try {
        const [rows] = await mysql.query("SELECT * FROM ORDERS");
        return rows
    } catch (err) {
        console.log("Error: ", err.message);
    }
}


async function findByFieldMySql(field, text) {
    try {

        switch (field) {
            case "description":
                let startTime = new Date().getTime();
                const [rows] = await mysql.query(`SELECT BOOK_NAME, DESCRIPTION
                                                  FROM BOOK
                                                  WHERE MATCH (${field}) AGAINST('${text}' IN BOOLEAN MODE);`);
                let endTime = new Date().getTime();
                let timeExec = (endTime - startTime) / 1000;
                console.log("Time exec MySql: ", timeExec, " s");
                return {rows, timeExec};
                break;

            default:
                break;
        }

    } catch (err) {
        console.log("Error: ", err.message);
    }
}

async function findByFieldNeo4j(field, text) {
    let resList = [];

    try {

        switch (field) {
            case "description":
                let startTime = new Date().getTime();
                let timeExec = 0;
                await session
                    // .run(`CALL db.index.fulltext.queryNodes("fulltext_description_index", "${text}")
                    //             YIELD node, score
                    //             RETURN node.book_name as BOOK_NAME, node.${field} as DESCRIPTION`)

                    .run(`CALL db.index.fulltext.queryNodes("fulltext_description_index", "${text}")
                                YIELD node
                                RETURN node.BOOK_NAME as BOOK_NAME, node.DESCRIPTION as DESCRIPTION`)

                    .then(result => {

                        result.records.forEach(record => {
                            let obj = {};
                            for (let i = 0; i < record.keys.length; i++) {
                                if (record._fields[i].low) {
                                    // default id of node
                                    obj[record.keys[i]] = record._fields[i].low;
                                } else {
                                    obj[record.keys[i]] = record._fields[i];
                                }
                            }
                            resList.push(obj);
                        })
                    })
                    .catch(error => {
                        console.log(error)
                    })
                    .then(() => {

                        let endTime = new Date().getTime();
                        timeExec = (endTime - startTime) / 1000;
                        console.log("Time exec Neo4j: ", timeExec, " s")
                    })

                return {resList, timeExec};
                break;

            default:
                break;
        }

    } catch (err) {
        console.log("Error: ", err.message);
    }

    return resList;
}


module.exports = {
    findAll,
    findByFieldMySql,
    findByFieldNeo4j,
    findAllCustomer,
    findAllOrders
}