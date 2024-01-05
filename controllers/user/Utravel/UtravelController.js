const controller ={};
const { validationResult } = require('express-validator');

controller.show=(req,res) => {
    if (typeof req.session.userid == 'undefined') { res.redirect('/');}else{
        req.getConnection((err,conn) =>{
            conn.query('SELECT * FROM travel',(err,travel)=>{
                res.render('./user/travelView/travelList',{
                    data:travel,session:req.session
                });
            });
        });
    } 
};

controller.add = (req, res) => {
    if (typeof req.session.userid == 'undefined') { res.redirect('/');}else{
    res.render('./user/travelView/travelAdd',{
        session:req.session
    });
}};

controller.new = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.session.errors = errors;
        req.session.success = false;
        return res.redirect('/Utravel/add');
    } else {
        req.session.success = true;
        req.session.topic = "เพิ่มข้อมูลสำเร็จ!";
        const data = req.body;

        // Log data to check its correctness
        console.log(data);

        req.getConnection((err, conn) => {
            if (err) {
                console.error(err);
                return res.json(err);
            }

            // Log the SQL query to check its correctness
            const query = 'INSERT INTO travel SET ?';
            console.log(query);

            conn.query(query, [data], (err, travel) => {
                if (err) {
                    console.error(err);
                    return res.json(err);
                }

                res.redirect('/Utravel/list');
            });
        });
    }
};



controller.del=(req, res) => {
    const data = req.body.data;
    res.render('./user/travelView/confirmDel',{
        data:data,session:req.session
    });
};

controller.delete=(req,res) => {
        req.session.success=true;
        req.session.topic="ลบข้อมูลสำเร็จ!";
        const idToDelete = req.params.id;
        req.getConnection((err,conn) =>{
        conn.query('DELETE FROM travel WHERE id = ?', [idToDelete], (err,travel) => {
            res.redirect('/Utravel/list');
            });
        });
    };

controller.edit = (req, res) => {
    const idToEdit = req.params.id;
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM travel WHERE id = ?', [idToEdit], (err, data) => {
            if (err) {
                return res.status(500).json(err);
            }
            res.render('./user/travelView/travelEdit', { data: data[0],session:req.session });
        });
    });
};

controller.save = (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        req.session.errors=errors;
        req.session.success =false;
        return  res.redirect('/UtravelEdit/'+ req.params.id)
    }else{
        req.session.success=true;
        req.session.topic="แก้ไขข้อมูลสำเร็จ!";
        const idToEdit = req.params.id;
        const updatedData = {
        travel: req.body.travel,
    };
    req.getConnection((err, conn) => {
        conn.query('UPDATE travel SET ? WHERE id = ?', [updatedData, idToEdit], (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }
            res.redirect('/Utravel/list'); 
        });
    });
}};

module.exports=controller;
