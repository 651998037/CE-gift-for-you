const { check } = require('express-validator');

exports.add = [
    check('devicetype', "กรุณาระบุประเภทด้วย").isInt(),
    check('donationlist', "กรุณาระบุรุ่น/ยี่ห้อด้วย").isInt(),
    check('amount', "กรุณาระบุจำนวนด้วย").not().isEmpty(),
    check('person', "กรุณาระบุคนนำเข้าด้วย").isInt(),
    check('date', "กรุณาระบุวันที่ด้วย").not().isEmpty(),
    check('remainamount', "กรุณาระบุคงเหลือด้วย").not().isEmpty(),
];

exports.update = [
    check('devicetype', "กรุณาระบุประเภทด้วย").isInt(),
    check('donationlist', "กรุณาระบุรุ่น/ยี่ห้อด้วย").isInt(),
    check('amount', "กรุณาระบุจำนวนด้วย").not().isEmpty(),
    check('person', "กรุณาระบุคนนำเข้าด้วย").isInt(),
    check('date', "กรุณาระบุวันที่ด้วย").not().isEmpty(),
    check('remainamount', "กรุณาระบุคงเหลือด้วย").not().isEmpty(),
];