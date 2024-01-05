const controller ={};
const { validationResult } = require('express-validator');

controller.login = (req, res) => {
    if (typeof req.session.userid !== 'undefined') { res.redirect('/pr');}else{
    res.render('./userView/login',{
        session: req.session
    });
}};

controller.loginPost = (req, res) => {
const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.session.errors=errors;
        req.session.success=false;
        res.render('./userView/login',{session: req.session});
    }else{
        const username=req.body.username;
        const password=req.body.password;
            req.getConnection((err,conn) => {
                conn.query('SELECT * FROM user WHERE username = ? AND password = ?',[username,password],(err,data) =>{
                if(err){
                    res.json(err);
                }else{
                    if(data.length>0){
                    req.session.userid=data[0].id;
                    req.session.mode=data[0].admin;
                    res.redirect('/pr');                    
                }else{
                    res.redirect('/');
                }}
            })
        })
    };
};

controller.logout = (req, res) => {
    req.session.destroy(function(error){
        res.redirect('/');
    })
};

module.exports=controller;