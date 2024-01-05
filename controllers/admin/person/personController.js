const controller ={};
const { validationResult } = require('express-validator');

controller.show = (req,res) => {
    if (typeof req.session.userid == 'undefined') { res.redirect('/');}else{
    req.getConnection((err,conn) =>{
        conn.query('SELECT * FROM person',(err,person)=>{
            res.render('./admin/personView/personList',{
                data:person,session:req.session
            });
        });
    });
}};

controller.add = (req, res) => {
    if (typeof req.session.userid == 'undefined') { res.redirect('/');}else{
    if (typeof req.session.userid == 'undefined') { res.redirect('/');}else{
    res.render('./admin/personView/personAdd',{
        session:req.session
    });
}}
};

controller.new = (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        req.session.errors=errors;
        req.session.success =false;
        return  res.redirect('/person/add')
    }else{
        req.session.success=true;
        req.session.topic="เพิ่มข้อมูลสำเร็จ!";
        const data = req.body; 
        req.getConnection((err, conn) => {
        conn.query('INSERT INTO person SET ?', [data], (err, person) => {
            if (err) {
                res.json(err);
            }
            res.redirect('/person/list');
        });
    });
}};

controller.del=(req, res) => {
    if (typeof req.session.userid == 'undefined') { res.redirect('/');}else{
    const data = req.body.data;
    res.render('./admin/personView/confirmDel',{
        data:data,session:req.session
    });
}};

controller.delete=(req,res) => {
        req.session.success=true;
        req.session.topic="ลบข้อมูลสำเร็จ!";
        const idToDelete = req.params.id;
        req.getConnection((err,conn) =>{
        conn.query('DELETE FROM person WHERE id = ?', [idToDelete], (err,person) => {
            res.redirect('/person/list');
            });
        });
    };

controller.edit = (req, res) => {
    if (typeof req.session.userid == 'undefined') { res.redirect('/');}else{
    const idToEdit = req.params.id;
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM person WHERE id = ?', [idToEdit], (err, data) => {
            if (err) {
                return res.status(500).json(err);
            }
            res.render('./admin/personView/personEdit', { data: data[0],session:req.session });
        });
    });
}};

controller.save = (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        req.session.errors=errors;
        req.session.success =false;
        return  res.redirect('/person/edit/'+ req.params.id)
    }else{
        req.session.success=true;
        req.session.topic="แก้ไขข้อมูลสำเร็จ!";
        const idToEdit = req.params.id;
        const updatedData = {
        name: req.body.name,
        phone: req.body.phone,
        lineid: req.body.lineid,
        gender: req.body.gender
    };
    req.getConnection((err, conn) => {
        conn.query('UPDATE person SET ? WHERE id = ?', [updatedData, idToEdit], (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }
            res.redirect('/person/list'); 
        });
    });
}};

module.exports=controller;