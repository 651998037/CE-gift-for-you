const { check } = require('express-validator');


exports.add = [
    check('donationplace', "กรุณาระบุ ชื่อสถานที่!").isInt(),
    check('travel', "กรุณาระบุ การเดินทาง!").isInt(),
    check('donationday', "กรุณาระบุ วันที่!").not().isEmpty(),
];

exports.save = [
    check('donationplace', "ชื่อสถานที่ไม่ถูกต้อง!").isInt(),
    check('travel', "การเดินทางไม่ถูกต้อง!").isInt(),
    check('donationday', "วันที่ไม่ถูกต้อง!").not().isEmpty(),
];


