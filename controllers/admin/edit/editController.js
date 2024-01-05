const controller = {};
const { validationResult } = require('express-validator');

controller.show = (req, res, next) => {
    if (typeof req.session.userid == 'undefined') { res.redirect('/');}else{
        req.getConnection((err, conn) => {
            conn.query('SELECT edit.id as id,p.name as editor,r.problem as report,edit.carryout as carryout,edit.carryoutday as carryoutday FROM edit JOIN person as p on edit.editor=p.id JOIN report as r on edit.report=r.id', (err, alledits) => {
                if (err) {
                    return next(err); // เรียก next แทนการส่งการตอบกลับ
                }
                const useredits = alledits.filter(place => place.userid === req.session.userid);

                res.render('./admin/editView/editList2', {
                    data: useredits,
                    session: req.session
                });
            });
        });
    };
};

controller.add = (req, res) => {
    if (typeof req.session.userid == 'undefined') { res.redirect('/');}else{
        req.getConnection((err, conn) => {
            conn.query('SELECT * FROM person', (err, person) => {
                if (err) {
                    return next(err);
                }
                conn.query('SELECT * FROM report', (err, report) => {
                    if (err) {
                        return next(err);
                    }
                    res.render('./admin/editView/editAdd', {
                        session: req.session,
                        data1: person, // ส่งข้อมูล person ไปยังหน้ามุมมอง
                        data2: report, // ส่งข้อมูล report ไปยังหน้ามุมมอง
                        data4: {},
                    });
                });
            });
        });
    };
};

controller.new = (req, res) => {
    if (typeof req.session.userid == 'undefined') { res.redirect('/');}else{
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            req.session.errors = errors;
            req.session.success = false;
            return res.redirect('/edit/add');
        }

        req.session.success = true;
        req.session.topic = "เพิ่มข้อมูลสำเร็จ!";
        const data = req.body;
        req.getConnection((err, conn) => {
            if (err) {
                // Handle the error here if needed
                return res.status(500).json(err);
            }
            conn.query('INSERT INTO edit SET ?', [data], (err, editAdd) => {
                if (err) {
                    // Handle the error here if needed
                    return res.status(500).json(err);
                }
                conn.query('SELECT name FROM person', (err, person) => {
                    if (err) {
                        // Handle the error here if needed
                        return res.status(500).json(err);
                    }
                    conn.query('SELECT problem FROM report', (err, report) => {
                        if (err) {
                            // Handle the error here if needed
                            return res.status(500).json(err);
                        }
                        res.redirect('/edit/list'); // เมื่อข้อมูลถูกเพิ่มเรียบร้อยแล้ว ให้เปลี่ยนไปที่ "/edit/list"
                    });
                });
            });
        });
    };
};


controller.delete = (req, res) => {
    if (typeof req.session.userid == 'undefined') { res.redirect('/');}else{
        const data = req.body.data;
        res.render('./admin/editView/confirmeditEdit', {
            data: data, session: req.session
        });
    };
};

controller.delete00 = (req, res) => {
    if (typeof req.session.userid == 'undefined') { res.redirect('/');}else{
        const idToDelete = req.params.id;
        req.session.success = true;
        req.session.topic = "ลบข้อมูลสำเร็จ!";
        req.getConnection((err, conn) => {
            conn.query('DELETE FROM edit WHERE id = ?', [idToDelete], (err, edit) => {
                res.redirect('/edit/list');
            });
        });
    };
};

controller.edit = (req, res) => {
    if (typeof req.session.userid == 'undefined') { res.redirect('/');}else{
        const idToEdit = req.params.id;
        req.getConnection((err, conn) => {
            if (err) {
                return res.status(500).json(err);
            }
            conn.query('SELECT * FROM person', (err, person) => {
                if (err) {
                    return res.status(500).json(err);
                }
                conn.query('SELECT * FROM report', (err, report) => {
                    if (err) {
                        return res.status(500).json(err);
                    }
                    conn.query('SELECT * FROM edit WHERE id = ?', [idToEdit], (err, data4) => {
                        if (err) {
                            return res.status(500).json(err);
                        }
                        res.render('editEdit', { data1: person, data2: report, data4: data4, session: req.session });
                    });
                });
            });
        });
    };
};


controller.save = (req, res) => {
    if (typeof req.session.userid == 'undefined') { res.redirect('/');}else{
        const idToEdit = req.params.id; // รับค่า id ที่ส่งมาจาก URL
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            req.session.errors = errors;
            req.session.success = false;
            return res.redirect('/edit/edit/' + idToEdit);
        } else {
            req.session.success = true;
            req.session.topic = "แก้ไขข้อมูลสำเร็จ!";
            const updatedData = {
                editor: req.body.editor,
                report: req.body.report,
                carryout: req.body.carryout,
                carryoutday: req.body.carryoutday,
            };
            
            req.getConnection((err, conn) => {
                conn.query('UPDATE edit SET ? WHERE id = ?', [updatedData, idToEdit], (err, result) => {
                    if (err) {
                    }
                    res.redirect('/edit/list');
                });
            });
        };
    }
};

module.exports = controller;
