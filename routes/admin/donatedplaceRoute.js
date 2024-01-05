const express=require('express');
const router=express.Router();
const donatedplaceController=require('../../controllers/admin/donateplaceController/donatedplaceController');
const validator = require('../../controllers/admin/donateplaceController/donatedplaceValidator');



router.get('/donateplace/list',donatedplaceController.show);

router.get('/donateplace/add', donatedplaceController.add);
router.post('/donateplace/add', validator.donatedplace, donatedplaceController.new);

router.get('/donateplace/edit/:id', donatedplaceController.edit);

router.post('/donateplace/edit/:id', validator.save, donatedplaceController.save);

router.get('/donateplace/delete/:id', donatedplaceController.delete);
router.post('/donateplace/delete/:id',donatedplaceController.delete00);





module.exports = router;