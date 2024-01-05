const { check } = require('express-validator');

exports.checksave = [
    check('name', 'ชื่อไม่ถูกต้อง!').not().isEmpty(),
    check('problem', 'รายละเอียดไม่ถูกต้อง!').not().isEmpty(),
    check('carryout', 'รายละเอียดไม่ถูกต้อง!').not().isEmpty(),
    check('carryoutday', 'วันที่ไม่ถูกต้อง!').isISO8601()
];

exports.checkedit = [
    check('name', 'ชื่อไม่ถูกต้อง!').not().isEmpty(),
    check('problem', 'รายละเอียดไม่ถูกต้อง!').not().isEmpty(),
    check('carryout', 'รายละเอียดไม่ถูกต้อง!').not().isEmpty(),
    check('carryoutday', 'วันที่ไม่ถูกต้อง!').isISO8601()
];
