const controller ={};
const { validationResult } = require('express-validator');

controller.show = (req, res) => {
    if (typeof req.session.userid == 'undefined') { res.redirect('/');}else{
        req.getConnection((err, conn) => {
            conn.query('SELECT report.id as id,dt.name as Type,report.brandModel as BrandModel,report.problem as Problem,report.reportday as Reportday,report.reportrecipient as Reportrecipient,dtp.place as Place,p.name as Person,report.phone as Phone FROM report JOIN devicetype as dt on report.type=dt.id JOIN donatedplace as dtp on report.place=dtp.id JOIN person as p on report.person=p.id', (err, allReport) => {
                // if (typeof req.session.userid == 'undefined')
                if (err) {
                    res.status(500).json(err);
                    return;
                }

                // กรองข้อมูลเฉพาะสถานที่บริจาคของผู้ใช้ที่เข้าสู่ระบบ
                const userReport = allReport.filter(place => place.userid === req.session.userid);

                res.render('./user/reportview/reportList2', {
                    data: userReport,
                    session: req.session
                });
            });
        });
    };
};


controller.add = (req, res) => {
    if (typeof req.session.userid == 'undefined') { res.redirect('/');}else{
        const data=null;
        req.getConnection((err, conn) => {
            conn.query('SELECT id,name FROM devicetype ', (err,devicetype) => {
                conn.query('SELECT id,place FROM donatedplace ', (err,donatedplace) => {
                    conn.query('SELECT id,name FROM person', (err,person) => {
                        res.render('./user/reportview/UreportForm', {
                        data1:devicetype,
                        data2:donatedplace,
                        data3:person,
                        data4:data,
                        session: req.session
                        });
                    });
                });
            });
        });
    };
};


controller.new = (req, res) => {
    if (typeof req.session.userid == 'undefined') { res.redirect('/');}else{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            req.session.errors=errors;
            req.session.success =false;
            return  res.redirect('/Ureport/add')
        }else{
            req.session.success=true;
            req.session.topic="เพิ่มข้อมูลสำเร็จ!";
            const data = req.body;
            const values = [data.type, data.brandModel, data.problem, data.reportday, data.reportrecipient, data.place, data.person, data.phone];
            req.getConnection((err, conn) => {
            conn.query('INSERT INTO report (type, brandModel, problem, reportday, reportrecipient, place, person, phone) VALUES (?,?,?,?,?,?,?,?)',values, (err, report) => {
                if (err) {
                    return res.status(500).json(err);
                }
                res.redirect('/Ureport/list');
            });
        });
    };
}};

controller.delete = (req, res) => {
    if (typeof req.session.userid == 'undefined') { res.redirect('/');}else{
        const data = req.body.data;
        res.render('./user/reportview/UreportDel', {
            data: data,session: req.session
        });
    };
};

controller.delete00 = (req, res) => {
    if (typeof req.session.userid == 'undefined') { res.redirect('/');}else{
        req.session.success=true;
        req.session.topic="ลบข้อมูลสำเร็จ!";
        const idToDelete = req.params.id; // รับค่า id จากพารามิเตอร์ของ URL
        req.getConnection((err, conn) => {
            conn.query('DELETE FROM report WHERE id = ?', [idToDelete], (err, report) => {
                res.redirect('/Ureport/list');
            });
        });
    };
};

controller.edit = (req, res) => {
    if (typeof req.session.userid == 'undefined') { res.redirect('/');}else{
        const {id} = req.params;
        req.getConnection((err, conn) => {
            conn.query('SELECT * FROM report WHERE id = ?', [id], (err, data) => {
                conn.query('SELECT * FROM devicetype', (err, devicetype) => {
                    conn.query('SELECT * FROM donatedplace', (err, donatedplace) => {
                        conn.query('SELECT * FROM person', (err, person) => {
                            res.render('./user/reportview/UreportEdit', { 
                            data1:devicetype,
                            data2:donatedplace,
                            data3:person,
                            data4:data,
                            session:req.session 
                            });
                        });
                    });
                });
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
            return  res.redirect('/Ureport/edit/'+ req.params.id)
        }else{
            req.session.success=true;
            req.session.topic="แก้ไขข้อมูลสำเร็จ!";
            const {id} = req.params;
            const data = req.body;
            req.getConnection((err, conn) => {
                conn.query('UPDATE report SET type=?, brandModel=?, problem=?, reportday=?, reportrecipient=?, place=?, person=?, phone=? WHERE id = ?', 
                [data.type ,data.brandModel, data.problem, data.reportday, data.reportrecipient, data.place, data.person, data.phone, id], (err, result) => {
                if (err) {
                    return res.status(500).json(err);
                }
                res.redirect('/Ureport/list'); 
            });
        });
    };
}};

module.exports=controller;
