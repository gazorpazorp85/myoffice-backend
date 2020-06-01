const AuthService = require('./auth.service');
const logger = require('../../services/logger.service');

async function login(req, res) {
    const { email, password } = req.body;

    try {
        const user = await AuthService.login(email, password);
        req.session.user = user;
        req.session.save();
        res.json(req.session.user);
    } catch (err) {
        res.status(401).send('could not login, please try later');
    }
}

async function signup(req, res) {
    try {
        const { firstName, lastName, username, email, password } = req.body;
        logger.debug(firstName + ',' + lastName + ',' + username + ',' + email + ',' + password);
        const account = await AuthService.signup(firstName, lastName, username, email, password);
        logger.debug(`auth.route - new account created: ` + JSON.stringify(account));
        const user = await AuthService.login(email, password);
        req.session.user = user;
        req.session.save();
        res.json(user);
    } catch (err) {
        logger.error('Error while signup', + err);
        res.status(500).send({ error: 'couldn\'t signup, please try again later' });
    }
}

async function logout(req, res) {
    try {
        req.session.destroy();
        res.send({ message: 'logged out successfully' });
    } catch (err) {
        res.status(500).send({ error: 'no signed in users' })
    }
}

async function getLoggedInUser(req, res) {
    try {
        if (req.session.user) {
            req.session.save();
            res.json(req.session.user);
        } else {
            res.json({});
        }
    } catch (err) {
        logger.error('no signedin user', err);
        res.status(500).send({ error: 'no signed in user' });
    }
}

module.exports = {
    login,
    signup,
    logout,
    getLoggedInUser
}