'use strict'

const express = require('express');
const accessController = require('../../controllers/access.controller');

const { authentication } = require('../../auth/authUtils');
const asyncHandler = require('../../helpers/asyncHandler');
const router = express.Router();

router.post('/shop/signup', asyncHandler(accessController.signUp))
// authen
router.use(authentication)
router.post('/shop/login', asyncHandler(accessController.login))
router.post('/shop/logout', asyncHandler(accessController.logout))
router.post('/shop/handlerRefeshToken', asyncHandler(accessController.handlerRefeshToken))
module.exports = router;
