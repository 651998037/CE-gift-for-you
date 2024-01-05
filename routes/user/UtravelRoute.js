const express=require('express');
const router=express.Router();
const UtravelController=require('../../controllers/user/Utravel/UtravelController');
const validator = require('../../controllers/user/Utravel/UtravelValidator');

router.get('/Utravel/list', UtravelController.show);

router.get('/Utravel/add', UtravelController.add)
router.post('/Utravel/add',validator.checkme, UtravelController.new);

router.get('/Utravel/edit/:id',UtravelController.edit);
router.post('/Utravel/edit/:id',validator.Utravel,UtravelController.save);

router.get('/Utravel/delete/:id',UtravelController.del);
router.post('/Utravel/delete/:id',UtravelController.delete);

module.exports = router;