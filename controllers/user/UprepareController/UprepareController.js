const controller = {};
const { validationResult } = require('express-validator');

controller.show = (req, res) => {
        if (typeof req.session.userid === 'undefined') {
        res.redirect('/');
    } else {
    req.getConnection((err, conn) => {
        conn.query('SELECT prepare.id, dp.place AS donationplace, dp.address AS address, dp.contactperson AS person, dp.phone AS phone, travel.travel AS travel, prepare.donationday AS donationday FROM prepare JOIN donateplace AS dp ON prepare.donationplace = dp.id JOIN travel ON prepare.travel = travel.id;', (err, prepare) => {
            if (err) {
                res.status(500).json(err);
                return;
            }
            res.render('./user/UprepareView/prepareList2', {
                data: prepare,
                session: req.session,
            });
        });
    });
}
};

controller.add = (req, res) => {
        if (typeof req.session.userid === 'undefined') {
        res.redirect('/');
    } else {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM travel', (err, travel) => {
            if (err) {
                return res.status(500).json(err);
            }
            conn.query('SELECT * FROM donateplace', (err, donateplace) => {
                if (err) {
                    return res.status(500).json(err);
                }
                conn.query('SELECT * FROM prepare', (err, data) => {
                    if (err) {
                        return res.status(500).json(err);
                    }

                res.render('./user/UprepareView/UprepareAdd', {
                    session: req.session,
                    data2: donateplace,
                    data3: travel,
                    data:data
                });
                });
            });
        });
    });
}
};

controller.new = (req, res) => {
    if (typeof req.session.userid === 'undefined') {
        res.redirect('/');
    } else {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.session.errors = errors;
        req.session.success = false;
        return res.redirect('./Uprepare/add');
    } else {
        req.session.success = true;
        req.session.topic = "เพิ่มข้อมูลสำเร็จ!";
        const data = req.body;
        const donationplace = data.donationplace;
        const address = data.address;
        const person = data.person;
        const phone = data.phone;
        const travel = data.travel;
        const values = [donationplace,address,person,phone,travel,data.donationday];
        req.getConnection((err, conn) => {
            if (err) {
                console.error(err);
                return res.status(500).json(err);
            }
        
            
            conn.query('INSERT INTO prepare (donationplace, address, person, phone, travel, donationday ) values (? ,? ,? ,? ,? ,?)', values, (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json(err);
                }
                
                res.redirect('/Uprepare/list');
            });
        });
    }
}
};


controller.edit = (req, res) => {
    const idToEdit = req.params.id;
    const {id} = req.params;

    req.getConnection((err, conn) => {
        if (err) {
            console.error(err);
            return res.status(500).json(err);
        }


        conn.query('SELECT * FROM prepare WHERE id = ?', [idToEdit], (err, prepare) => {
            if (err) {
                console.error(err);
                return res.status(500).json(err);
            }


            conn.query('SELECT * FROM travel', (err, travel) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json(err);
                }
                conn.query('SELECT * FROM donateplace', (err, donateplace) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).json(err);
                    }


                res.render('./user/UprepareView/UprepareEdit', {

                    session: req.session,
                    data: prepare,
                    data2: donateplace,
                    data3: travel,
                });
            });  
          });
        });
    });
};

controller.save = (req, res) => {
    if (typeof req.session.userid === 'undefined') {
        res.redirect('/');
    } else {
    const errors = validationResult(req);
    const idToEdit = req.params.id;

        if (!errors.isEmpty()) {
            req.session.errors=errors;
            req.session.success =false;
            return res.redirect('/Uprepare/edit/'+ idToEdit);
        }else{
            req.session.success=true;
            req.session.topic="แก้ไขข้อมูลสำเร็จ!";
            const idToEdit = req.params.id;
            const data = req.body;

        req.getConnection((err, conn) => {
            conn.query('UPDATE prepare SET ? WHERE id = ?', [data, idToEdit], (err, result) => {
                if (err) {
                    console.error(err); // ลองล็อกข้อผิดพลาดเพื่อดูข้อความผิดพลาดที่คืนมา
                    return res.status(500).json(err);
                }
                console.log(result); // ล็อกผลตอบแทนจากการอัปเดต
                res.redirect('/Uprepare/list');
            });
    
    });
}
}};



controller.delete = (req, res) => {
    if (typeof req.session.userid === 'undefined') {
        res.redirect('/');
    } else {
    const data = req.body.data;
    res.render('./user/UprepareView/confirm', {
        data: data,
        session: req.session
    });
}
};

controller.delete1 = (req, res) => {
    if (typeof req.session.userid === 'undefined') {
        res.redirect('/');
    } else {
    const idToDelete = req.params.id;
    req.session.success = true;
    req.session.topic = "ลบข้อมูลสำเร็จ!";
    req.getConnection((err, conn) => {
        conn.query('DELETE FROM prepare WHERE id = ?', [idToDelete], (err, prepare) => {
            if (err) {
                console.error(err);
                return res.status(500).json(err);
            }
            res.redirect('/Uprepare/list');
        });
    });
}
};

module.exports = controller;