const logger = require('../../services/logger.service');
const RequestService = require('./request.service');

async function getRequests(req, res) {

    const { id } = req.params;

    try {
        const requests = await RequestService.query(id);
        res.send(requests);
    } catch (err) {
        logger.error('Can\'t get requests', err);
        res.status(500).send({ error: 'Can\'t get requests' });
    }
}

async function sendRequest(req, res) {
    try {
        const request = await RequestService.add(req.body);
        res.send(request);
    } catch (err) {
        logger.error('Can\'t send request', err);
        res.status(500).send({ error: 'Can\'t send request' });
    }
}

module.exports = {
    getRequests,
    sendRequest
}