const express=require('express');
const router=express.Router();
const UadsController=require('../../controllers/user/Uads/UadsController');
const validator = require('../../controllers/user/Uads/UadsValidator');

router.get('/Uads/list', UadsController.show);

router.get('/Uads/add', UadsController.add)
router.post('/Uads/add',validator.checkme, UadsController.new);

router.get('/Uads/edit/:id',UadsController.edit);
router.post('/Uads/edit/:id',validator.ads,UadsController.save);

router.get('/Uads/delete/:id',UadsController.del);
router.post('/Uads/delete/:id',UadsController.delete);

module.exports = router;