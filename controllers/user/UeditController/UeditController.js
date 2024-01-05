const controller ={};
const { validationResult } = require('express-validator');

controller.show=(req,res) => {
    req.getConnection((err,conn) =>{
        conn.query('SELECT p.name, p.lineid, p.phone, d.name as nametype, r.brandModel as bran, r.problem, r.reportday, r.reportrecipient, edit.carryout, dp.place ,edit.carryoutday FROM edit join person as p on edit.editor=p.id join report as r on edit.report=r.id join devicetype as d on r.type=d.id join donatedplace as dp on r.place=dp.id',(err,edit)=>{

            res.render('./user/UeditView/UeditList',{
                data:edit,session:req.session
            });
        });
    });
};

controller.add=(req,res) => {
    const data = null;
    req.getConnection((err, conn) => {
        conn.query('SELECT id,name FROM person', (err, person) => {
            conn.query('SELECT id,problem FROM report', (err, report) => {
                    res.render('./user/UeditView/UeditAdd',{
                    data1:person,data2:report,data3:data,session: req.session
                    });
                });
            });
        });
    };

controller.new = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.session.errors = errors;
        req.session.success = false;
        return res.redirect('/Uedit/add');
    } else {
        req.session.success = true;
        req.session.topic = "เพิ่มข้อมูลสำเร็จ!";
        const data = req.body;
        const editor = data.name;
        const report = data.problem
        const values = [editor,report,data.carryout,data.carryoutday];
        req.getConnection((err, conn) => {
            conn.query('INSERT INTO edit (editor,report,carryout,carryoutday) VALUES (?,?,?,?)', values, (err, result) => {
                return res.redirect('/Uedit/list')
        });
    });      
}
};
controller.edit = (req, res) => {
    const idToEdit = req.params.id;
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM person', (err, person) => {
            conn.query('SELECT * FROM report', (err, report) => {
                conn.query('SELECT * FROM edit WHERE id = ?', [idToEdit], (err, edit) => {
                    res.render('./user/UeditView/UeditEdit', {
                data1:person,data2:report,data3:edit,session:req.session 
            });
        });
    });
});
});
};

controller.save = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.session.errors = errors;
        req.session.success = false;
        return res.redirect('/Uedit/edit/' + req.params.id);
    } else {
        req.session.success = true;
        req.session.topic = "แก้ไขข้อมูลสำเร็จ!";
        const { id } = req.params;
        const data = req.body;
        const editor = data.name; 
        const report = data.problem; 
        req.getConnection((err, conn) => {
            conn.query('UPDATE edit SET editor=?, report=?,carryout=?,carryoutday=? WHERE id = ?', [editor, report,data.carryout,data.carryoutday, id], (err) => {
                if (err) {
                    return res.status(500).json(err);
                }

                res.redirect('/Uedit/list');
            });
        });
    }
};

controller.delete = (req, res) => {
    if (typeof req.session.userid == 'undefined') { res.redirect('/');}else{
    const data = req.body.data;
    res.render('./user/editview/confirmDel', {
        data: data,session: req.session
    });
    };
};

controller.delete1 = (req, res) => {
    if (typeof req.session.userid == 'undefined') { res.redirect('/');}else{
    const idToDelete = req.params.id; // รับค่า id จากพารามิเตอร์ของ URL
    req.session.success = true;
    req.session.topic = "ลบข้อมูลสำเร็จ!";
    req.getConnection((err, conn) => {
        conn.query('DELETE FROM edit WHERE id = ?', [idToDelete], (err, edit) => {
            res.redirect('/Uedit/list');
        });
        });
    };
};



module.exports=controller;