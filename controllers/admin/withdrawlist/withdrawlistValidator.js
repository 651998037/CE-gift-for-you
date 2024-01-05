const { check } = require('express-validator');

exports.add = [
    check('stocklist',"กรุณาระบุประเภทด้วย").isInt(),
    check('brand',"กรุณาระบุรุ่น/ยี่ห้อด้วย").isInt(),
    check('amount',"กรุณาระบุจำนวนด้วย").not().isEmpty(),
    check('withdraw',"กรุณาระบุคนเบิกด้วย").isInt(),
    check('approve',"กรุณาระบุคนอนุมัติด้วย").isInt(),
    check('date',"กรุณาระบุวันที่เบิกด้วย").not().isEmpty()
];

exports.update = [
    check('stocklist',"กรุณาระบุประเภทด้วย").isInt(),
    check('brand',"กรุณาระบุรุ่น/ยี่ห้อด้วย").isInt(),
    check('amount',"กรุณาระบุจำนวนด้วย").not().isEmpty(),
    check('withdraw',"กรุณาระบุคนเบิกด้วย").isInt(),
    check('approve',"กรุณาระบุคนอนุมัติด้วย").isInt(),
    check('date',"กรุณาระบุวันที่เบิกด้วย").not().isEmpty()
];