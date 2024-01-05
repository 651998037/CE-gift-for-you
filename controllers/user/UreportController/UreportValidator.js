const { check } = require('express-validator');

exports.cra= [
    check('type', "โปรดระบุ ประเภท!").isInt(),
    check('brandModel', "โปรดระบุ ยี่ห้อ/รุ่น!").not().isEmpty(),
    check('problem', "โปรดระบุ ปัญหา!").not().isEmpty(),
    check('reportday', "โปรดระบุ วันรายงาน!").isDate(),
    check('reportrecipient', "โปรดระบุ คนรับรายงาน!").not().isEmpty(),
    check('place', "โปรดระบุ สถานที่!").isInt(),
    check('person', "โปรดระบุ บุคคล!").isInt(),
    check('phone', "โปรดระบุ เบอร์โทร!").not().isEmpty()
];

exports.crs= [
    check('type', "โปรดระบุ ประเภท!").isInt(),
    check('brandModel', "โปรดระบุ ยี่ห้อ/รุ่น!").not().isEmpty(),
    check('problem', "โปรดระบุ ปัญหา!").not().isEmpty(),
    check('reportday', "โปรดระบุ วันรายงาน!").isDate(),
    check('reportrecipient', "โปรดระบุ คนรับรายงาน!").not().isEmpty(),
    check('place', "โปรดระบุ สถานที่!").isInt(),
    check('person', "โปรดระบุ บุคคล!").isInt(),
    check('phone', "โปรดระบุ เบอร์โทร!").not().isEmpty()
];


