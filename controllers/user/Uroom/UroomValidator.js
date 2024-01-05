const { check } = require('express-validator');

exports.room = [
    check('roomname', "กรุณาระบุชื่อด้วย!").not().isEmpty(),
];

exports.edit = [
    check('roomname', "กรุณาระบุชื่อด้วย!").not().isEmpty(),
];