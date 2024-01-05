const { check } = require('express-validator');

exports.listofapprovedpeople = [
    check('person', "ชื่อไม่ถูกต้อง!").not().isEmpty(),
];