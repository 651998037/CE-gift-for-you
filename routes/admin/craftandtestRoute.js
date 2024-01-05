const express=require('express');
const router=express.Router();
const craftandtestController=require('../../controllers/admin/craftandtest/craftandtestController');
const validator = require('../../controllers/admin/craftandtest/craftandtestValidator');

router.get('/craftandtest/list', craftandtestController.show);

router.get('/craftandtest/add', craftandtestController.add)
router.post('/craftandtest/add',validator.checkme, craftandtestController.new);

router.get('/craftandtestEdit/:id',craftandtestController.edit);
router.post('/craftandtestEdit/:id',validator.craftandtest,craftandtestController.save);

router.get('/deletecraftandtest/:id',craftandtestController.delete);
router.post('/deletecraftandtest/:id',craftandtestController.delete1);

module.exports = router;