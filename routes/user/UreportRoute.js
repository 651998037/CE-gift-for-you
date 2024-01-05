const express=require('express');
const router=express.Router();
const UreportController=require('../../controllers/user/UreportController/UreportController');
const validator = require('../../controllers/user/UreportController/UreportValidator');

router.get('/Ureport/list',UreportController.show);

router.get('/Ureport/add', UreportController.add);
router.post('/Ureport/add', validator.cra, UreportController.new);

router.get('/Ureport/edit/:id', UreportController.edit);
router.post('/Ureport/edit/:id', validator.crs, UreportController.save);


router.get('/Ureport/delete/:id', UreportController.delete);
router.post('/Ureport/delete/:id',UreportController.delete00);

module.exports = router;