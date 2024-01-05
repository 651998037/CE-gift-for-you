const express=require('express');
const router=express.Router();
const devicetypeController=require('../../controllers/admin/devicetype/devicetypeController');
const validator = require('../../controllers/admin/devicetype/devicetypeValidator');



router.get('/devicetype/list',devicetypeController.show);

router.get('/devicetype/add', devicetypeController.add);
router.post('/devicetype/add', validator.devicetype, devicetypeController.new);

router.get('/devicetype/edit/:id', devicetypeController.edit);
router.post('/devicetype/edit/:id', validator.save, devicetypeController.save);

router.get('/devicetype/delete/:id', devicetypeController.delete);
router.post('/devicetype/delete/:id',devicetypeController.delete00);

module.exports = router;