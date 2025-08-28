'use strict'

const express = require('express');
const accessController = require('../../controllers/access.controller')
const router = express.Router();

router.post('/shop/signup', accessController)
re
// router.use('v1/access', require('./access'))
module.exports = router;
