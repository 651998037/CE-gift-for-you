const { check } = require('express-validator');

exports.devicetype = [
    check('name', "โปรดระบุ ชื่ออุปกรณ์!").notEmpty()
];

exports.save = [
    check('name', "โปรดระบุ ชื่ออุปกรณ์!").notEmpty()
];