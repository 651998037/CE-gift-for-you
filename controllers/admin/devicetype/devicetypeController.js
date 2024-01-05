const controller = {};
const { validationResult } = require('express-validator');

controller.show = (req, res) => {
    if (typeof req.session.userid == 'undefined') { res.redirect('/');}else{
        req.getConnection((err, conn) => {
            if (err) {
                res.status(500).json(err);
                return;
            }

            conn.query('SELECT * FROM devicetype', (err, devicetype) => {
                if (err) {
                    res.status(500).json(err);
                    return;
                }
                res.render('./admin/devicetypeView/devicetypeList', {
                    data: devicetype,
                    session: req.session
                });
            });
        });
    };
};

controller.add = (req, res) => {
    if (typeof req.session.userid == 'undefined') { res.redirect('/');}else{
        res.render('./admin/devicetypeView/devicetypeAdd', {
            session: req.session,
            data: {}
        });
    };
};

controller.new = (req, res) => {
    if (typeof req.session.userid == 'undefined') { res.redirect('/');}else{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            req.session.errors = errors.array();
            req.session.success = false;
            req.session.topic = "เพิ่มข้อมูลไม่สำเร็จ!";
            res.redirect('/devicetype/add');
        } else {
            req.session.success = true;
            req.session.topic = "เพิ่มข้อมูลสำเร็จ!";
            const data = req.body;
            req.getConnection((err, conn) => {
                conn.query('INSERT INTO devicetype SET ?', [data], (err, devicetype) => {
                    if (err) {
                        res.json(err);
                    }
                    res.redirect('/devicetype/list');
                });
            });
        };
    }
};

controller.delete = (req, res) => {
    if (typeof req.session.userid == 'undefined') { res.redirect('/');}else{
        const data = req.body.data || {};
        res.render('./admin/devicetypeView/confirmdevicetype', {
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
            conn.query('DELETE FROM devicetype WHERE id = ?', [idToDelete], (err, devicetype) => {
                if (err) {
                    req.session.success = false;
                    req.session.topic = "ลบข้อมูลไม่สำเร็จ!";
                }
                res.redirect('/devicetype/list');
            });
        });
    };
};


controller.edit = (req, res) => {
    if (typeof req.session.userid == 'undefined') { res.redirect('/');}else{
        const idToEdit = req.params.id;
        req.getConnection((err, conn) => {
            conn.query('SELECT * FROM devicetype WHERE id = ?', [idToEdit], (err, data) => {
                if (err) {
                    return res.status(500).json(err);
                }
                res.render('./admin/devicetypeView/devicetypeEdit', { data: data[0], session: req.session });
            });
        });
    };
};

controller.save = (req, res) => {
    if (typeof req.session.userid == 'undefined') { res.redirect('/');}else{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            req.session.errors = errors.array();
            req.session.success = false;
            req.session.topic = "แก้ไขข้อมูลไม่สำเร็จ!";
            res.redirect(`/devicetype/edit/${req.params.id}`);
        } else {
            req.session.success = true;
            req.session.topic = "แก้ไขข้อมูลสำเร็จ!";
            const idToEdit = req.params.id;
            const updatedData = {
                name: req.body.name,
            };
            req.getConnection((err, conn) => {
                conn.query('UPDATE devicetype SET ? WHERE id = ?', [updatedData, idToEdit], (err, result) => {
                    if (err) {
                        return res.status(500).json(err);
                    }
                    res.redirect('/devicetype/list');
                });
            });
        };
    }
};

module.exports = controller;
