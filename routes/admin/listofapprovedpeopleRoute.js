const express=require('express');
const router=express.Router();
const listofapprovedpeopleController=require('../../controllers/admin/listofapprovedpeople/listofapprovedpeopleController');
const validator = require('../../controllers/admin/listofapprovedpeople/listofapprovedpeopleValidator');

router.get('/listofapprovedpeople/list', listofapprovedpeopleController.show);

router.get('/listofapprovedpeople/add', listofapprovedpeopleController.add);
router.post('/listofapprovedpeople/add', validator.listofapprovedpeople, listofapprovedpeopleController.new);

router.get('/listofapprovedpeople/edit/:id', listofapprovedpeopleController.edit);
router.post('/listofapprovedpeople/edit/:id', validator.listofapprovedpeople, listofapprovedpeopleController.save);

router.get('/listofapprovedpeople/delete/:id', listofapprovedpeopleController.delete);
router.post('/listofapprovedpeople/delete/:id', listofapprovedpeopleController.delete1);

module.exports = router;