const dbService = require('../../services/db.service');
// import { ObjectId } from 'mongodb';

const logger = require('../../services/logger.service');

async function query(userId) {

    const collection = await dbService.getCollection('request');

    try {
        const receivedRequests = await collection.find({ receiverId: userId, status: 'pending' }).toArray();
        const sentRequests = await collection.find({ senderId: userId, status: 'pending' }).toArray();
        const requests = receivedRequests.concat(sentRequests);
        return requests;
    } catch (err) {
        logger.error('ERROR: Can\'t find requests');
        throw err;
    }
}

async function add(request) {
    const collection = await dbService.getCollection('request');

    try {
        await collection.insertOne(request);
        return request
    } catch (err) {
        logger.error('ERROR: Can\'t create request');
        throw err;
    }
}

module.exports = {
    query,
    add
}