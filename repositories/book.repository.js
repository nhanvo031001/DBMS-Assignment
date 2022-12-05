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

async function findByFieldMySql(field, text) {
    try {

        switch (field) {
            case "description":
                let startTime = new Date().getTime();
                console.log("text: ", text)
                const [rows] = await mysql.query(`SELECT *
                                                  FROM BOOK
                                                  WHERE MATCH (${field}) AGAINST('${text}' IN BOOLEAN MODE);`);
                let endTime = new Date().getTime();
                console.log("Time exec MySql: ", (endTime - startTime) / 1000, " s");
                return rows
                break;

            default:
                break;
        }

    } catch (err) {
        console.log("Error: ", err.message);
    }
}

async function findByFieldNeo4j(field, text) {
    let res = [];

    try {

        switch (field) {
            case "description":
                let startTime = new Date().getTime();
                await session
                    .run(`CALL db.index.fulltext.queryNodes("fulltext_description_index", "${text}")
                                YIELD node, score
                                RETURN node.book_name, node.${field}, score`)
                    .then(result => {

                        result.records.forEach(record => {
                            let obj = {};
                            for (let i = 0; i < record.keys.length; i++) {
                                obj[record.keys[i]] = record._fields[i];
                            }
                            res.push(obj);
                        })
                    })
                    .catch(error => {
                        console.log(error)
                    })
                    .then(() => {

                        let endTime = new Date().getTime();
                        console.log("Time exec Neo4j: ", (endTime - startTime) / 1000, " s");

                        return res;
                    })

                return res
                break;

            default:
                break;
        }

    } catch (err) {
        console.log("Error: ", err.message);
    }

    return res;
}


module.exports = {
    findAll,
    findByFieldMySql,
    findByFieldNeo4j
}