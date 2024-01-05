const { check } = require('express-validator');

exports.checkme = [
    check('travel', "กรุณาระบุชื่อด้วย!").not().isEmpty(),
];

exports.Utravel = [
    check('travel', "กรุณาระบุชื่อด้วย!").not().isEmpty(),
];