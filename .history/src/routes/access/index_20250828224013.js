'use strict'

const express = require('express');
const accessController = require('../../controllers/access.controller')
const router = express.Router();

router.post('/shop')
router.use('v1/access', require('./access'))

