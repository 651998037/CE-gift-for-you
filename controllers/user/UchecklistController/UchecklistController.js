const controller = {};

const { validationResult } = require('express-validator');

controller.show = (req, res) => {
    req.getConnection((err, conn) => {
        if (err) {
            console.error('Error connecting to database:', err);
            res.status(500).json(err);
            return;
        }

        conn.query('SELECT c.id as id,de.name as dename,d.devicetype, d.brand, d.model, p.name, p.phone, c.amount, c.checkday, c.status FROM checklist as c JOIN donationlist as d ON c.donationlist = d.id JOIN person as p ON c.person = p.id join devicetype as de on d.devicetype = de.id', (err, check) => {
            if (err) {
                console.error('Error executing SQL query:', err);
                res.status(500).json(err);
                return;
            }
            

            res.render('./user/UchecklistView/checklistList2', {
                data: check,
                session: req.session
            });
        });
    });
};

controller.add = (req, res) => {
    const data = null;
    req.getConnection((err, conn) => {
        if (err) {
            console.error('Error connecting to database:', err);
            res.status(500).json(err);
            return;
        }

        conn.query('SELECT id, devicetype, brand, model FROM donationlist', (err, donationlist) => {
            if (err) {
                console.error('Error executing SQL query:', err);
                res.status(500).json(err);
                
                return;
            }
        
            conn.query('SELECT id, name FROM devicetype', (err, devicetypes) => {
                if (err) {
                    console.error('Error executing SQL query:', err);
                    res.status(500).json(err);
                    return;
                }
                
            
                conn.query('SELECT id, name, phone FROM person', (err, person) => {
                    if (err) {
                        console.error('Error executing SQL query:', err);
                        res.status(500).json(err);
                        return;
                    }
            
                    res.render('./user/UchecklistView/UchecklistAdd', {
                        data1: donationlist,
                        data2: person,
                        data3: devicetypes, // ส่งข้อมูลประเภทอุปกรณ์มาใน data3
                        data4: data,
                        session: req.session
                    });
                });
            });
        })
    })
}             

controller.new = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.session.errors = errors;
        req.session.success = false;
        return res.redirect('/Uchecklist/add');
    } else {
        req.session.success = true;
        req.session.topic = "เพิ่มข้อมูลสำเร็จ!";
        const data = req.body;
        const donationlist = data.devicetype;
        const person = data.name;
        const amount = data.amount;
        const checkday = data.checkday;
        const status = data.status;
        const values = [donationlist, person, amount, checkday, status];
        req.getConnection((err, conn) => {
            if (err) {
                console.error('Error connecting to database:', err);
                res.status(500).json(err);
                return;
            }

            conn.query('INSERT INTO checklist (donationlist, person, amount, checkday, status) VALUES (?, ?, ?, ?, ?)', values, (err, checklist) => {
                if (err) {
                    console.error('Error executing SQL query:', err);
                    res.status(500).json(err);
                    return;
                }
                

                res.redirect('/Uchecklist/list');
            });
        });
    }
};

controller.delete = (req, res) => {
    const data = req.body.data;
    res.render('./user/UchecklistView/confirmUchecklistDel', {
        data: data, session: req.session
    });
};

controller.delete00 = (req, res) => {
    const idToDelete = req.params.id;
    req.session.success = true;
    req.session.topic = "ลบข้อมูลสำเร็จ!";
    req.getConnection((err, conn) => {
        if (err) {
            console.error('Error connecting to database:', err);
            res.status(500).json(err);
            return;
        }

        conn.query('DELETE FROM checklist WHERE id = ?', [idToDelete], (err, checklist) => {
            if (err) {
                console.error('Error executing SQL query:', err);
                res.status(500).json(err);
                return;
            }
            res.redirect('/Uchecklist/list');
        });
    });
};

controller.edit = (req, res) => {
    const idToEdit = req.params.id; // เพิ่ม .id เพื่อรับพารามิเตอร์ id ที่ถูกส่งมา
    if (!idToEdit) {
        return res.status(400).send('Invalid ID');
    }

    req.getConnection((err, conn) => {
        if (err) {
            console.error('Error connecting to database:', err);
            res.status(500).json(err);
            return;
        }

        conn.query('SELECT * FROM donationlist', (err, donationlistData) => {
            if (err) {
                console.error('Error executing SQL query:', err);
                res.status(500).json(err);
                return;
            }

            conn.query('SELECT * FROM person', (err, personData) => {
                if (err) {
                    console.error('Error executing SQL query:', err);
                    res.status(500).json(err);
                    return;
                }

                conn.query('SELECT * FROM devicetype', (err, devicetypeData) => { // เพิ่มการดึงข้อมูล devicetype
                    if (err) {
                        console.error('Error executing SQL query:', err);
                        res.status(500).json(err);
                        return;
                    }

                    conn.query('SELECT * FROM checklist WHERE id = ?', [idToEdit], (err, check) => {
                        if (err) {
                            console.error('Error executing SQL query:', err);
                            res.status(500).json(err);
                            return;
                        }

                        if (!check || check.length === 0) {
                            return res.status(404).send('Checklist not found');
                        }

                        res.render('./user/UchecklistView/UchecklistEdit', { data1: donationlistData, data2: personData, data3: devicetypeData, data4: check, session: req.session });
                    });
                });
            });
        });
    });
};



controller.save = (req, res) => {
    const idToEdit = req.params.id;
    if (!idToEdit) {
        return res.status(400).send('Invalid ID');
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.session.errors = errors;
        req.session.success = false;
        return res.redirect('/Uchecklist/edit/' + idToEdit);
    } else {
        req.session.success = true;
        req.session.topic = "แก้ไขข้อมูลสำเร็จ!";
        const updatedData = {
            donationlist: req.body.devicetype,
            person: req.body.name,
            amount: req.body.amount,
            checkday: req.body.checkday,
            status: req.body.status
        };
        req.getConnection((err, conn) => {
            if (err) {
                console.error('Error connecting to database:', err);
                res.status(500).json(err);
                return;
            }

            conn.query('UPDATE checklist SET ? WHERE id = ?', [updatedData, idToEdit], (err, result) => {
                if (err) {
                    console.error('Error executing SQL query:', err);
                    res.status(500).json(err);
                    return;
                }
                res.redirect('/Uchecklist/list');
            }); 
        });
    }
};


module.exports = controller;
