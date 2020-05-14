const UserService = require('./user.service');

async function getUsers(req, res) {

    console.log(req);
    // const collaborators = req.body;
    // console.log(collaborators);

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

module.exports = {
    getUsers,
    getUserCollaborators
}