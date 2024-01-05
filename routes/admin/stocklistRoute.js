const express=require('express');
const router=express.Router();
const stocklistController=require('../../controllers/admin/stocklist/stocklistController');
const validator = require('../../controllers/admin/stocklist/stocklistValidator');

router.get('/stocklist/list',stocklistController.show);

router.get('/stocklist/add',stocklistController.add);
router.post('/stocklist/add',validator.add,stocklistController.new);

router.get('/stocklist/edit/:id',stocklistController.edit);
router.post('/stocklist/edit/:id',validator.update,stocklistController.update);

router.get('/stocklist/delete/:id',stocklistController.delete); 
router.post('/stocklist/delete/:id',stocklistController.delete1);
module.exports = router;