const controller = {};
const { validationResult } = require('express-validator');

controller.show = (req, res) => {
    if (typeof req.session.userid == 'undefined') { res.redirect('/');}else{
        req.getConnection((err, conn) => {
            conn.query('SELECT storage.id as id, room.roomname AS room, storage.name AS name FROM storage JOIN room ON storage.room = room.id', (err, allstorage) => {
                if (err) {
                    res.status(500).json(err);
                    return;
                }
                res.render('./admin/storageView/storageList', {
                    data: allstorage,
                    session: req.session
                });
            });
        });
    };
};

controller.add = (req, res) => {
    if (typeof req.session.userid == 'undefined') { res.redirect('/');}else{
        req.getConnection((err, conn) => {
            conn.query('SELECT * FROM room', (err, room) => {
                res.render('./admin/storageView/storageAdd', {
                    data1: room,
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
            req.session.errors = errors.array();
            req.session.success = false;
            return res.redirect('/storage/add');
        } else {
            req.session.success = true;
            req.session.topic = "เพิ่มข้อมูลสำเร็จ!";
            const data = req.body;
            const room = req.room;
            const values = [data.name, data.room];
            req.getConnection((err, conn) => {
                conn.query('INSERT INTO storage (name, room) VALUES (?, ?)', values, (err, storage) => {
                    if (err) {
                        return res.status(500).json(err);
                    }
                    res.redirect('/storage/list');
                });
            });
        };
    }
};

controller.edit = (req, res) => {
    if (typeof req.session.userid == 'undefined') { res.redirect('/');}else{
        const { id } = req.params;
        req.getConnection((err, conn) => {
            conn.query('SELECT * FROM storage WHERE id = ?', [id], (err, data) => {
                conn.query('SELECT * FROM room', (err, room) => {
                    res.render('./admin/storageView/storageEdit', {
                        data1: room,
                        data2: data, // Make sure data2 is defined
                        session: req.session
                    });
                });
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
        return res.redirect('/storage/edit/' + req.params.id);
    } else {
        req.session.success = true;
        req.session.topic = "แก้ไขข้อมูลสำเร็จ!";
        const { id } = req.params;
        const data = req.body;
        req.getConnection((err, conn) => {
            conn.query('UPDATE storage SET name=?, room=? WHERE id = ?',[data.name, data.room, id], (err, result) => {
                    if (err) {
                        return res.status(500).json(err);
                    }
                    res.redirect('/storage/list');
                });
            });
        };
    }
};

controller.delete = (req, res) => {
    if (typeof req.session.userid == 'undefined') { res.redirect('/');}else{
        const data = req.body.data;
        res.render('./admin/storageView/confirmstorage', {
            data: data,
            session: req.session
        });
    };
};

controller.delete00 = (req, res) => {
    if (typeof req.session.userid == 'undefined') { res.redirect('/');}else{
        req.session.success = true;
        req.session.topic = "ลบข้อมูลสำเร็จ!";
        const idToDelete = req.params.id;
        req.getConnection((err, conn) => {
            conn.query('DELETE FROM storage WHERE id = ?', [idToDelete], (err, storage) => {
                res.redirect('/storage/list');
            });
        });
    };
};

module.exports = controller;