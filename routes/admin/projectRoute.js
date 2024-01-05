const express = require('express');
const router = express.Router();
const projectController = require('../../controllers/admin/project/projectController');
const projectValidator = require('../../controllers/admin/project/projectValidator');


router.get('/project/list', projectController.show);

router.get('/project/add', projectController.add);
router.post('/project/add', /*projectValidator.add,*/ projectController.new);

router.get('/project/edit/:id', projectController.edit);
router.post('/project/edit/:id', /*projectValidator.save,*/ projectController.save);

router.get('/project/delete/:id', projectController.del);
router.post('/project/delete/:id', projectController.delete);

module.exports = router;
