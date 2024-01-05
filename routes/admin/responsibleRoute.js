const express = require('express');
const router = express.Router();
const responsibleController = require('../../controllers/admin/responsible/responsibleController');
const responsibleValidator = require('../../controllers/admin/responsible/responsibleValidator');

router.get('/responsible/list', responsibleController.show);

router.get('/responsible/new', responsibleController.add);
router.post('/responsible/add', /*responsibleValidator.checkresponsible,*/responsibleController.new);

router.get('/responsible/edit/:id', responsibleController.edit);
router.post('/responsible/update/:id', /*responsibleValidator.responsible,*/responsibleController.save);

router.get('/responsible/delete/:id', responsibleController.del);
router.post('/responsible/delete/:id', responsibleController.delete);

module.exports=router;