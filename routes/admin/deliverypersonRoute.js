const express=require('express');
const router=express.Router();
const deliverypersonController=require('../../controllers/admin/deliveryperson/deliverypersonController');
const validator = require('../../controllers/admin/deliveryperson/deliverypersonValidator');
router.get('/deliveryperson/list', deliverypersonController.show);

router.get('/deliveryperson/add', deliverypersonController.add);
router.post('/deliveryperson/add', validator.checkedit, deliverypersonController.new);

router.get('/deliveryperson/edit/:id', deliverypersonController.edit); // เพิ่มพารามิเตอร์ :id เพื่อรับค่า id
router.post('/deliveryperson/save/:id', validator.checksave, deliverypersonController.save); // เพิ่มพารามิเตอร์ :id เพื่อรับค่า id

router.get('/deliveryperson/del/:id', deliverypersonController.delete); // เพิ่มพารามิเตอร์ :id เพื่อรับค่า id
router.post('/deliveryperson/del/:id', deliverypersonController.delete39); // เพิ่มพารามิเตอร์ :id เพื่อรับค่า id


module.exports = router;
