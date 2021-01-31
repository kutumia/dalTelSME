const db=require('../models');
const pd = db.pd;
const dd = db.dd;
const ad = db.ad;
const upazilla = db.upazilla;
const chakKa = db.chakKa;
const bijSale = db.bijSale;

const jwt= require('jsonwebtoken');
const bcrypt= require('bcryptjs'); 

const { request, response } = require('express');
const express = require('express');


module.exports.pdlogin=async(req,res)=>{
    res.render('pd/login', { title: 'ডাল,তেল ও মসলা বীজ উৎপাদন সংরক্ষণ ও বিতরণ (৩য় পর্যায়) প্রকল্প',msg:'' });
    res.send("log");
};

module.exports.pdloginpost=async(req,res)=>{
    try {
        const uname = req.body.uname;
        const password = req.body.password;
        pd.findAll({ where: {uname: uname} })
        .then(data => {
            if(data.length > 0){
                bcrypt.compare(password,data[0].password,function(err, result) {
                    if(result== true){
                        req.session.type = "pd";
                        req.session.user_id = data[0].id;
                        const id=req.session.user_id;
                        // res.locals.type = req.session.type;
                        // res.locals.user_id = req.session.user_id;
                        console.log("session=", req.session.type,res.locals);
                        // const token=jwt.sign({id},process.env.JWT_SECRET,token{
                        //     expiresIn:process.env.JWT_EXPIRES_IN
                        // });
                        // console.log("the token is :"+)
                        res.redirect('/pd/dashboard');
                    }
                    else{
                        return res.status(200).render('pd/login', { title: 'ডাল,তেল ও মসলা বীজ উৎপাদন সংরক্ষণ ও বিতরণ (৩য় পর্যায়) প্রকল্প',msg:'Please provide a username and password' });
                    }
                });
            }else{
                return res.status(200).render('pd/login', { title: 'ডাল,তেল ও মসলা বীজ উৎপাদন সংরক্ষণ ও বিতরণ (৩য় পর্যায়) প্রকল্প',msg:'Please provide a username and password' });
            }
        })
        .catch(err => {
              res.status(500).send({
                message:
                  err.message || "Some error occurred while retrieving tutorials."
              });
            });
        // upazilla.findAll({ where: {uname: uname} })
        // .then(data => {
        //     if(data.length > 0){
        //         bcrypt.compareSync(password , upazilla.password, function(err, result) {
        //             if(result== true){
        //                 res.redirect('/upazilla/dashboard');
        //             }
        //             else{
        //                 res.redirect('/upazilla/dashboard');
        //             }
        //         });
        //     }else{
        //         return res.status(200).render('upazilla/login', { title: 'Horticulture Wing Central Management Software',msg:'Please provide a username and password' });
        //     }
        // })
        // .catch(err => {
        //   res.status(500).send({
        //     message:
        //       err.message || "Some error occurred while retrieving tutorials."
        //   });
        // });

        
    }
    catch(error){
        console.log(error);
    } 
};

module.exports.pdDashboard = async(req,res) => {
    console.log("pddashboard",res.locals.type);
    res.render('pd/dashboard', { title: 'ডাল,তেল ও মসলা বীজ উৎপাদন সংরক্ষণ ও বিতরণ (৩য় পর্যায়) প্রকল্প',msg:'Welcome' });
};
//logIn controller end

//signUp controller
module.exports.pdsignup=async(req,res)=>{
    res.render('pd/signup', { title: 'ডাল,তেল ও মসলা বীজ উৎপাদন সংরক্ষণ ও বিতরণ (৩য় পর্যায়) প্রকল্প',msg:'' });
    res.send("log");
};
module.exports.pdsignuppost=async(req,res)=>{
    try {
        const{uname,password,confirmPassword}=req.body;

        const data = await pd.findAll({ where: {uname: uname} })
        if(data.length > 0){
            res.render('pd/signup',{title: 'ডাল,তেল ও মসলা বীজ উৎপাদন সংরক্ষণ ও বিতরণ (৩য় পর্যায়) প্রকল্প',msg:'ERROR: The pd is already enrolled!'})
        }
        else if(password !== confirmPassword){
            return res.render('pd/signup',{title: 'ডাল,তেল ও মসলা বীজ উৎপাদন সংরক্ষণ ও বিতরণ (৩য় পর্যায়) প্রকল্প',msg:'ERROR: Passwords do not match!'})
        }
        else{
            const hashedPassword = await bcrypt.hash(password, 10);
            console.log(hashedPassword);
            try{
                const createpd = await pd.create({
                    uname: uname,
                    password:hashedPassword,
                    pd_id:1
                    })
                res.render('pd/signup',{title: 'ডাল,তেল ও মসলা বীজ উৎপাদন সংরক্ষণ ও বিতরণ (৩য় পর্যায়) প্রকল্প',msg:'pd Registered Successfully!'})
            }
            catch (err) {
                console.log(err);
            }
            
        }
    }
    catch(error){
        console.log(error);
    } 
};
//signUp controller end


