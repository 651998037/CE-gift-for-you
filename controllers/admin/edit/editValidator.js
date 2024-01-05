const { check } = require('express-validator');

exports.edit = [
    check('editor', "editor ชื่อไม่ถูกต้อง!").not().isEmpty(),
    check('report', "report ไม่ถูกต้อง!").not().isEmpty(),
    check('carryout', "ดำเนินการไม่ถูกต้อง!").not().isEmpty(),
    check('carryoutday', "วันไม่ถูกต้อง!").not().isEmpty(),
];


