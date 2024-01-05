const { check } = require('express-validator');
exports.storage = [
    check('name', "โปรดระบุชื่ออุปกรณ์!").not().isEmpty(),
    check('room', "โปรดระบุห้อง!").isInt(),
];

exports.save = [
    check('name', "โปรดระบุชื่ออุปกรณ์!").not().isEmpty(),
    check('room', "โปรดระบุห้อง!").isInt(),
];
