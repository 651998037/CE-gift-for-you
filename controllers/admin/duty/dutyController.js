const controller ={};
const { validationResult } = require('express-validator');

controller.show=(req,res) => {
    if (typeof req.session.userid == 'undefined') { res.redirect('/');}else{
        req.getConnection((err,conn) =>{
            conn.query('SELECT * FROM duty',(err,duty)=>{
                if(err){
                    res.status(500).json(err);
                    return;
                }
                res.render('./admin/dutyView/dutyList',{
                    data:duty,session:req.session
                });
            });
        });
    };
};

controller.add = (req, res) => {
    if (typeof req.session.userid == 'undefined') { res.redirect('/');}else{
        res.render('./admin/dutyView/dutyAdd',{
            session:req.session
        });
    };
};

controller.new = (req, res) => {
    if (typeof req.session.userid == 'undefined') { res.redirect('/');}else{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            req.session.errors=errors;
            req.session.success =false;
            return  res.redirect('/duty/add')
        }else{
            req.session.success=true;
            req.session.topic="เพิ่มข้อมูลสำเร็จ!";
            const data = req.body; 
            req.getConnection((err, conn) => {
            conn.query('INSERT INTO duty SET ?', [data], (err, duty) => {
                if (err) {
                    res.json(err);
                }
                res.redirect('/duty/list');
            });
        });
    };
}};

controller.del=(req, res) => {
    if (typeof req.session.userid == 'undefined') { res.redirect('/');}else{
        const data = req.body.data;
        res.render('./admin/dutyView/confirmDel',{
            data:data,session:req.session
        });
    };
};

controller.delete=(req,res) => {
    if (typeof req.session.userid == 'undefined') { res.redirect('/');}else{
        req.session.success=true;
        req.session.topic="ลบข้อมูลสำเร็จ!";
        const idToDelete = req.params.id;
        req.getConnection((err,conn) =>{
        conn.query('DELETE FROM duty WHERE id = ?', [idToDelete], (err,duty) => {
            res.redirect('/duty/list');
        });
        });
    };
};
controller.edit = (req, res) => {
    if (typeof req.session.userid == 'undefined') { res.redirect('/');}else{
    const idToEdit = req.params.id;
        req.getConnection((err, conn) => {
            conn.query('SELECT * FROM duty WHERE id = ?', [idToEdit], (err, data) => {
                if (err) {
                    return res.status(500).json(err);
                }
                res.render('./admin/dutyView/dutyEdit', { data: data[0],session:req.session });
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
            return  res.redirect('/dutyEdit/'+ req.params.id)
        }else{
            req.session.success=true;
            req.session.topic="แก้ไขข้อมูลสำเร็จ!";
            const idToEdit = req.params.id;
            const updatedData = {
            duty: req.body.duty,
        };
        req.getConnection((err, conn) => {
            conn.query('UPDATE duty SET ? WHERE id = ?', [updatedData, idToEdit], (err, result) => {
                if (err) {
                    return res.status(500).json(err);
                }
                res.redirect('/duty/list'); 
            });
        });
    };
}};

module.exports=controller;
