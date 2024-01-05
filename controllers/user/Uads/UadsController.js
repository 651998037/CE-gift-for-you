const controller ={};
const { validationResult } = require('express-validator');

controller.show=(req,res) => {
    if (typeof req.session.userid == 'undefined') { res.redirect('/');}else{
        req.getConnection((err,conn) =>{
            conn.query('SELECT * FROM ads',(err,ads)=>{
                res.render('./user/adsView/adsList',{
                    data:ads,session:req.session
                });
            });
        });
    } 
};

controller.add = (req, res) => {
    if (typeof req.session.userid == 'undefined') { res.redirect('/');}else{
    res.render('./user/adsView/adsAdd',{
        session:req.session
    });
}};

controller.new = (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        req.session.errors=errors;
        req.session.success =false;
        return  res.redirect('/Uads/add')
    }else{
        req.session.success=true;
        req.session.topic="เพิ่มข้อมูลสำเร็จ!";
        const data = req.body; 
        req.getConnection((err, conn) => {
        conn.query('INSERT INTO ads SET ?', [data], (err, ads) => {
            if (err) {
                res.json(err);
            }
            res.redirect('/Uads/list');
        });
    });
}};

controller.del=(req, res) => {
    const data = req.body.data;
    res.render('./user/adsView/confirmDel',{
        data:data,session:req.session
    });
};

controller.delete=(req,res) => {
        req.session.success=true;
        req.session.topic="ลบข้อมูลสำเร็จ!";
        const idToDelete = req.params.id;
        req.getConnection((err,conn) =>{
        conn.query('DELETE FROM ads WHERE id = ?', [idToDelete], (err,ads) => {
            res.redirect('/Uads/list');
            });
        });
    };

controller.edit = (req, res) => {
    const idToEdit = req.params.id;
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM ads WHERE id = ?', [idToEdit], (err, data) => {
            if (err) {
                return res.status(500).json(err);
            }
            res.render('./user/adsView/adsEdit', { data: data[0],session:req.session });
        });
    });
};

controller.save = (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        req.session.errors=errors;
        req.session.success =false;
        return  res.redirect('/UadsEdit/'+ req.params.id)
    }else{
        req.session.success=true;
        req.session.topic="แก้ไขข้อมูลสำเร็จ!";
        const idToEdit = req.params.id;
        const updatedData = {
        name: req.body.name,
    };
    req.getConnection((err, conn) => {
        conn.query('UPDATE ads SET ? WHERE id = ?', [updatedData, idToEdit], (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }
            res.redirect('/Uads/list'); 
        });
    });
}};

module.exports=controller;
