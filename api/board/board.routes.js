const express = require('express');
// const { requireAuth } = require('../../middlewares/requireAuth.middleware');
const { getBoards, getBoard, addBoard, updateBoard, deleteBoard } = require('./board.controller');
const router = express.Router();

// router.use(requireAuth);

router.get('/', getBoards);
router.get('/:id', getBoard);
router.post('/', addBoard);
router.put('/:id', updateBoard);
router.delete('/:id', deleteBoard);

module.exports = router;