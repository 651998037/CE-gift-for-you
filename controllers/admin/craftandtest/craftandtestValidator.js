
const { check } = require('express-validator');
exports.checkme = [
    check('withdraw', "เบิกไม่ถูกต้อง!").not().isEmpty(),
    check('status', "สถานะไม่ถูกต้อง!").not().isEmpty(),
    check('completiondate', "วันที่ไม่ถูกต้อง!").isDate()
];


exports.craftandtest = [
    check('withdraw', "เบิกไม่ถูกต้อง!").not().isEmpty(),
    check('status', "สถานะไม่ถูกต้อง!").not().isEmpty(),
    check('completiondate', "วันที่ไม่ถูกต้อง!").not().isEmpty()
];
