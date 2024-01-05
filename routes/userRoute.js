const express = require('express');
const router = express.Router();
const login=require('../controllers/login/userController');
//const validator = require('../controllers/validator');


router.get('/', login.login);
router.get('/login', login.login);
router.post('/login',/* validator.login,*/login.loginPost);

router.get('/logout', login.logout);

module.exports = router;