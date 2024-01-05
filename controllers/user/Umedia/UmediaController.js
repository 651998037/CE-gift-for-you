const controller ={};
const { validationResult } = require('express-validator');

controller.show=(req,res) => {
    if (typeof req.session.userid == 'undefined') { res.redirect('/');}else{
    req.getConnection((err,conn) =>{
        conn.query('SELECT * FROM media',(err,media)=>{
            if(err){
                res.status(500).json(err);
                return;
            }
            res.render('./user/mediaView/mediaList',{
                data:media,session:req.session
            });
        });
    });
}};

controller.add = (req, res) => {
    if (typeof req.session.userid == 'undefined') { res.redirect('/');}else{
    res.render('./user/mediaView/mediaAdd',{
        session:req.session
    });
}};

controller.new = (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        req.session.errors=errors;
        req.session.success =false;
        return  res.redirect('/Umedia/add')
    }else{
        req.session.success=true;
        req.session.topic="เพิ่มข้อมูลสำเร็จ!";
        const data = req.body; 
        req.getConnection((err, conn) => {
        conn.query('INSERT INTO media SET ?', [data], (err, media) => {
            if (err) {
                res.json(err);
            }
            res.redirect('/Umedia/list');
        });
    });
}};

controller.del=(req, res) => {
    if (typeof req.session.userid == 'undefined') { res.redirect('/');}else{
    const data = req.body.data;
    res.render('./user/mediaView/confirmDel',{
        data:data,session:req.session
    });
}};

controller.delete=(req,res) => {
        req.session.success=true;
        req.session.topic="ลบข้อมูลสำเร็จ!";
        const idToDelete = req.params.id;
        req.getConnection((err,conn) =>{
        conn.query('DELETE FROM media WHERE id = ?', [idToDelete], (err,media) => {
            res.redirect('/Umedia/list');
            });
        });
    };

controller.edit = (req, res) => {
    if (typeof req.session.userid == 'undefined') { res.redirect('/');}else{
    const idToEdit = req.params.id;
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM media WHERE id = ?', [idToEdit], (err, data) => {
            if (err) {
                return res.status(500).json(err);
            }
            res.render('./user/mediaView/mediaEdit', { data: data[0],session:req.session });
        });
    });
}};

controller.save = (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        req.session.errors=errors;
        req.session.success =false;
        return  res.redirect('/UmediaEdit/'+ req.params.id)
    }else{
        req.session.success=true;
        req.session.topic="แก้ไขข้อมูลสำเร็จ!";
        const idToEdit = req.params.id;
        const updatedData = {
        name: req.body.name,
    };
    req.getConnection((err, conn) => {
        conn.query('UPDATE media SET ? WHERE id = ?', [updatedData, idToEdit], (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }
            res.redirect('/Umedia/list'); 
        });
    });
}};

module.exports=controller;
