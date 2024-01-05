const { check } = require('express-validator');

exports.add = [
    check('projectname', "ชื่อโครงการไม่ถูกต้อง!").notEmpty(),
];

exports.save = [
    check('projectname', "ชื่อโครงการไม่ถูกต้อง!").notEmpty(),
];