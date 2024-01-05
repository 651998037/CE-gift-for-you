const express=require('express');
const router=express.Router();
const travelController=require('../../controllers/admin/travel/travelController');
const validator = require('../../controllers/admin/travel/travelValidator');

router.get('/travel/list', travelController.show);

router.get('/travel/add', travelController.add)
router.post('/travel/add',/*validator.checkme,*/ travelController.new);

router.get('/travel/edit/:id',travelController.edit);
router.post('/travel/edit/:id',/*validator.travel,*/travelController.save);

router.get('/travel/delete/:id',travelController.del);
router.post('/travel/delete/:id',travelController.delete);

module.exports = router;