const bookRepository = require('../repositories/book.repository');

async function findAll() {
    return bookRepository.findAll();
}

async function findAllCustomer() {
    return bookRepository.findAllCustomer();
}

async function findAllOrders() {
    return bookRepository.findAllOrders();
}

async function findByFieldMySql(field, text) {
    return bookRepository.findByFieldMySql(field, text);
}

async function findByFieldNeo4j(field, text) {
    return bookRepository.findByFieldNeo4j(field, text);
}




module.exports = {
    findAll,
    findByFieldMySql,
    findByFieldNeo4j,
    findAllCustomer,
    findAllOrders
}