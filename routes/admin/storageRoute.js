const express=require('express');
const router=express.Router();
const storageController=require('../../controllers/admin/storage/storageController');
const validator = require('../../controllers/admin/storage/storageValidator');



router.get('/storage/list',storageController.show);

router.get('/storage/add', storageController.add);
router.post('/storage/add', /*validator.storage,*/ storageController.new);

router.get('/storage/edit/:id', storageController.edit);
router.post('/storage/edit/:id',/* validator.save,*/ storageController.save);

router.get('/storage/delete/:id', storageController.delete);
router.post('/storage/delete/:id',storageController.delete00);

module.exports = router;