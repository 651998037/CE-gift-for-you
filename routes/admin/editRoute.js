const express=require('express');
const router=express.Router();

const editController=require('../../controllers/admin/edit/editController');
const editValidator = require('../../controllers/admin/edit/editValidator');

router.get('/edit/list',editController.show);
router.get('/edit/add', editController.add);
router.post('/edit/add', editValidator.edit, editController.new);
router.get('/edit/edit/:id', editController.edit);
router.post('/edit/edit/:id', editValidator.edit, editController.save);
router.get('/edit/delete/:id', editController.delete);
router.post('/edit/delete/:id',editController.delete00);

module.exports = router;