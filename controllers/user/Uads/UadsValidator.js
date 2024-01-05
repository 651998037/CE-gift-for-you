const { check } = require('express-validator');

exports.checkme = [
    check('name', "กรุณาระบุชื่อด้วย!").not().isEmpty(),
];

exports.ads = [
    check('name', "กรุณาระบุชื่อด้วย!").not().isEmpty(),
];