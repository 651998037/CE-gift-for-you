const controller ={};
const { validationResult } = require('express-validator');

controller.show = (req, res) => {
    if (typeof req.session.userid == 'undefined') { res.redirect('/');}else{
        req.getConnection((err, conn) => {
            conn.query('SELECT * FROM donateplace', (err, allDonatePlaces) => {
                if (err) {
                    res.status(500).json(err);
                    return;
                }
                // // กรองข้อมูลเฉพาะสถานที่บริจาคของผู้ใช้ที่เข้าสู่ระบบ
                // const userDonatePlaces = allDonatePlaces.filter(place => place.userid === req.session.userid);
                res.render('./admin/donateplaceView/donateplaceList', {
                    data: allDonatePlaces,
                    session: req.session
                });
            });
        });
    };
};

controller.add = (req, res) => {
    if (typeof req.session.userid == 'undefined') { res.redirect('/');}else{
        res.render('./admin/donateplaceView/donateplaceAdd', {
            session: req.session,
            data: {} // สร้างตัวแปร data เปล่าเพื่อให้ไม่เกิดข้อผิดพลาด data is not defined
        });
    };
};

controller.new = (req, res) => {
    if (typeof req.session.userid == 'undefined') { res.redirect('/');}else{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            req.session.errors=errors;
            req.session.success =false;
            return  res.redirect('/donateplace/add')
        }else{
            req.session.success=true;
            req.session.topic="เพิ่มข้อมูลสำเร็จ!";
            const data = req.body; 
            req.getConnection((err, conn) => {
            conn.query('INSERT INTO donateplace SET ?', [data], (err, donateplace) => {
                if (err) {
                    res.json(err);
                }
                res.redirect('/donateplace/list');
            });
        });
    };
}};

controller.delete = (req, res) => {
    if (typeof req.session.userid == 'undefined') { res.redirect('/');}else{
        const data = req.body.data;
        res.render('./admin/donateplaceView/donateplaceDel', {
            data: data,session: req.session
        });
    };
};

controller.delete00 = (req, res) => {
    if (typeof req.session.userid == 'undefined') { res.redirect('/');}else{
        const idToDelete = req.params.id; // รับค่า id จากพารามิเตอร์ของ URL
        req.session.success = true;
        req.session.topic = "ลบข้อมูลสำเร็จ!";
        req.getConnection((err, conn) => {
            conn.query('DELETE FROM donateplace WHERE id = ?', [idToDelete], (err, donateplace) => {
                res.redirect('/donateplace/list');
            });
        });
    };
};




controller.edit = (req, res) => {
    if (typeof req.session.userid == 'undefined') { res.redirect('/');}else{
        const idToEdit = req.params.id;
        req.getConnection((err, conn) => {
            conn.query('SELECT * FROM donateplace WHERE id = ?', [idToEdit], (err, data) => {
                if (err) {
                    return res.status(500).json(err);
                }
                res.render('./admin/donateplaceview/donateplaceEdit', { data: data[0],session:req.session });
            });
        });
    };
};

controller.save = (req, res) => {
    if (typeof req.session.userid == 'undefined') { res.redirect('/');}else{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            req.session.errors=errors;
            req.session.success =false;
            return  res.redirect('/donateplace/save/'+ req.params.id)
        }else{
            req.session.success=true;
            req.session.topic="แก้ไขข้อมูลสำเร็จ!";
            const idToEdit = req.params.id;
            const updatedData = {
            place: req.body.place,
            address: req.body.address,
            contactperson: req.body.contactperson,
            phone: req.body.phone,
            

        };
        req.getConnection((err, conn) => {
            conn.query('UPDATE donateplace SET ? WHERE id = ?', [updatedData, idToEdit], (err, result) => {
                if (err) {
                    return res.status(500).json(err);
                }
                res.redirect('/donateplace/list'); 
            });
        });
    };
}};

module.exports=controller;