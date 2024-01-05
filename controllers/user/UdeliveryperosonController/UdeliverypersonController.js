const controller ={};
const { validationResult } = require('express-validator');

controller.show=(req,res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT deliveryperson.id,deliveryperson.prepare,n.name as name,n.phone as phone,n.lineid as lineid,n.gender as gender FROM deliveryperson join person as n on deliveryperson.person=n.id',(err, Udeliveryperson) => {
            if (err) {
                res.json(err);
            }
            res.render('./user/UdeliverypersonView/UdeliverypersonList',{
                data:Udeliveryperson,session:req.session
            });
        });
    });
};        

controller.add=(req,res) => {
    const data = null;
    req.getConnection((err, conn) => {
        conn.query('SELECT id, place FROM donateplace', (err, donateplace) => {
        conn.query('SELECT id, donationplace, travel FROM prepare', (err, prepare) => {
            conn.query('SELECT id, name FROM person', (err, person) => {
                    res.render('./user/UdeliverypersonView/UdeliverypersonAdd',{
                    data1:prepare,data2:person,data4:donateplace,data3:data,session: req.session
                    });
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
        return res.redirect('/Udeliveryperson/add');
    } else {
        req.session.success = true;
        req.session.topic = "เพิ่มข้อมูลสำเร็จ!";
        const data = req.body;
        const donateplace = data.place;
        const prepare = data.donationplace;
        const person = data.name;
        const values = [donateplace, prepare, person];
        req.getConnection((err, conn) => {
            // แทรกข้อมูลในตาราง donateplace
            conn.query('INSERT INTO donateplace (place) VALUES (?)', donateplace, (err, result) => {
                if (err) {
                    return res.status(500).json(err);
                }
                // แทรกข้อมูลในตาราง deliveryperson
                conn.query('INSERT INTO deliveryperson (prepare, person) VALUES (?, ?)', [prepare, person], (err, deliveryperson) => {
                    if (err) {
                        return res.status(500).json(err);
                    }
                    return res.redirect('/Udeliveryperson/list');
                });
            });
        });
    }
};

controller.edit = (req, res) => {
    const {id} = req.params; 
        req.getConnection((err, conn) => {
            conn.query('SELECT * FROM donateplace', (err, donateplace) => {
            conn.query('SELECT * FROM prepare', (err, prepare) => {
                conn.query('SELECT * FROM person', (err, person) => {
                        conn.query('SELECT * FROM deliveryperson WHERE id = ?',[id], (err, deliveryperson) => {
                        res.render('./user/UdeliverypersonView/UdeliverypersonEdit',{
                        data1:prepare,data2:person,data4:donateplace,data3:deliveryperson,session:req.session
                        });
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
            return res.redirect('/Udeliveryperson/edit/' + req.params.id);
        } else {
            req.session.success = true;
            req.session.topic = "แก้ไขข้อมูลสำเร็จ!";
            const { id } = req.params;
            const data = req.body;
            const donateplace = data.place;
            const prepare = data.donationplace; 
            const person = data.name;
            req.getConnection((err, conn) => {
                // อัปเดตข้อมูลในตาราง deliveryperson
                conn.query('UPDATE deliveryperson SET prepare=?, person=? WHERE id = ?', [prepare, person, id], (err) => {
                    if (err) {
                        return res.status(500).json(err);
                    }
                    // อัปเดตข้อมูลในตาราง donateplace
                    conn.query('UPDATE donateplace SET place=? WHERE id = ?', [donateplace, id], (err) => {
                        if (err) {
                            return res.status(500).json(err);
                        }
                        res.redirect('/Udeliveryperson/list');
                    });
                });
            });
        }
    };
controller.delete=(req, res) => {
    const data = req.body.data;
    res.render('./user/UdeliverypersonView/confirmDel',{
        data:data,session:req.session
    });
};

controller.delete39 =(req,res) => {
    req.session.success=true;
    req.session.topic="ลบข้อมูลสำเร็จ!";
    const idToDelete = req.params.id;
    req.getConnection((err,conn) =>{
        conn.query('DELETE FROM deliveryperson  WHERE id = ?', [idToDelete], (err,deliveryperson ) => {
            if (err) {
                res.json(err);
            }
            res.redirect('/Udeliveryperson/list');
            });
        });
    };


module.exports=controller;