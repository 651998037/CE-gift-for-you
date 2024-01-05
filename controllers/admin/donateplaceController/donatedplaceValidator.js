const { check } = require('express-validator');

exports.donatedplace = [
    check('place', "ชื่อสถานที่ไม่ถูกต้อง!").not().isEmpty().trim(),
    check('address', "ที่อยู่ไม่ถูกต้อง!").not().isEmpty().trim(),
    check('contactperson', "คนที่ติดต่อไม่ถูกต้อง!").not().isEmpty().trim(),
    check('phone', "เบอร์ไม่ถูกต้อง!").isInt().isLength({ min: 10, max: 10 }).withMessage("เบอร์โทรศัพท์ต้องมี 10 หลัก"),
    
];

exports.save = [
    check('place', "ชื่อสถานที่ไม่ถูกต้อง!").not().isEmpty().trim(),
    check('address', "ที่อยู่ไม่ถูกต้อง!").not().isEmpty().trim(),
    check('contactperson', "คนที่ติดต่อไม่ถูกต้อง!").not().isEmpty().trim(),
    check('phone', "เบอร์ไม่ถูกต้อง!").isInt().isLength({ min: 10, max: 10 }).withMessage("เบอร์โทรศัพท์ต้องมี 10 หลัก"),
];


