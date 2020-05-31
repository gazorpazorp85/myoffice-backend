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
        delete user.url_id;
        return user;
    } catch (err) {
        logger.error('ERROR: can\'t find user');
        throw err;
    }
}

async function collaborationRequestHandler(collaborator, request) {

    const collection = await dbService.getCollection('user');
    const user = await _getById(collaborator._id);
    console.log('user: ', user);
    // console.log('im here', collaborator, request);
    const userId = user._id;
    delete user._id;
    user.requests = [];
    user.requests.push(request);
    console.log('user after adding requests: ', user);

    try {
        const updatedUser = await collection.updateOne({ "_id": ObjectId(userId) }, { $set: user });
        console.log('updatedUser: ', updatedUser);
    } catch (err) {
        logger.error('Error: Can\'t process collaboration request');
    }

}

async function _getById(userId) {

    const collection = await dbService.getCollection('user');

    try {
        const user = await collection.findOne({ "_id": ObjectId(userId) });
        return user;
    } catch (err) {
        logger.error('ERROR: Can\'t find user by Id');
        throw err;
    }
}

module.exports = {
    query,
    getByEmail,
    add,
    getByFilter,
    collaborationRequestHandler
}