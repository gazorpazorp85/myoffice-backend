const express = require('express');
const { requireAuth } = require('../../middlewares/requireAuth.middleware');

const { getRequests, sendRequest } = require('./request.controller');

const router = express.Router();

router.use(requireAuth);

router.get('/:id', getRequests);
router.post('/', sendRequest);

module.exports = router;