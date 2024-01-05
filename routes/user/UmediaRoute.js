const express=require('express');
const router=express.Router();
const UmediaController=require('../../controllers/user/Umedia/UmediaController');
const validator = require('../../controllers/user/Umedia/UmediaValidator');

router.get('/Umedia/list', UmediaController.show);

router.get('/Umedia/add', UmediaController.add)
router.post('/Umedia/add',validator.checkme, UmediaController.new);

router.get('/UmediaEdit/:id',UmediaController.edit);
router.post('/UmediaEdit/:id',validator.media,UmediaController.save);

router.get('/Udeletemedia/:id',UmediaController.del);
router.post('/Udeletemedia/:id',UmediaController.delete);

module.exports = router;
