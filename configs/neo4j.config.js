const neo4j = require('neo4j-driver');
const uri = 'neo4j://localhost:7687';
const user = 'neo4j';
const password = '123456789';

const driver = neo4j.driver(uri, neo4j.auth.basic(user, password) );
driver.verifyConnectivity();

const session = driver.session();

module.exports = session;

