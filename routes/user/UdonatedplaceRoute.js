const express=require('express');
const router=express.Router();
const UdonatedplaceController=require('../../controllers/user/UdonateplaceController/UdonateplaceController');
const validator = require('../../controllers/user/UdonateplaceController/UdonateplaceValidator');
// const isAuthenticated = require('../controllers/isAuthenticated');

router.get('/Udonateplace/list',UdonatedplaceController.show);

router.get('/Udonateplace/add', UdonatedplaceController.add);
router.post('/Udonateplace/add', validator.Udonatedplace, UdonatedplaceController.new);

router.get('/Udonateplace/edit/:id', UdonatedplaceController.edit);

router.post('/Udonateplace/edit/:id', validator.save, UdonatedplaceController.save);


router.get('/Udonateplace/delete/:id', UdonatedplaceController.delete);
router.post('/Udonateplace/delete/:id',UdonatedplaceController.delete00);

// router.get('/Udonatedplace/list', isAuthenticated, UdonatedplaceController.list);
// router.get('/Udonatedplace/show', isAuthenticated, UdonatedplaceController.show);

module.exports = router;