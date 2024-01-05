const express=require('express');
const router=express.Router();
const UchecklistController=require('../../controllers/user/UchecklistController/UchecklistController');
const validator = require('../../controllers/user/UchecklistController/UchecklistValidator');




router.get('/Uchecklist/list',UchecklistController.show);

router.get('/Uchecklist/add', UchecklistController.add);
router.post('/Uchecklist/add', validator.Uchecklist, UchecklistController.new);

router.get('/Uchecklist/edit/:id', UchecklistController.edit);
router.post('/Uchecklist/edit/:id',validator.save, UchecklistController.save);


router.get('/Uchecklist/delete/:id', UchecklistController.delete);
router.post('/Uchecklist/delete/:id',UchecklistController.delete00);







module.exports = router;