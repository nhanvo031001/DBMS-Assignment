const axios = require('axios');
const mysql = require('../configs/mysql.config');
const neo4j = require('../configs/neo4j.config');
const helper = require('../utils/helper');
const fileWrite = require('fs');
const db = require("../configs/mysql.config");
const session = require("../configs/neo4j.config");
const UPPER = 1, LOWER = 1000, MAX_WORDS_BEERS = 1000, MAX_WORDS_ENTRIES = 11900;
const MAX_DUMMY_RECORDS = 10000;
const DUMMY_BOOKS = 2000;
const beersJSON = require('./beers.json');
const entriesJSON = require('./entries.json');
const dataWordsBeers = require('./wordsBeersAPI.json');
const dataWordsEntries = require('./wordsEntriesAPI.json');
// const dummyGeneratedMySql = require('./DATA-MYSQL.json');

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}


function genBookNameRandom(len) {
    const data = dataWordsBeers[0];
    let res = '';
    for (let i = 0; i < len; i++) {
        let randomNo = getRandomInt(1, MAX_WORDS_BEERS);
        res += data[randomNo.toString().replaceAll('"', "").replaceAll(`'`, "")];
    }

    return res;
}


function genBookDescriptionRandom(len) {
    const data = dataWordsEntries[0];

    let res = '';
    for (let i = 0; i < len; i++) {
        let randomNo = getRandomInt(1, MAX_WORDS_ENTRIES);
        res = res + " " + data[randomNo].replaceAll('"', "").replaceAll(`'`, "");
    }

    return res;
}


async function getDataFromPublicAPIs() {
    let data = [];
    await axios.get("https://api.publicapis.org/entries")
        .then(res => {
            data = res.data.entries;
        })
        .catch(err => {
            console.log("error: ", err)
        })
    return data;
}


async function filterDataFromEntriesAPI() {

    let arr = [];
    let savedObj = {};
    let countIdx = 1;
    for (let i = 0; i < entriesJSON.length; i++) {

        let api = entriesJSON[i].API.replaceAll('"', "").replaceAll(`'`, "").split(' ');
        let description = entriesJSON[i].Description.replaceAll('"', "").replaceAll(`'`, "").split(' ');

        let arrayWords = [];
        arrayWords = arrayWords.concat(api).concat(description);

        for (const eachWord of arrayWords) {
            let idx = countIdx.toString();
            savedObj[`${idx}`] = eachWord;
            countIdx++;
        }
    }

    arr.push(savedObj);

    let jsonString = JSON.stringify(arr);

    fileWrite.writeFile(__dirname + '\\wordsEntriesAPI.json', jsonString, function (err) {
        if (err) return console.log(err);
    });

    console.log("count idx: ", countIdx);
}


async function filterDataFromBeersAPI() {
    // console.log("beers: ", dataWords);

    let arr = [];
    let savedObj = {};
    let countIdx = 1;
    for (let i = 0; i < beersJSON.length; i++) {

        let name = beersJSON[i].name.split(' ');
        let tagLine = beersJSON[i].tagline.split(' ');
        let description = beersJSON[i].description.split(' ');
        let brewersTips = beersJSON[i].brewers_tips.split(' ');
        let foodPairing = beersJSON[i].food_pairing;
        let foodPairingParse = [];
        foodPairing.forEach(ele => foodPairingParse.concat(ele.split(' ')));

        let arrayWords = [];
        arrayWords = arrayWords.concat(name).concat(tagLine).concat(description).concat(foodPairingParse).concat(brewersTips);

        for (const eachWord of arrayWords) {
            let idx = countIdx.toString();
            savedObj[`${idx}`] = eachWord;
            countIdx++;
        }
    }

    arr.push(savedObj);

    let jsonString = JSON.stringify(arr);

    fileWrite.writeFile(__dirname + '\\wordsBeersAPI.json', jsonString, function (err) {
        if (err) return console.log(err);
    });

    console.log("count idx: ", countIdx);
}


async function createDummyBookMySqlGenScriptManually() {

    let execQuery = '';

    for (let i = 0; i < MAX_DUMMY_RECORDS; i++) {
        let pageNo = getRandomInt(50, 700);
        let price = getRandomInt(5000, 100000);
        let bookName = genBookNameRandom(2).toUpperCase().replaceAll('"', "").replaceAll(`'`, "");
        let description = genBookDescriptionRandom(10);

        execQuery += `INSERT INTO BOOK (BOOK_NAME, DESCRIPTION, PAGE_NUMBER, PRICE)
                      VALUES ('${bookName}', '${description}', '${pageNo}', '${price}');`;
    }

    await fileWrite.writeFile(__dirname + '\\MYSQL-SCRIPT.txt', execQuery, function (err) {
        if (err) return console.log(err);
    });

    // await convertDataMySQLToJSON();

    const [result] = await db.query(execQuery);



    console.log("create successfully mysql manually")
}


async function createDummyBookNeo4jGenScriptManually() {

    // await convertDataMySQLToJSON();
    // const dummyGeneratedMySql = require('./DATA-MYSQL.json');

    const dummyGeneratedMySql = JSON.parse(await convertDataMySQLToJSON());

    let count = 1;

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

    fileWrite.writeFile(__dirname + '\\NEO4J-SCRIPT.txt', queryForWrite, function (err) {
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
        count += 1;
    }

    console.log("create successfully neo4j");
}

async function convertDataMySQLToJSON() {
    const [rows] = await mysql.query("SELECT * FROM book");

    let jsonString = JSON.stringify(rows);
    // fileWrite.writeFile(__dirname + '\\DATA-MYSQL.json', jsonString, function (err) {
    //     if (err) return console.log(err);
    // });
    // console.log("rows: ", rows);
    return jsonString
}


module.exports = {
    getRandomInt,
    createDummyBookMySql,
    createDummyBookNeo4j,
    filterDataFromBeersAPI,
    filterDataFromEntriesAPI,
    createDummyBookMySqlGenScriptManually,
    createDummyBookNeo4jGenScriptManually,
    convertDataMySQLToJSON,
    genBookNameRandom,
    genBookDescriptionRandom
}