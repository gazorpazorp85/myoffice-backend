const bcrypt = require('bcrypt');
const UserService = require('../user/user.service');
const logger = require('../../services/logger.service');

const saltRounds = 10;

async function login(email, password) {

    try {
        const user = await UserService.getByEmail(email);
        const match = await bcrypt.compare(password, user.password);
        if (match) {
            delete user.password;
            logger.debug(`auth.service - login with email: ${email}`);
            return user;
        } else {
            throw err;
        }
    } catch (err) {
        logger.error('ERROR: invalid username or password');
        throw err;
    }
}

async function signup(firstName, lastName, username, email, password) {
    if (!firstName || !lastName || !username || !email || !password) return Promise.reject('some info are missing');

    const hash = await bcrypt.hash(password, saltRounds);
    logger.debug(`auth.service - signup with email: ${email}, username: ${username}`);
    return UserService.add({ firstName, lastName, username, email, password: hash });
}

module.exports = {
    login,
    signup
}