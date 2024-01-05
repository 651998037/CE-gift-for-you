const express = require('express');
const router = express.Router();
const prController = require('../controllers/pr/prController');
const prValidator = require('../controllers/pr/prValidator');

router.get('/pr', prController.show);

router.get('/pr/new', prController.add);
router.post('/pr/add', prValidator.checkpr,prController.new);

router.get('/pr/update/:id', prController.edit);
router.post('/pr/update/:id', prValidator.pr,prController.save);

router.get('/pr/delete/:id', prController.del);
router.post('/pr/delete/:id', prController.delete);

module.exports=router;