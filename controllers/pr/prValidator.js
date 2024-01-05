const { check } = require('express-validator');

exports.checkpr = [
    check('ads',"โฆษณาไม่ถูกต้อง!").isInt(),
    check('media',"สื่อไม่ถูกต้อง!").isInt(),
    check('person',"บุคคลไม่ถูกต้อง!").isInt(),
    check('start',"วันที่ไม่ถูกต้อง!").isDate()
];
exports.pr = [
    check('ads',"โฆษณาไม่ถูกต้อง!").isInt(),
    check('media',"สื่อไม่ถูกต้อง!").isInt(),
    check('person',"บุคคลไม่ถูกต้อง!").isInt(),
    check('start',"วันที่ไม่ถูกต้อง!").isDate()
];