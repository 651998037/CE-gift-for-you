const express=require('express');
const router=express.Router();
const UroomController=require('../../controllers/user/Uroom/UroomController');
const Validator = require('../../controllers/user/Uroom/UroomValidator');

router.get('/Uroom/list', UroomController.show);

router.get('/Uroom/add', UroomController.add);
router.post('/Uroom/add', Validator.room, UroomController.new);

router.get('/Uroom/edit/:id', UroomController.edit);
router.post('/Uroom/edit/:id', Validator.edit, UroomController.save);

router.get('/Uroom/delete/:id', UroomController.del);
router.post('/Uroom/delete/:id', UroomController.delete);

module.exports = router;