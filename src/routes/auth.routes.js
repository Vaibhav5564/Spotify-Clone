const express = require('express');
const authContoller = require('../controllers/auth.controller.js')
const router = express.Router();

router.post('/register', authContoller.registerUser)
router.post('/login', authContoller.loginUser)

module.exports = router;