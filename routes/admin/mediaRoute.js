const express=require('express');
const router=express.Router();
const mediaController=require('../../controllers/admin/media/mediaController');
const validator = require('../../controllers/admin/media/mediaValidator');

router.get('/media/list', mediaController.show);

router.get('/media/add', mediaController.add)
router.post('/media/add',/*validator.checkme,*/ mediaController.new);

router.get('/mediaEdit/:id',mediaController.edit);
router.post('/mediaEdit/:id',/*validator.media,*/mediaController.save);

router.get('/deletemedia/:id',mediaController.del);
router.post('/deletemedia/:id',mediaController.delete);

module.exports = router;
