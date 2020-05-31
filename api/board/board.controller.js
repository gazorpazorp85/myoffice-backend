const logger = require('../../services/logger.service');
const BoardService = require('./board.service');

async function getBoards(req, res) {

    // const userId = req.query.id;

    try {
        const boards = await BoardService.query();
        // const boards = await BoardService.query(userId);
        res.send(boards);
    } catch (err) {
        logger.error('Can\'t get boards', err);
        res.status(500).send({ error: 'Can\'t get boards' });
    }
}

async function getBoard(req, res) {
    const id = req.params.id;

    try {
        const board = await BoardService.getById(id);
        res.send(board);
    } catch (err) {
        logger.error('Can\'t get board', err);
        res.status(500).send({ error: 'Can\'t get board' });
    }
}

async function addBoard(req, res) {

    try {
        const board = await BoardService.add(req.body);
        res.send(board);
    } catch (err) {
        logger.error('Can\'t create board', err);
        res.status(500).send({ error: 'Can\'t create board' });
    }
}

async function deleteBoard(req, res) {

    const id = req.params.id;

    try {
        await BoardService.remove(id);
        res.end()
    } catch (err) {
        logger.error('Can\'t delete board');
        res.status(500).send({ error: 'Can\'t delete board' });
    }
}

async function updateBoard(req, res) {

    const id = req.params.id;

    try {
        const board = await BoardService.update(id, req.body);
        console.log(board);
        res.send(board);
    } catch (err) {
        logger.error('Can\'t update board');
        res.status(500).send({ error: 'Can\'t update board' });
    }

}

module.exports = {
    getBoards,
    getBoard,
    addBoard,
    deleteBoard,
    updateBoard
}