const express=require('express');
const router=express.Router();
const withdrawlistController=require('../../controllers/admin/withdrawlist/withdrawlistController');
const validator = require('../../controllers/admin/withdrawlist/withdrawlistValidator');

router.get('/withdrawlist/list',withdrawlistController.show);

router.get('/withdrawlist/add', withdrawlistController.add)
router.post('/withdrawlist/add',validator.add, withdrawlistController.new)

router.get('/withdrawlist/edit/:id',withdrawlistController.edit);
router.post('/withdrawlist/edit/:id',validator.update,withdrawlistController.update);

router.get('/withdrawlist/delete/:id',withdrawlistController.delete); 
router.post('/withdrawlist/delete/:id',withdrawlistController.delete1);

module.exports = router;