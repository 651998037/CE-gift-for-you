const { check } = require('express-validator');

exports.checkme = [
    check('name', "กรุณาระบุชื่อด้วย!").not().isEmpty(),
];

exports.media = [
    check('name', "กรุณาระบุชื่อด้วย!").not().isEmpty(),
];