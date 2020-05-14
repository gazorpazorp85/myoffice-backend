const bcrypt = require('bcrypt');
const UserService = require('../user/user.service');
const logger = require('../../services/logger.service');

const saltRounds = 10;

async function login(email, password) {
    
    if (!email || !password) return Promise.reject('email and password are required!');

    const user = await UserService.getByEmail(email);
    if (!user) return Promise.reject('Invalid email');

    const match = await bcrypt.compare(password, user.password);
    if (!match) return Promise.reject('Invalid password');

    delete user.password;
    logger.debug(`auth.service - login with email: ${email}`);
    return user;
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