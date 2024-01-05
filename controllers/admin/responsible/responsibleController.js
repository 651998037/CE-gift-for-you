const controller ={};
const { validationResult } = require('express-validator');

controller.add = (req,res) => {
    if (typeof req.session.userid == 'undefined') { res.redirect('/');}else{
    const data = null;
    req.getConnection((err,conn) =>{
        conn.query('SELECT * FROM duty',(err,duty)=>{
            conn.query('SELECT * FROM project',(err,project)=>{
                conn.query('SELECT * FROM person',(err,person)=>{
                    res.render('./admin/responsibleView/responsibleForm', {
                        data1:person,data2:duty,data3:project,data4:data,session:req.session
                    });
                });
            });
        });
    });
}};

controller.new = (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        req.session.errors=errors;
        req.session.success=false;
        res.redirect('/responsible/new');
    }else{
        req.session.success=true;
        req.session.topic="เพื่มข้อมูลสำเร็จ!";
        const data=req.body;
        req.getConnection((err,conn) =>{
        conn.query('INSERT INTO responsible set ?',[data],(err,responsibleView) => {
            if(err){
                res.json(err);
            }
            res.redirect('/responsible/list');
        });
    });
}};

controller.show = (req,res) => {
    if (typeof req.session.userid == 'undefined') { res.redirect('/');}else{
    req.getConnection((err,conn) =>{
        conn.query('SELECT re.id AS id, p.name AS person, d.duty AS duty, pr.projectname AS project FROM responsible AS re JOIN person AS p ON re.person=p.id JOIN duty AS d ON re.duty=d.id JOIN project AS pr ON re.project=pr.id',(err,responsibleView) => {
            res.render('./admin/responsibleView/responsibleView',{
                data:responsibleView,session:req.session
            });
        });
    });
}};

controller.del =(req, res) => {
    if (typeof req.session.userid == 'undefined') { res.redirect('/');}else{
    const data = req.body.data;
    res.render('./admin/responsibleView/confirmDel',{
        data:data,session:req.session
    });
}};

controller.delete = (req,res) => {
    req.session.success=true;
    req.session.topic="ลบข้อมูลสำเร็จ!";
    const idtoDetele =req.params.id;
    req.getConnection((err,conn) =>{
        conn.query('DELETE FROM responsible WHERE id= ?',[idtoDetele],(err,responsible)=>{
            res.redirect('/responsible/list');
            }
        );
    });
};

controller.edit = (req,res) => {
    if (typeof req.session.userid == 'undefined') { res.redirect('/');}else{
    const { id } =req.params;
        req.getConnection((err,conn) =>{
            conn.query('SELECT * FROM duty',(err,duty)=>{
                conn.query('SELECT * FROM project',(err,project)=>{
                    conn.query('SELECT * FROM person',(err,person)=>{
                        conn.query('SELECT * FROM responsible Where id = ?',[id],(err,responsible)=>{
                        res.render('./admin/responsibleView/responsibleUpdate', {
                            data1:person,data2:duty,data3:project,data4:responsible,session:req.session
                        });
                    });
                });
            });
        });
    });
}};

controller.save = (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        req.session.errors=errors;
        req.session.success=false;
        return res.redirect('/responsible/update/'+ req.params.id);
    }else{
        req.session.success=true;
        req.session.topic="แก้ไขข้อมูลสำเร็จ!";
        const { id } =req.params;
        const data=req.body;
            req.getConnection((err,conn) =>{
            conn.query('UPDATE responsible SET ? WHERE id = ?',[data,id],(err,result)=>{
                res.redirect('/responsible/list');
        });
    });
}};

// const mode = req.session.mode;
//     if (mode === 1) {}
module.exports = controller;