//chakKa controller
module.exports.chakKa=async(req,res)=>{
    try{
        var districts=await dd.findAll();
        console.log("inside");
        res.render('pd/chakKa/chakKa', { title: 'ছকপত্রঃ- উপজেলার তথ্য',success:'',district:districts });
    }
    catch(err){
        console.log("outside",err);
        res.render('pd/chakKa/chakKa', { title: 'ছকপত্রঃ- উপজেলার তথ্য',success:''});
    }
     
    //  records:result

};

module.exports.chakKaFilter=async(req,res)=>{
    await chakKa.findAll({ 
        where: {year: req.body.year,upazilla_id: req.body.upazilla}
    })
    .then(data => {
        res.render('pd/chakKa/chakKaTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('pd/chakKa/chakKaYear', { title: 'ছকপত্রঃ- উপজেলার তথ্য',success:'', records: err });
    })

};

module.exports.chakKaDistrictFilter=async(req,res)=>{
    try{
        // var dds=await dd.findAll({where: {id: req.body.district}});
        var upazillass=await upazilla.findAll({where: {dd_id: req.body.district}});
        console.log("inside");
        res.send(upazillass)
    }
    catch(err){
        console.log("outside",err);
        res.render('pd/chakKa/chakKa', { title: 'ছকপত্রঃ- উপজেলার তথ্য',success:'', upazillas:err });
    }
     

};
//chakKa controller end

//chakKHa controller
module.exports.chakKHa=async(req,res)=>{ 
    try{
        var districtss=await dd.findAll({where: {pd_id: req.session.user_id}});
        console.log("inside");
        res.render('pd/chakKHa/chakKHa', { title: 'ছকপত্রঃ- জেলার তথ্য ',success:'',districts:districtss });
    }
    catch(err){
        console.log("outside",err);
        res.render('pd/chakKHa/chakKHa', { title: 'ছকপত্রঃ- জেলার তথ্য ',success:'', districts:err });
    }
     
    //  records:result

};

module.exports.chakKHaFilter=async(req,res)=>{
    
    try{
        var upazillass=await upazilla.findAll({where: {dd_id: req.body.district}});
        var chakKass=await chakKa.findAll({where: {year: req.body.year,dd_id: req.body.district}});
        var chakKatt=await chakKa.findOne({where: {year: req.body.year,dd_id: req.body.district}});

        console.log("inside");
        res.render('pd/chakKHa/chakKHaTable', { title: 'ছকপত্রঃ- জেলার তথ্য',success:'',upazillas:upazillass,chakKas:chakKass,chakKat:chakKatt });
    }
    catch(err){
        console.log("outside",err);
        res.render('pd/chakKHa/chakKHaTable', { title: 'ছকপত্রঃ- জেলার তথ্য',success:'', upazillas:err,chakKas:err,chakKat:err });
    }

};
//chakKHa controller end

//sale controller
module.exports.sale=async(req,res)=>{ 
    try{
        console.log("inside");
        res.render('pd/sale/sale', { title: 'ছকপত্রঃ- উপজেলার তথ্য',success:'' });
    }
    catch(err){
        console.log("outside",err);
    }
     
    //  records:result

};

module.exports.saleFilter=async(req,res)=>{
    var districtss=await dd.findAll();
    var data= await bijSale.findAll({ 
        where: {year: req.body.year}
    });
    try {
        console.log(districtss);
        res.render('pd/sale/saleTable', {records:data,districts:districtss} ,function(err, html) {
            res.send(html);

        });
    }
    catch {
        console.log("outside",err);
    }

};
//sale controller end


//bijSale controller
module.exports.bijSale=async(req,res)=>{ 
    try{
        console.log("inside");
        res.render('dd/bijSale/bijSale', { title: 'ছকপত্রঃ- উপজেলার তথ্য',success:'' });
    }
    catch(err){
        console.log("outside",err);
    }
     
    //  records:result

};

module.exports.bijSaleFilter=async(req,res)=>{
    var upazillass=await upazilla.findAll({ 
        where: {dd_id:req.session.user_id}
    });
    var data= await bijSale.findAll({ 
        where: {year: req.body.year,dd_id:req.session.user_id}
    });
    try {
        res.render('dd/bijSale/bijSaleTable', {records: data,upazillas:upazillass} ,function(err, html) {
            res.send(html);

        });
    }
    catch {
        console.log("outside",err);
    }

};
//bijSale controller end