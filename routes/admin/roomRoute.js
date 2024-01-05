const express=require('express');
const router=express.Router();
const roomController=require('../../controllers/admin/room/roomController');
const Validator = require('../../controllers/admin/room/roomValidator');

router.get('/room/list', roomController.show);

router.get('/room/add', roomController.add);
router.post('/room/add', Validator.room, roomController.new);

router.get('/room/edit/:id', roomController.edit);
router.post('/room/edit/:id', Validator.edit, roomController.save);

router.get('/room/delete/:id', roomController.del);
router.post('/room/delete/:id', roomController.delete);

module.exports = router;