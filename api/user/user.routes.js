const express = require('express');
const { requireAuth } = require('../../middlewares/requireAuth.middleware');
const { getCollaborator, getUsers, getUserCollaborators } = require('./user.controller');
const router = express.Router();

router.use(requireAuth);

router.get('/', getUsers);
router.post('/collaborators', getUserCollaborators);
router.post('/collaborator', getCollaborator);

module.exports = router;