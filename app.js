const express=require('express');
const body=require('body-parser'); 
const cookie=require('cookie-parser');
const session=require('express-session');
const mysql=require('mysql');
const connection=require('express-myconnection');
const app=express();
const path = require('path');
const upload = require('express-fileupload');

const pr = require('./routes/prRoute');
const user = require('./routes/userRoute');
const media = require('./routes/admin/mediaRoute');
const person = require('./routes/admin/personRoute');
const duty = require('./routes/admin/dutyRoute');
const project = require('./routes/admin/projectRoute');
const listofapprovedpeople = require('./routes/admin/listofapprovedpeopleRoute');
const room = require('./routes/admin/roomRoute');
const ads = require('./routes/admin/adsRoute');
const responsible = require('./routes/admin/responsibleRoute');
const withdrawlist = require('./routes/admin/withdrawlistRoute');
const donateplace = require('./routes/admin/donatedplaceRoute');
const stocklist = require('./routes/admin/stocklistRoute');
const travel = require('./routes/admin/travelRoute');
const storage = require('./routes/admin/storageRoute');
const devicetype = require('./routes/admin/devicetypeRoute');
const edit = require('./routes/admin/editRoute');
const withdraw = require('./routes/admin/withdrawRoute');
const craftandtest = require('./routes/admin/craftandtestRoute');
const deliveryperson = require('./routes/admin/deliverypersonRoute');

// const Ustocklist = require('./routes/user/UstocklistRoute');
const Udonateplace = require('./routes/user/UdonatedplaceRoute');

const Ucraftandtest = require('./routes/user/UcraftandtestRoute');
const Ureport = require('./routes/user/UreportRoute');
const Udeliveryperson = require('./routes/user/UdeliverypersonRoute');
const UchecklistRoutes = require('./routes/user/UchecklistRoute');
const Uedit = require('./routes/user/UeditRoute');
const Uprepare = require('./routes/user/UprepareRoute');
const Umedia = require('./routes/user/UmediaRoute');
const Uads = require('./routes/user/UadsRoute');
const Uroom = require('./routes/user/UroomRoute');
const Utravel = require('./routes/user/UtravelRoute');

app.set('view engine','ejs');
app.set('views','views');
app.use(express.static('public'));
app.use(body.urlencoded({extended: true})); 
app.use(cookie());
app.use(upload());

app.use(session({
    secret:'12',
    resave:true,
    saveUninitialized: true
}));
app.use(connection(mysql, {
    host: 'localhost',
    user: 'chatkamon',
    password: 'Dakar@05052546!',
    port: 3306,
    database: 'ce_gift_for_you'
}, 'single'));

app.use('/',user);
app.use('/',pr);
app.use('/',media);
app.use('/',person);
app.use('/',duty);
app.use('/',project);
app.use('/', listofapprovedpeople);
app.use('/',room);
app.use('/',ads);
app.use('/',responsible);
app.use('/',withdrawlist);
// app.use('/',withdraw);
app.use('/',donateplace);
app.use('/',stocklist);
app.use('/',travel);
app.use('/',storage);
app.use('/',devicetype);
app.use('/',edit);
app.use('/',craftandtest);
app.use('/', deliveryperson);

// app.use('/',Ustocklist);
app.use('/',Udonateplace);
app.use('/',Uprepare);
app.use('/',Ucraftandtest);
app.use('/',Ureport);
app.use('/', Udeliveryperson);
app.use('/', UchecklistRoutes);
app.use('/',Uedit);
app.use('/',Umedia);
app.use('/',Uads);
app.use('/',Uroom);
app.use('/',Utravel);



app.listen('8001');