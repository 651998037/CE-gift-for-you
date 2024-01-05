const controller = {};
const { validationResult } = require('express-validator');

controller.show = (req, res) => {
    if (typeof req.session.userid == 'undefined') { res.redirect('/');}else{
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM project', (err, projects) => {
            if (err) {
                res.status(500).json(err);
                return;
            }
            res.render('./admin/projectView/projectList', {
                data: projects,
                session: req.session
            });
        });
    });
}};

controller.add = (req, res) => {
    if (typeof req.session.userid == 'undefined') { res.redirect('/');}else{
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM project', (err, per) => {
                res.render('./admin/projectView/projectAdd', { 
                    data1:per,data2: null ,session: req.session
                });
            });
        }
    );   
}};

controller.new = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.session.errors = errors;
        req.session.success = false;
        return res.redirect('/project/add');
    } else {
        req.session.success = true;
        req.session.topic = "เพิ่มข้อมูลสำเร็จ!";
        const data = req.body;
        req.getConnection((err, conn) => {
            conn.query('INSERT INTO project SET ?', [data], (err, result) => {
                if (err) {
                    res.json(err);
                } else {
                    req.session.success = true;
                    req.session.topic = "เพิ่มข้อมูลสำเร็จ!";
                    res.redirect('/project/list');
                }
            });
        });
    }
};


controller.edit = (req, res) => {
    if (typeof req.session.userid == 'undefined') { res.redirect('/');}else{
    const { id } = req.params;
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM project WHERE id = ?', id, (err, project) => {
            if (err) {
                return res.status(500).json(err);
            }
            res.render('./admin/projectView/projectedit', {
                data: project,
                session: req.session
            });
        });
    });
}};

controller.save = (req, res) => {
    const errors = validationResult(req);
    const idToEdit = req.params.id;
    if (!errors.isEmpty()) {
        req.session.errors = errors;
        req.session.success = false;
        return res.redirect('/project/edit/' + idToEdit);
    } else {
        req.session.success = true;
        req.session.topic = "แก้ไขข้อมูลสำเร็จ!";
        const updatedData = {
            projectname: req.body.projectname
        };
        req.getConnection((err, conn) => {
            conn.query('UPDATE project SET ? WHERE id = ?', [updatedData, idToEdit], (err, result) => {
                if (err) {
                    return res.status(500).json(err);
                }
                res.redirect('/project/list');
            });
        });
    }
};




controller.del = (req, res) => {
    if (typeof req.session.userid == 'undefined') { res.redirect('/');}else{
    const data = req.body.data;
    res.render('./admin/projectView/confirmDel', {
        data: data,
        session: req.session
    });
}};

controller.delete = (req, res) => {
    req.session.success = true;
    req.session.topic = "ลบข้อมูลสำเร็จ!";
    const idToDelete = req.params.id;
    req.getConnection((err, conn) => {
        conn.query('DELETE FROM project  WHERE id = ?', [idToDelete], (err, result) => {
            if (err) {
                res.json(err);
            }
            res.redirect('/project/list');
        });
    });
};

module.exports = controller;
