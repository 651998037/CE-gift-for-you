const controller = {};
const { validationResult } = require('express-validator');

controller.show = (req, res) => {
    if (typeof req.session.userid == 'undefined') { res.redirect('/');}else{
        req.getConnection((err, conn) => {
            conn.query('SELECT * FROM room', (err, rooms) => {
                if (err) {
                    res.status(500).json(err);
                    return;
                }
                res.render('./user/roomView/roomList', {
                    data: rooms,
                    session: req.session
                });
            });
        });
    };
};

controller.add = (req, res) => {
    if (typeof req.session.userid == 'undefined') { res.redirect('/');}else{
        req.getConnection((err, conn) => {
            conn.query('SELECT * FROM room', (err, rooms) => {
                res.render('./user/roomView/roomAdd', {
                    data1: rooms,
                    session: req.session
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
            return res.redirect('/Uroom/add');
        } else {
            req.session.success = true;
            req.session.topic = "เพิ่มข้อมูลสำเร็จ!";
            const data = req.body;
            req.getConnection((err, conn) => {
                conn.query('INSERT INTO room SET ?', [data], (err, result) => {
                    if (err) {
                        res.json(err);
                    }
                    res.redirect('/Uroom/list');
                });
            });
        };
    }
};

controller.edit = (req, res) => {
    if (typeof req.session.userid == 'undefined') { res.redirect('/');}else{
        const url = req.params;
        req.getConnection((err, conn) => {
            conn.query('SELECT * FROM room WHERE id = ?',[url.id], (err, room) => {
                if (err) {
                    return res.status(500).json(err);
                }
                res.render('./user/roomView/roomedit', {
                    room,
                    session: req.session
                });
            });
        });
    };
};

controller.save = (req, res) => {
    if (typeof req.session.userid == 'undefined') { res.redirect('/');}else{
        const errors = validationResult(req);
        const url = req.params;
        if (!errors.isEmpty()) {
            req.session.errors = errors;
            req.session.success = false;
            return res.redirect('/Uroom/edit/' + url.id);
        } else {
            req.session.success = true;
            req.session.topic = "แก้ไขข้อมูลสำเร็จ!";
            const update = req.body
            req.getConnection((err, conn) => {
                conn.query('UPDATE room SET ? WHERE id = ?', [update, url.id], (err, result) => {
                    if (err) {
                        return res.status(500).json(err);
                    }
                    res.redirect('/Uroom/list');
                });
            });
        };
    }
};

controller.del = (req, res) => {
    if (typeof req.session.userid == 'undefined') { res.redirect('/');}else{
        const data = req.body.data;
        res.render('./user/roomView/Confirm', {
            data: data,
            session: req.session
        });
    };
};

controller.delete = (req, res) => {
    if (typeof req.session.userid == 'undefined') { res.redirect('/');}else{
        req.session.success = true;
        req.session.topic = "ลบข้อมูลสำเร็จ!";
        const url = req.params;
        req.getConnection((err, conn) => {
            conn.query('DELETE FROM room WHERE id = ?', [url.id], (err, result) => {
                if (err) {
                    res.json(err);
                }
                res.redirect('/Uroom/list');
            });
        });
    };
};

module.exports = controller;
