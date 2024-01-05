const express=require('express');
const router=express.Router();
const adsController=require('../../controllers/admin/ads/adsController');
const validator = require('../../controllers/admin/ads/adsValidator');

router.get('/ads/list', adsController.show);

router.get('/ads/add', adsController.add)
router.post('/ads/add',/*validator.checkme,*/ adsController.new);

router.get('/ads/edit/:id',adsController.edit);
router.post('/ads/edit/:id',/*validator.ads,*/adsController.save);

router.get('/ads/delete/:id',adsController.del);
router.post('/ads/delete/:id',adsController.delete);

module.exports = router;