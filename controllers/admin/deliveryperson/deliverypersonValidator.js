const { check } = require('express-validator');

exports.checksave = [
    check('prepare', 'ข้อมูลไม่ถูกต้อง!').isLength({ min: 1 }),
    check('name', 'ชื่อไม่ถูกต้อง!').isLength({ min: 1 }),
];

exports.checkedit = [
    check('prepare', 'ข้อมูลไม่ถูกต้อง!').isLength({ min: 1 }),
    check('name', 'ชื่อไม่ถูกต้อง!').isLength({ min: 1 }),
];
