const { check } = require('express-validator');

exports.checkwithdraw = [
    check('picker', "กรุณาระบุชื่อคนเบิก").isInt(),
    check('approvalperson', "คนอนุมัติ").isInt(),
    check('withdrawday', "กรุณาระบุวันที่").isDate(),
    check('donatedplace', "สถานที่บริจาค").isInt()
]; 
exports.save = [
    check('picker', "กรุณาระบุชื่อคนเบิก").isInt(),
    check('approvalperson', "คนอนุมัติ").isInt(),
    check('withdrawday', "กรุณาระบุวันที่").isDate(),
    check('donatedplace', "สถานที่บริจาค").isInt()
];  