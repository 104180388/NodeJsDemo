'use strict'

const express = require('express');
const router = express.Router();

const {apiKey} = require('../auth/checkAuth')

router.use(apiKey)

router.use('/v1/api', require('./access'))
router.use('/v1/api/product', require('./product'))

module.exports = router;