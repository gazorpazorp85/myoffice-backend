const dbService = require('../../services/db.service');
const ObjectId = require('mongodb').ObjectId;

const logger = require('../../services/logger.service');

// async function query(userId) {
async function query() {

    const collection = await dbService.getCollection('board');

    try {
        const boards = await collection.find().toArray();
        // const boards = await collection.find({ userId: userId }).toArray();
        return boards;
    } catch (err) {
        logger.error('ERROR: Can\'t find boards');
        throw err;
    }
}

async function getById(boardId) {

    const collection = await dbService.getCollection('board');

    try {
        const board = await collection.findOne({ "_id": ObjectId(boardId) });
        return board;
    } catch (err) {
        logger.error('ERROR: Can\'t find board');
        throw err;
    }
}

async function add(board) {

    const collection = await dbService.getCollection('board');

    try {
        await collection.insertOne(board);
        return board;
    } catch (err) {
        logger.error('ERROR: Can\'t create board');
        throw err;
    }
}

async function remove(boardId) {

    const collection = await dbService.getCollection('board');

    try {
        await collection.deleteOne({ "_id": ObjectId(boardId) });
    } catch (err) {
        logger.error('ERROR: Can\'t delete board');
        throw err;
    }
}

async function update(boardId, board) {

    const collection = await dbService.getCollection('board');
    delete board._id;

    try {
        await collection.updateOne({ "_id": ObjectId(boardId) }, { $set: board });
        board._id = boardId;
        return board;
    } catch (err) {
        logger.error('ERROR: Can\'t update board');
        throw err;
    }
}

module.exports = {
    query,
    getById,
    add,
    remove,
    update
}