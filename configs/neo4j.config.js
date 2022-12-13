const neo4j = require('neo4j-driver');
const uri = 'neo4j://localhost:7687';
const user = 'neo4j';
const password = '123456789';

const driver = neo4j.driver(uri, neo4j.auth.basic(user, password) );
driver.verifyConnectivity();

const session = driver.session();

// session.run('match (n) return n').subscribe({
//     onNext: record => {
//         console.log("record: ", record._fields[0])
//     },
//     onCompleted: () => {

//     }
// })

module.exports = session;

