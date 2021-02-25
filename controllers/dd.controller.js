const db=require('../models');
const pd = db.pd;
const dd = db.dd;
const ad = db.ad;
const upazilla = db.upazilla;
const chakKa = db.chakKa;
const bijSale = db.bijSale;
const dalSme = db.dalSme;

const jwt= require('jsonwebtoken');
const bcrypt= require('bcryptjs'); 

const { request, response } = require('express');
const express = require('express');



module.exports.ddlogin=async(req,res)=>{
    res.render('dd/login', { title: 'ডাল,তেল ও মসলা বীজ উৎপাদন সংরক্ষণ ও বিতরণ (৩য় পর্যায়) প্রকল্প',msg:'' });
    res.send("log");
};

module.exports.ddloginpost=async(req,res)=>{
    try {
        const uname = req.body.uname;
        const password = req.body.password;
        dd.findAll({ where: {uname: uname} })
        .then(data => {
            if(data.length > 0){
                bcrypt.compare(password,data[0].password,function(err, result) {
                    if(result== true){
                        req.session.type = "dd";
                        req.session.user_id = data[0].id;
                        const id=req.session.user_id;
                        // res.locals.type = req.session.type;
                        // res.locals.user_id = req.session.user_id;
                        console.log("session=", req.session.type,res.locals);
                        // const token=jwt.sign({id},process.env.JWT_SECRET,token{
                        //     expiresIn:process.env.JWT_EXPIRES_IN
                        // });
                        // console.log("the token is :"+)
                        res.redirect('/dd/dashboard');
                    }
                    else{
                        return res.status(200).render('dd/login', { title: 'ডাল,তেল ও মসলা বীজ উৎপাদন সংরক্ষণ ও বিতরণ (৩য় পর্যায়) প্রকল্প',msg:'Please provide a username and password' });
                    }
                });
            }else{
                return res.status(200).render('dd/login', { title: 'ডাল,তেল ও মসলা বীজ উৎপাদন সংরক্ষণ ও বিতরণ (৩য় পর্যায়) প্রকল্প',msg:'Please provide a username and password' });
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

module.exports.ddDashboard = async(req,res) => {
    try{
        var dds=await dd.findOne({where: {id: req.session.user_id}});
        var data=await dalSme.findAll({where: {dd_id: req.session.user_id}});
        console.log("data",data.length,req.session.user_id)
        var upazillas=await upazilla.findAll({where: {dd_id: dds.id}});
        var sumregi=0;
        var sumDealer=0;
        var sumNonDealer=0;
        data.forEach(function(row){ 
            if (row.regi === ""){ }
            else{sumregi=sumregi+1;};
            if (row.uddog === "Yes"){ 
                sumDealer=sumDealer+1; 
               }       
            else if(row.uddog === "No"){ 
                sumNonDealer=sumNonDealer+1;
            }
    });
    
        res.render('dd/dashboard', { title: 'ডাল,তেল ও মসলা বীজ উৎপাদন সংরক্ষণ ও বিতরণ (৩য় পর্যায়) প্রকল্প',msg:'Welcome',dds:dds,records:data,sumNonDealers:sumNonDealer,sumDealers:sumDealer,sumregis:sumregi,upazillas:upazillas });
        }
        catch (err) {
            console.log(err);
        }
};
module.exports.dashboardFilter=async(req,res)=>{
    try{
        var data=await dalSme.findAll({where: {dd_id: req.session.user_id,upazilla_id:req.body.upazilla}});
        console.log("dekhi toh",data,req.body.upazilla)
    res.render('dd/dashboardTable', { title: 'ডাল,তেল ও মসলা বীজ উৎপাদন সংরক্ষণ ও বিতরণ (৩য় পর্যায়) প্রকল্প',msg:'Welcome',records:data},function(err, html) {
        console.log(html);
        res.send(html);
    });
        }

    catch (err) {
            console.log(err);
        }

};
//logIn controller end

//signUp controller
module.exports.ddsignup=async(req,res)=>{
        res.render('dd/signup', { title: 'ডাল,তেল ও মসলা বীজ উৎপাদন সংরক্ষণ ও বিতরণ (৩য় পর্যায়) প্রকল্প',msg:''});
};
module.exports.ddsignuppost=async(req,res)=>{
    try {
        const{district,uname,password,confirmPassword}=req.body;
        const data = await dd.findAll({ where: {uname: uname} })
        if(data.length > 0){
            res.render('dd/signup',{title: 'ডাল,তেল ও মসলা বীজ উৎপাদন সংরক্ষণ ও বিতরণ (৩য় পর্যায়) প্রকল্প',msg:'ERROR: The dd is already enrolled!' })
        }
        else if(password !== confirmPassword){
            return res.render('dd/signup',{title: 'ডাল,তেল ও মসলা বীজ উৎপাদন সংরক্ষণ ও বিতরণ (৩য় পর্যায়) প্রকল্প',msg:'ERROR: Passwords do not match!' })
        }
        else{
            const hashedPassword = await bcrypt.hash(password, 10);
            console.log(hashedPassword);
            try{
                const createdd = await dd.create({
                    district:district,
                    uname: uname,
                    password:hashedPassword,
                    pd_id:1
                    })
                res.render('dd/signup',{title: 'ডাল,তেল ও মসলা বীজ উৎপাদন সংরক্ষণ ও বিতরণ (৩য় পর্যায়) প্রকল্প',msg:'dd Registered Successfully!'})
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
        var upazillass=await upazilla.findAll({where: {dd_id: req.session.user_id}});
        console.log("inside");
        res.render('dd/chakKa/chakKa', { title: 'ছকপত্রঃ- উপজেলার তথ্য',success:'',upazillas:upazillass });
    }
    catch(err){
        console.log("outside",err);
        res.render('dd/chakKa/chakKa', { title: 'ছকপত্রঃ- উপজেলার তথ্য',success:'', upazillas:err });
    }
     
    //  records:result

};

module.exports.chakKaFilter=async(req,res)=>{
    await chakKa.findAll({ 
        where: {year: req.body.year,upazilla_id: req.body.upazilla}
    })
    .then(data => {
        res.render('dd/chakKa/chakKaTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('dd/chakKa/chakKaFilter', { title: 'ছকপত্রঃ- উপজেলার তথ্য',success:'', records: err });
    })

};
//chakKa controller end

//chakKHa controller
module.exports.chakKHa=async(req,res)=>{
    try{
        var upazillass=await upazilla.findAll({where: {dd_id: req.session.user_id}});
        var chakKass=await chakKa.findAll({where: {dd_id: req.session.user_id}});
        var chakKatt=await chakKa.findOne({where: {dd_id: req.session.user_id}});

        console.log("inside");
        res.render('dd/chakKHa/chakKHa', { title: 'ছকপত্রঃ- জেলার তথ্য',success:'',upazillas:upazillass,chakKas:chakKass,chakKat:chakKatt });
    }
    catch(err){
        console.log("outside",err);
        res.render('dd/chakKHa/chakKHa', { title: 'ছকপত্রঃ- জেলার তথ্য',success:'', upazillas:err,chakKas:err,chakKat:err });
    }

};
//chakKHa controller end

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