const express=require('express');
const router=express.Router();
const personController=require('../../controllers/admin/person/personController');
const validator = require('../../controllers/admin/person/personValidator');

router.get('/person/list',personController.show);

router.get('/person/add', personController.add);
router.post('/person/add', /*validator.cda,*/ personController.new);

router.get('/person/edit/:id', personController.edit);
router.post('/person/edit/:id',/* validator.cds,*/ personController.save);


router.get('/person/delete/:id', personController.del);
router.post('/person/delete/:id',personController.delete);

module.exports = router;