const express = require('express');
const router = express.Router();
const UeditController = require('../../controllers/user/UeditController/UeditController');
const validator = require('../../controllers/user/UeditController/UeditValidator');

router.get('/Uedit/list', UeditController.show);

router.get('/Uedit/add', UeditController.add);
router.post('/Uedit/add', validator.checksave, UeditController.new);

router.get('/Uedit/edit/:id', UeditController.edit);
router.post('/Uedit/save/:id', validator.checkedit, UeditController.save);

router.get('/Uedit/del/:id', UeditController.delete);
router.post('/Uedit/del/:id', UeditController.delete1);

module.exports = router;
