const { check } = require('express-validator');

exports.Ucraftandtest = [
    check('withdraw', "เบิกไม่ถูกต้อง!").not().isEmpty(),
    check('status', "สถานะไม่ถูกต้อง!").not().isEmpty().trim(),
    check('completiondate', "วันที่ไม่ถูกต้อง!").not().isEmpty().trim(),
];



