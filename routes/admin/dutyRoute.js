const express=require('express');
const router=express.Router();
const dutyController=require('../../controllers/admin/duty/dutyController');
const validator = require('../../controllers/admin/duty/dutyValidator');

router.get('/duty/list', dutyController.show);

router.get('/duty/add', dutyController.add)
router.post('/duty/add',/*validator.checkdu,*/ dutyController.new);

router.get('/dutyEdit/:id',dutyController.edit);
router.post('/dutyEdit/:id',/*validator.duty,*/dutyController.save);

router.get('/deleteduty/:id',dutyController.del);
router.post('/deleteduty/:id',dutyController.delete);

module.exports = router;
