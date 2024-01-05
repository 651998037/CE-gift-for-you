const controller = {};
const { validationResult } = require('express-validator');

controller.show = (req, res) => {
    if (typeof req.session.userid == 'undefined') { res.redirect('/');}else{
    req.getConnection((err, conn) => {
        conn.query('SELECT s.id as id,d.name as devicetype, do.brand as donationlist, s.amount as amount, p.name as person, s.date as date, s.remainamount as remainamount FROM stocklist as s ' +
            'JOIN person as p on s.person = p.id ' +
            'JOIN devicetype as d on s.devicetype = d.id ' +
            'JOIN donationlist as do on s.donationlist = do.id', (err, stocklist) => {
                if (err) {
                    console.error(err);

                } else {
                    res.render('./admin/stocklistView/stocklistList', {
                        data: stocklist,
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
            conn.query('SELECT id, amount FROM stocklist', (err, stocklist) => {
                conn.query('SELECT id, name FROM person', (err, person) => {
                    conn.query('SELECT id, name FROM devicetype', (err, devicetype) => {
                        conn.query('SELECT id, brand FROM donationlist', (err, donationlist) => {
                            if (err) {
                                return res.status(500).json(err);
                            }
                            res.render('./admin/stocklistView/stocklistAdd', {
                                data1:person,data2:devicetype,data3:donationlist,data:stocklist,session: req.session
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
            return res.redirect('/stocklist/add');
        } else {
            req.session.success = true;
            req.session.topic = "เพิ่มข้อมูลสำเร็จ!";
            const data = req.body;
            const devicetype = data.devicetype;
            const person = data.person;
            const donationlist = data.donationlist;

            const values = [devicetype, donationlist, data.amount, person, data.date, data.remainamount];
            req.getConnection((err, conn) => {
                conn.query('INSERT INTO stocklist (devicetype, donationlist, amount, person, date, remainamount) VALUES (?, ?, ?, ?, ?, ?)', values, (err, result) => {
                    if (err) {
                        console.error(err);
                    } else {
                        return res.redirect('/stocklist/list');
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
            conn.query('SELECT * FROM person', (err, personData) => {
                conn.query('SELECT * FROM devicetype', (err, devicetypeData) => {
                    conn.query('SELECT * FROM donationlist', (err, donationlistData) => {
                        conn.query('SELECT * FROM stocklist WHERE id = ?', [id], (err, stock) => {
                            if (err) {
                                return res.status(500).json(err);
                            }
                            res.render('./admin/stocklistView/stocklistEdit', { 
                                data1: personData, 
                                data2: devicetypeData, 
                                data3: donationlistData, 
                                data4: stock, 
                                session: req.session 
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
                return  res.redirect('/stocklist/edit/'+ req.params.id);
            }else{
                req.session.success=true;
                req.session.topic="แก้ไขข้อมูลสำเร็จ!";
                const idToEdit = req.params.id;
                const data = req.body;
                    req.getConnection((err, conn) => {
                        conn.query('UPDATE stocklist SET ? WHERE id = ?', [data, idToEdit], (err, result) => {
                            res.redirect('/stocklist/list'); 
                        });
                    });
                }
    }
};

controller.delete = (req, res) => {
    if (typeof req.session.userid == 'undefined') { res.redirect('/');}else{
        const data = req.body.data;
        res.render('./admin/stocklistView/confirmDelete', {
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
            conn.query('DELETE FROM stocklist WHERE id = ?', [idToDelete], (err, edit) => {
                res.redirect('/stocklist/list');
            });
        });
    }
};


module.exports = controller;