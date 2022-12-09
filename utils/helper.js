const axios = require('axios');
const mysql = require('../configs/mysql.config');
const neo4j = require('../configs/neo4j.config');
const helper = require('../utils/helper');
const fileWrite = require('fs');
const db = require("../configs/mysql.config");
const session = require("../configs/neo4j.config");
const UPPER = 1, LOWER = 1000;
const DUMMY_BOOKS = 2000;

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

async function getDataFromPublicAPIs() {
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
    return data;
}

async function createDummyBookMySql() {

    let data = await getDataFromPublicAPIs();

    for (const record of data) {
        let api = record.API.replaceAll('"', "").replaceAll(`'`, "");
        let des = record.Description.replaceAll('"', "").replaceAll(`'`, "");

        const [result] = await db.query(`
            INSERT INTO BOOK (BOOK_NAME, DESCRIPTION)
            VALUES ('${api}', '${des}');
        `);
    }

    console.log("create successfully mysql")
}

async function createDummyBookNeo4j() {

    let data = await getDataFromPublicAPIs();

    let count = 1;
    for (const record of data) {
        
        await session
            .run('create (:BOOK{book_name:$book_name, description: $description, book_id: $book_id});', {
                book_name: record.API,
                description: record.Description,
                book_id: count,
            })
            .then(result => {
            })
            .catch(error => {
                console.log(error)
            })
            .then(() => {

            })
        count +=1;
    }

    console.log("create successfully neo4j");
}

module.exports = {
    getRandomInt,
    createDummyBookMySql,
    createDummyBookNeo4j
}