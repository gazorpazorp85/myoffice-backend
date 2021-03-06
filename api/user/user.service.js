const dbService = require('../../services/db.service');
const ObjectId = require('mongodb').ObjectId;

async function query(collaborators) {
    const collection = await dbService.getCollection('user');
    const arrayId = collaborators.map(collabolator => new ObjectId(collabolator));
    try {
        const userCollaborators = await collection.find({ "_id": { $in: arrayId } }).toArray();
        userCollaborators.forEach(userCollaborator => {
            delete userCollaborator.password;
            delete userCollaborator.email;
        });
        return userCollaborators;
    } catch (err) {
        logger.error('ERROR: can\'t find users');
        throw err;
    }
}

// async function query() {
//     const collection = await dbService.getCollection('user');

//     try {
//         const users = await collection.find().toArray();
//         users.forEach(user => {
//             delete user.password;
//             delete user.email;
//         });
//         return users;
//     } catch (err) {
//         console.log('ERROR: can\'t find users');
//         throw err;
//     }
// }

async function getByEmail(email) {
    const collection = await dbService.getCollection('user');
    try {
        const user = await collection.findOne({ email });
        return user;
    } catch (err) {
        logger.error('ERROR: can\'t find user');
        throw err;
    }
}

async function add(user) {
    const collection = await dbService.getCollection('user');
    try {
        user.collaborators = [];
        await collection.insertOne(user);
        return user;
    } catch (err) {
        logger.error('ERROR: can\'t create user');
        throw err
    }
}

async function getByFilter(filterBy) {
    const collection = await dbService.getCollection('user');
    try {
        const user = await collection.findOne(filterBy);
        delete user.password;
        delete user.email;
        return user;
    } catch (err) {
        logger.error('ERROR: can\'t find user');
        throw err;
    }
}

module.exports = {
    query,
    getByEmail,
    add,
    getByFilter,
}