const controller = {};
const { validationResult } = require('express-validator');

controller.show = (req, res) => {
    if (typeof req.session.userid == 'undefined') { res.redirect('/');}else{
    req.getConnection((err, conn) => {
        conn.query('SELECT wl.id as id,d.name as stocklist,do.brand as brand,wl.amount as amount,p.name as withdraw,date,l.person as approve FROM withdrawlist as wl' +
            ' JOIN donationlist as do on wl.brand = do.id ' +
            ' JOIN devicetype as d on wl.stocklist = d.id ' +
            ' JOIN listofapprovedpeople as l on wl.approve = l.id ' +
            ' JOIN person as p on wl.withdraw = p.id', (err, withdrawlist) => {
                if (err) {
                    console.error(err);

                } else {
                    res.render('./admin/withdrawlistView/withdrawlistList', {
                        data: withdrawlist,
                        session: req.session
                    });
                }
            });
        });
    }
};

controller.add = (req, res) => {
    if (typeof req.session.userid == 'undefined') { res.redirect('/');}else{
    const data = {};
        req.getConnection((err, conn) => {    
            conn.query('SELECT id,name FROM person', (err, person) => {
                conn.query('SELECT id,name FROM devicetype', (err, devicetype) => {
                    conn.query('SELECT id,brand FROM donationlist', (err, donationlist) => {
                        conn.query('SELECT id,person FROM listofapprovedpeople', (err, listofapprovedpeople) => {
                            conn.query('SELECT id, amount FROM withdrawlist', (err, data) => {
                            if (err) {
                                return res.status(500).json(err);
                            }
                            res.render('./admin/withdrawlistView/withdrawlistAdd', {
                                data1:devicetype,
                                data2:person,
                                data3:donationlist,
                                data4:listofapprovedpeople,
                                data5:data,
                                session: req.session
                                });
                            });
                        });
                    });
                });  
            });
        });
    }
};

controller.new = (req, res) => {
    if (typeof req.session.userid == 'undefined') { res.redirect('/');}else{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            req.session.errors = errors;
            req.session.success = false;
            return res.redirect('/withdrawlist/add');
        } else {
            req.session.success = true;
            req.session.topic = "เพิ่มข้อมูลสำเร็จ!";
            const data = req.body;
            const stocklist = data.type;
            const withdraw = data.name;
            const brand = data.brand;
            const approve = data.approve;
            const values = [stocklist, brand, data.amount,withdraw, approve, data.date];
            req.getConnection((err, conn) => {
                conn.query('INSERT INTO withdrawlist (stocklist, brand, amount, withdraw, approve, date) VALUES (?, ?, ?, ?, ?, ?)', values, (err, result) => {
                    if (err) {
                        console.error(err);
                        // จัดการข้อผิดพลาดที่นี่ ตามที่คุณต้องการ
                    } else {
                        return res.redirect('/withdrawlist/list');
                    }
                });
            });
        }
    }
};

controller.edit = (req, res) => {
    if (typeof req.session.userid == 'undefined') { res.redirect('/');}else{
        const {id} = req.params;
            req.getConnection((err, conn) => {
                conn.query('SELECT * FROM person', (err, person) => {
                    conn.query('SELECT * FROM devicetype', (err, devicetype) => {
                        conn.query('SELECT * FROM donationlist', (err, donationlist) => {
                            conn.query('SELECT * FROM listofapprovedpeople', (err, listofapprovedpeople) => {
                                conn.query('SELECT * FROM withdrawlist WHERE id = ?',[id], (err, data) => {
                    if (err) {
                        return res.status(500).json(err);
                    }
                    res.render('./admin/withdrawlistView/withdrawlistEdit', { 
                        data1:devicetype,
                        data2:person,
                        data3:donationlist,
                        data4:listofapprovedpeople,
                        data5:data,
                        session:req.session });
                            });
                        });
                    });
                });
            });
        });
    }
};
controller.update = (req, res) => {
    if (typeof req.session.userid == 'undefined') { res.redirect('/');}else{
        const errors = validationResult(req);
            if(!errors.isEmpty()){
                req.session.errors=errors;
                req.session.success =false;
                return  res.redirect('/withdrawlist/edit/'+ req.params.id)
            }else{
                req.session.success=true;
                req.session.topic="แก้ไขข้อมูลสำเร็จ!";
                const idToEdit = req.params.id;
                const data = req.body;
                
            req.getConnection((err, conn) => {
                conn.query('UPDATE withdrawlist SET ? WHERE id = ?', [data, idToEdit], (err, result) => {
                    if (err) {
                        return res.status(500).json(err);
                    }
                    res.redirect('/withdrawlist/list'); 
                });
            });
        }
    }
};

controller.delete = (req, res) => {
    if (typeof req.session.userid == 'undefined') { res.redirect('/');}else{
        const data = req.body.data;
        res.render('./admin/withdrawlistView/confirmDelete', {
            data: data, session: req.session
        });
    }
};

controller.delete1 = (req, res) => {
    if (typeof req.session.userid == 'undefined') { res.redirect('/');}else{
        const idToDelete = req.params.id;
        req.session.success = true;
        req.session.topic = "ลบข้อมูลสำเร็จ!";
        req.getConnection((err, conn) => {
            conn.query('DELETE FROM withdrawlist WHERE id = ?', [idToDelete], (err, edit) => {
                res.redirect('/withdrawlist/list');
            });
        });
    }
};

module.exports = controller;