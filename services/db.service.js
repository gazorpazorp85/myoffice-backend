const MongoClient = require('mongodb').MongoClient;

const logger = require('./logger.service');
const config = require('../config');

const dbName = 'MY_OFFICE_DB';
var dbConn = null;

async function getCollection(collectionName) {
    try {
        const db = await connect();
        return db.collection(collectionName);
    } catch (err) {
        logger.error('error getting database')
    }
}

async function connect() {
    
    if (dbConn) return dbConn;
    try {
        const client = await MongoClient.connect(config.dbURL, { useUnifiedTopology: true, useNewUrlParser: true });
        const db = client.db(dbName);
        dbConn = db;
        return db;
    } catch (err) {
        logger.error('Can\'t Connect to DB', err);
        throw err;
    }
}

module.exports = {
    getCollection
}