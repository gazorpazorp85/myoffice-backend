const UserService = require('./user.service');

async function getUsers(req, res) {

    try {
        const users = await UserService.query()
        res.send(users)
    } catch (err) {
        res.status(401).send({ error: 'couldn\'t get users, please try later' });
    }
}

async function getUserCollaborators(req, res) {

    const collaborators = req.body;

    try {
        const userCollaborators = await UserService.query(collaborators);
        res.send(userCollaborators);
    } catch (err) {
        res.status(401).send({ error: 'couldn\'t get user collaborators, please try later' });
    }
}

async function getCollaborator(req, res) {

    const filterBy = req.body;

    try {
        const collaborator = await UserService.getByFilter(filterBy);
        res.send(collaborator);
    } catch (err) {
        res.status(404).send({ error: 'couldn\'t find collaborator' });
    }
}

async function getCollaborationRequest(req, res) {

    const { collaborator, request } = req.body;

    try {
        await UserService.collaborationRequestHandler(collaborator, request);
        res.end();
    } catch (err) {
        res.status(404).send({ error: 'couldn\'t send collaboration request' });
    }
}

module.exports = {
    getUsers,
    getUserCollaborators,
    getCollaborator,
    getCollaborationRequest
}