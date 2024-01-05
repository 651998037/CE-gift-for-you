const controller ={};
const { validationResult } = require('express-validator');

controller.show=(req,res) => {
    if (typeof req.session.userid == 'undefined') { res.redirect('/');}else{
    req.getConnection((err,conn) =>{
        conn.query('SELECT l.id AS id, p.name AS name,p.phone as phone FROM listofapprovedpeople AS l JOIN person AS p ON l.person=p.id',(err,approve)=>{
            if(err){
                res.status(500).json(err);
                return;
            }
            res.render('./admin/listofapprovedpeopleView/listofapprovedpeopleList',{
                data:approve,session:req.session
            });
        });
    });
}};

controller.add = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM person', (err, per) => {
                res.render('./admin/listofapprovedpeopleView/listofapprovedpeopleAdd', { 
                    data1:per,data2: null ,session: req.session
                });
            });
        }
    );   
};

controller.new = (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        req.session.errors=errors;
        req.session.success =false;
        return  res.redirect('/listofapprovedpeople/add')
    }else{
        req.session.success=true;
        req.session.topic="เพิ่มข้อมูลสำเร็จ!";
        const data = req.body; 
        req.getConnection((err, conn) => {
        conn.query('INSERT INTO listofapprovedpeople SET ?', [data], (err, result) => {
            if (err) {
                res.json(err);
            }
            res.redirect('/listofapprovedpeople/list');
        });
    });
}};

controller.edit = (req, res) => {
    if (typeof req.session.userid == 'undefined') { res.redirect('/');}else{
    const {id} = req.params;
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM person', id, (err, person) => {
            conn.query('SELECT * FROM listofapprovedpeople WHERE id = ?', id, (err, ap) => {
            if (err) {
                return res.status(500).json(err);
            }
            res.render('./admin/listofapprovedpeopleView/listofapprovedpeopleEdit', { data1: person,data2:ap,session:req.session });
        });
    });
});
}};

controller.save = (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        req.session.errors=errors;
        req.session.success =false;
        return  res.redirect('/Udonatedplace/save/'+ req.params.id);
    }else{
        req.session.success=true;
        req.session.topic="แก้ไขข้อมูลสำเร็จ!";
        const idToEdit = req.params.id;
        const updatedData = {
        person: req.body.person,

    };
    req.getConnection((err, conn) => {
        conn.query('UPDATE listofapprovedpeople SET ? WHERE id = ?', [updatedData, idToEdit], (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }
            res.redirect('/listofapprovedpeople/list'); 
        });
    });
}};

controller.delete =(req, res) => {
    if (typeof req.session.userid == 'undefined') { res.redirect('/');}else{
    const data = req.body.data;
    res.render('./admin/listofapprovedpeopleView/confirm',{
        data:data,session:req.session
    });
}};

controller.delete1 =(req,res) => {
    req.session.success=true;
    req.session.topic="ลบข้อมูลสำเร็จ!";
    const idToDelete = req.params.id;
    req.getConnection((err,conn) =>{
        conn.query('DELETE FROM listofapprovedpeople WHERE id = ?', [idToDelete], (err,pr) => {
            if (err) {
                res.json(err);
            }
            res.redirect('/listofapprovedpeople/list');
            });
        });
    };

module.exports=controller;