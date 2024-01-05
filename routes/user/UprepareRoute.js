
const express = require('express');
const router = express.Router();


const UprepareController = require('../../controllers/user/UprepareController/UprepareController');
const Validator = require('../../controllers/user/UprepareController/UprepareValidator');


router.get('/Uprepare/list', UprepareController.show);


router.get('/Uprepare/add', UprepareController.add);
router.post('/Uprepare/add', Validator.add,UprepareController.new);
router.get('/Uprepare/edit/:id', UprepareController.edit);
router.post('/Uprepare/edit/:id', Validator.save, UprepareController.save);
router.get('/Uprepare/delete/:id', UprepareController.delete);
router.post('/Uprepare/delete/:id', UprepareController.delete1);


module.exports = router;
