const express = require('express');
const { getUsers, getUserCollaborators } = require('./user.controller');
const router = express.Router();

router.get('/', getUsers);
router.post('/', getUserCollaborators);

module.exports = router;