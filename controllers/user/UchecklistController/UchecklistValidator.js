const { check } = require('express-validator');

exports.Uchecklist = [
    check('devicetype', "ประเภทอุปกรณ์ไม่ถูกต้อง!").not().isEmpty(),
    check('name', "ชื่อไม่ถูกต้อง!").not().isEmpty().trim(),
    check('amount', "จำนวนไม่ถูกต้อง!").not().isEmpty().trim(),
    check('checkday', "วันที่ไม่ถูกต้อง!").not().isEmpty(),
    check('status', "สถานะไม่ถูกต้อง!").not().isEmpty().trim(),
    
];

exports.save = [
    check('devicetype', "ประเภทอุปกรณ์ไม่ถูกต้อง!").not().isEmpty(),
    check('name', "ชื่อไม่ถูกต้อง!").not().isEmpty().trim(),
    check('amount', "จำนวนไม่ถูกต้อง!").not().isEmpty().trim(),
    check('checkday', "วันที่ไม่ถูกต้อง!").not().isEmpty(),
    check('status', "สถานะไม่ถูกต้อง!").not().isEmpty().trim(),
    
];


