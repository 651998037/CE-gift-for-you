const controller ={};
const { validationResult } = require('express-validator');

controller.show=(req,res) => {
    if (typeof req.session.userid == 'undefined') { res.redirect('/');}else{
        req.getConnection((err,conn) =>{
            conn.query('SELECT withdraw.id as id,withdraw.withdrawday as withdrawday,p.name as picker,l.person as approvalperson,d.place as donatedplace FROM ce_gift_for_you.withdraw JOIN  ce_gift_for_you.person as p on withdraw.picker=p.id JOIN ce_gift_for_you.listofapprovedpeople as l on withdraw.approvalperson=l.id JOIN ce_gift_for_you.donatedplace as d on withdraw.donatedplace=d.id',(err,withdraw)=>{
                if(err){
                    res.status(500).json(err);
                    return;
                }
                res.render('./admin/withdrawView/withdrawlist',{
                    data:withdraw,session:req.session
                });
            });
        });
    };
};

controller.add = (req, res) => {
    if (typeof req.session.userid == 'undefined') { res.redirect('/');}else{
        req.getConnection((err, conn) => {
            conn.query('SELECT * FROM listofapprovedpeople', (err, listofapprovedpeople) => {
                if (err) {
                    // จัดการข้อผิดพลาดที่นี่หากต้องการ
                    return res.status(500).json(err);
                }
                conn.query('SELECT * FROM donatedplace', (err, donatedplace) => {
                    if (err) {
                        // จัดการข้อผิดพลาดที่นี่หากต้องการ
                        return res.status(500).json(err);
                    }
                {
                conn.query('SELECT * FROM person', (err, person) => {
                    if (err) {
                        // จัดการข้อผิดพลาดที่นี่หากต้องการ
                        return res.status(500).json(err);
                    }
                // ดึงข้อมูล listofapprovedpeople สำเร็จแล้ว ตอนนี้สามารถส่งข้อมูลไปยังหน้า withdrawAdd.ejs ได้
                res.render('./admin/withdrawView/withdrawAdd', {
                    session: req.session,
                    data1: person,
                    data2: listofapprovedpeople, // ส่งข้อมูล listofapprovedpeople ไปยังหน้า withdrawAdd.ejs
                    data3: donatedplace,
                    data4: {}
                });   
            });
        }
    });
});
});


controller.new = (req, res) => {
    if (typeof req.session.userid == 'undefined') { res.redirect('/');}else{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            req.session.errors=errors;
            req.session.success =false;
            return  res.redirect('/withdraw/add')
        }else{
            req.session.success=true;
            req.session.topic="เพิ่มข้อมูลสำเร็จ!";
            const data = req.body; 
            req.getConnection((err, conn) => {
                if (err) {
                        return res.status(500).json(err);
                    }
                    conn.query('INSERT INTO withdraw SET ?', [data], (err, withdrawAdd) => {
                        if (err) {
                            return res.status(500).json(err);
                        }
                        conn.query('SELECT name FROM person', (err, person) => {
                            if (err) {
                                return res.status(500).json(err);
                            }
                            conn.query('SELECT person FROM listofapprovedpeople ', (err, listofapprovedpeople) => {
                                if (err) {
                                    return res.status(500).json(err);
                                }
                            
                                conn.query('SELECT place FROM donatedplace', (err, donatedplace) =>{
                                    if (err) {
                                        return res.status(500).json(err);
                                    }
                                res.redirect('/withdraw/list');
                            });
                        });
                    });
                });
            });
        }
    };
};

controller.delete=(req, res) => {
    if (typeof req.session.userid == 'undefined') { res.redirect('/');}else{
        const data = req.body.data;
        res.render('./admin/withdrawView/confirmwithcomEdit',{
            data:data,session:req.session
        });
    };
};

controller.delete1=(req,res) => {
    if (typeof req.session.userid == 'undefined') { res.redirect('/');}else{
    req.session.success=true;
    req.session.topic="ลบข้อมูลสำเร็จ!";
    const idToDelete = req.params.id;
    req.getConnection((err,conn) =>{
        conn.query('DELETE FROM withdraw WHERE id = ?', [idToDelete], (err,withdraw) => {
            res.redirect('/withdraw/list');
            });
        });
    };

    controller.edit = (req, res) => {
        const idToEdit = req.params.id;
        req.getConnection((err, conn) => {
            conn.query('SELECT * FROM withdraw WHERE id = ?', [idToEdit], (err, data) => {
                req.getConnection((err, conn) => {
                    conn.query('SELECT * FROM person',(err, person) => {
                        conn.query('SELECT * FROM listofapprovedpeople', (err, listofapprovedpeople) => {
                                conn.query('SELECT * FROM donatedplace', (err,donatedplace) => {
                                        res.render('./admin/withdrawView/withdrawEdit', { data1:person,data2:listofapprovedpeople,data3:donatedplace,data4:data,session:req.session });
                                });
                                });
                            });
                        });
                })    
            });
        };
    };
    

// controller.edit=(req,res) => {
//     const data = null;
//     req.getConnection((err, conn) => {
//         conn.query('SELECT * FROM person', (err, picker) => {
//         conn.query('SELECT * FROM listofapprovedpeople', (err, approvalperson) => {
//                 conn.query('SELECT * FROM donatedplace', (err, donatedplace) => {
//                 res.render('withdrawEdit',{
//                     data1:picker,data2:approvalperson,data3:donatedplace,data4:data,session: req.session
//                     });
//                 });
//             });
//         });
//     });
// };

controller.save = (req, res) => {
    if (typeof req.session.userid == 'undefined') { res.redirect('/');}else{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        req.session.errors=errors;
        req.session.success =false;
        return  res.redirect('/withdraw/edit/'+ req.params.id)
    }else{
        req.session.success=true;
        req.session.topic="แก้ไขข้อมูลสำเร็จ!";
        const idToEdit = req.params.id;
        const updatedData = {
        picker: req.body.picker,
        approvalperson: req.body.approvalperson,
        withdrawday: req.body.withdrawday,
        donatedplace: req.body.donatedplace,
    };
    req.getConnection((err, conn) => {
        conn.query('UPDATE withdraw SET ? WHERE id = ?', [updatedData, idToEdit], (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }
            res.redirect('/withdraw/list'); 
        });
        });
    };
}
};
};
};

module.exports=controller;