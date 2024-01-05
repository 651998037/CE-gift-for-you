const controller ={};
const { validationResult } = require('express-validator');

controller.show=(req,res) => {
    if (typeof req.session.userid == 'undefined') { res.redirect('/');}else{
        req.getConnection((err,conn) =>{
            conn.query('SELECT * FROM ce_gift_for_you.craftandtest  ;',(err,craftandtest)=>{
                if(err){
                    res.status(500).json(err);
                    return;
                }
                res.render('./admin/craftandtestView/craftandtestList',{
                    data:craftandtest,session:req.session
                });
            });
        });
    };
};

controller.add = (req, res) => {
    if (typeof req.session.userid == 'undefined') { res.redirect('/');}else{
        res.render('./admin/craftandtestView/craftandtestAdd',{
            session:req.session,
            data:{}
        });
    };
};

controller.new = (req, res) => {
    if (typeof req.session.userid == 'undefined') { res.redirect('/');}else{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            req.session.errors=errors;
            req.session.success =false;
            return  res.redirect('/craftandtest/add')
        }else{
            req.session.success=true;
            req.session.topic="เพิ่มข้อมูลสำเร็จ!";
            const data = req.body; 
            req.getConnection((err, conn) => {
            conn.query('INSERT INTO craftandtest SET ?', [data], (err, craftandtest) => {
                if (err) {
                    res.json(err);
                }
                res.redirect('/craftandtest/list');
            });
        });
    };
}};

controller.delete=(req, res) => {
    if (typeof req.session.userid == 'undefined') { res.redirect('/');}else{
        const data = req.body.data;
        res.render('./admin/craftandtestView/confirmcraftandtestDel',{
            data:data,session:req.session
        });
    };
};

controller.delete1=(req,res) => {
    if (typeof req.session.userid == 'undefined') { res.redirect('/');}else{
        req.session.success=true;
        req.session.topic="ลบข้อมูลสำเร็จ!";
        const idToDelete = req.params.id;
        req.getConnection((err,conn) =>{
        conn.query('DELETE FROM craftandtest WHERE id = ?', [idToDelete], (err,craftandtest) => {
            res.redirect('/craftandtest/list');
        });
        });
    };
};
controller.edit = (req, res) => {
    if (typeof req.session.userid == 'undefined') { res.redirect('/');}else{
    const idToEdit = req.params.id;
        req.getConnection((err, conn) => {
            conn.query('SELECT * FROM craftandtest WHERE id = ?', [idToEdit], (err, data) => {
                if (err) {
                    return res.status(500).json(err);
                }
                res.render('./admin/craftandtestView/craftandtestEdit', { data: data[0],session:req.session });
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
            return  res.redirect('/craftandtestEdit/'+ req.params.id)
        }else{
            req.session.success=true;
            req.session.topic="แก้ไขข้อมูลสำเร็จ!";
            const {id} = req.params;
            const data =  req.body;
        req.getConnection((err, conn) => {
            conn.query('UPDATE craftandtest SET ? WHERE id = ?', [data, id], (err, result) => {
                if (err) {
                    return res.status(500).json(err);
                }
                res.redirect('/craftandtest/list'); 
            });
        });
    };
}};

module.exports=controller;
