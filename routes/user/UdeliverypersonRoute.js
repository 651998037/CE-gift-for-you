const express=require('express');
const router=express.Router();
const UdeliverypersonController = require('../../controllers/user/UdeliveryperosonController/UdeliverypersonController');
const validator = require('../../controllers/user/UdeliveryperosonController/UdeliverypersonValidator');

router.get('/Udeliveryperson/list', UdeliverypersonController.show);

router.get('/Udeliveryperson/add', UdeliverypersonController.add);
router.post('/Udeliveryperson/add', validator.checkedit, UdeliverypersonController.new);

router.get('/Udeliveryperson/edit/:id', UdeliverypersonController.edit); // เพิ่มพารามิเตอร์ :id เพื่อรับค่า id
router.post('/Udeliveryperson/save/:id', validator.checksave, UdeliverypersonController.save); // เพิ่มพารามิเตอร์ :id เพื่อรับค่า id

router.get('/Udeliveryperson/del/:id', UdeliverypersonController.delete); // เพิ่มพารามิเตอร์ :id เพื่อรับค่า id
router.post('/Udeliveryperson/del/:id', UdeliverypersonController.delete39); // เพิ่มพารามิเตอร์ :id เพื่อรับค่า id


module.exports = router;
