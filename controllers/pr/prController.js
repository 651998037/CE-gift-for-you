const controller ={};
const { validationResult } = require('express-validator');

controller.add = (req,res) => {
    if (typeof req.session.userid == 'undefined') { res.redirect('/');}else{
    const data = null;
    req.getConnection((err,conn) =>{
        conn.query('SELECT * FROM ads',(err,ads)=>{
            conn.query('SELECT * FROM media',(err,media)=>{
                conn.query('SELECT * FROM person',(err,person)=>{
                    res.render('./admin/prView/prForm', {
                        data1:ads,data2:media,data3:person,data4:data,session:req.session
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
        res.redirect('/pr/new');
    }else{
        req.session.success=true;
        req.session.topic="เพื่มข้อมูลสำเร็จ!";
        const data=req.body;
        req.getConnection((err,conn) =>{
        conn.query('INSERT INTO pr set ?',[data],(err,prView) => {
            if(err){
                res.json(err);
            }
            res.redirect('/pr');
        });
    });
}};

controller.show = (req,res) => {
    if (typeof req.session.userid == 'undefined') { res.redirect('/');}else{
    const userTypeId = req.session.mode;
    if (userTypeId === 1) {
        req.getConnection((err,conn) =>{
            conn.query('SELECT pr.id,a.name as aname,m.name as mname,p.name as pname,pr.start FROM pr join media as m on pr.media=m.id join ads as a on pr.ads=a.id join person as p on pr.person=p.id;',(err,prView) => {
                res.render('./admin/prView/prView',{
                    data:prView,session:req.session
                });
            });
        });
    } else {
        req.getConnection((err,conn) =>{
            conn.query('SELECT pr.id,a.name as aname,m.name as mname,p.name as pname,pr.start FROM pr join media as m on pr.media=m.id join ads as a on pr.ads=a.id join person as p on pr.person=p.id;',(err,prView) => {
                res.render('./user/prView/UprView',{
                    data:prView,session:req.session
                });
            });
        });
    }}
};

controller.del =(req, res) => {
    if (typeof req.session.userid == 'undefined') { res.redirect('/');}else{
    const data = req.body.data;
    res.render('./admin/prView/confirmDel',{
        data:data,session:req.session
    });
}};

controller.delete = (req,res) => {
    req.session.success=true;
    req.session.topic="ลบข้อมูลสำเร็จ!";
    const idtoDetele =req.params.id;
    req.getConnection((err,conn) =>{
        conn.query('DELETE FROM pr WHERE id= ?',[idtoDetele],(err,pr)=>{
            res.redirect('/pr');
            }
        );
    });
};

controller.edit = (req,res) => {
    if (typeof req.session.userid == 'undefined') { res.redirect('/');}else{
    const { id } =req.params;
        req.getConnection((err,conn) =>{
            conn.query('SELECT * FROM ads',(err,ads)=>{
                conn.query('SELECT * FROM media',(err,media)=>{
                    conn.query('SELECT * FROM person',(err,person)=>{
                        conn.query('SELECT * FROM pr Where id = ?',[id],(err,pr)=>{
                        res.render('./admin/prView/prUpdate', {
                            data1:ads,data2:media,data3:person,data4:pr,session:req.session
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
        return res.redirect('/pr/update/'+ req.params.id);
    }else{
        req.session.success=true;
        req.session.topic="แก้ไขข้อมูลสำเร็จ!";
        const { id } =req.params;
        const data=req.body;
            req.getConnection((err,conn) =>{
            conn.query('UPDATE pr SET ? WHERE id = ?',[data,id],(err,result)=>{
                res.redirect('/pr');
        });
    });
}};

// const mode = req.session.mode;
//     if (mode === 1) {}
module.exports = controller;