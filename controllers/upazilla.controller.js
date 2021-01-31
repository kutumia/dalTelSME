const db=require('../models');
const pd = db.pd;
const dd = db.dd;     
const upazilla = db.upazilla;
const chakKa = db.chakKa;
const bijSale = db.bijSale;


const jwt= require('jsonwebtoken');
const bcrypt= require('bcryptjs'); 

const { request, response } = require('express');
const express = require('express');

module.exports.upazillalogin=async(req,res)=>{
    res.render('upazilla/login', { title: 'ডাল,তেল ও মসলা বীজ উৎপাদন সংরক্ষণ ও বিতরণ (৩য় পর্যায়) প্রকল্প',msg:'' });
    res.send("log");
};

module.exports.upazillaloginpost=async(req,res)=>{
    try {
        const uname = req.body.uname;
        const password = req.body.password;
        upazilla.findAll({ where: {uname: uname} })
        .then(data => {
            if(data.length > 0){
                bcrypt.compare(password,data[0].password,function(err, result) {
                    if(result== true){
                        req.session.type = "upazilla";
                        req.session.user_id = data[0].id;
                        const id=req.session.user_id;
                        // res.locals.type = req.session.type;
                        // res.locals.user_id = req.session.user_id;
                        console.log("session=", req.session.type,res.locals);
                        // const token=jwt.sign({id},process.env.JWT_SECRET,token{
                        //     expiresIn:process.env.JWT_EXPIRES_IN
                        // });
                        // console.log("the token is :"+)
                        res.redirect('/upazilla/dashboard');
                    }
                    else{
                        return res.status(200).render('upazilla/login', { title: 'ডাল,তেল ও মসলা বীজ উৎপাদন সংরক্ষণ ও বিতরণ (৩য় পর্যায়) প্রকল্প',msg:'Please provide a username and password' });
                    }
                });
            }else{
                return res.status(200).render('upazilla/login', { title: 'ডাল,তেল ও মসলা বীজ উৎপাদন সংরক্ষণ ও বিতরণ (৩য় পর্যায়) প্রকল্প',msg:'Please provide a username and password' });
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

module.exports.upazillaDashboard = async(req,res) => {
    console.log("upazilladashboard",res.locals.type);
    res.render('upazilla/dashboard', { title: 'ডাল,তেল ও মসলা বীজ উৎপাদন সংরক্ষণ ও বিতরণ (৩য় পর্যায়) প্রকল্প',msg:'Welcome' });
};
//logIn controller end

//signUp controller
module.exports.upazillasignup=async(req,res)=>{
    await dd.findAll()
    .then(data => {
        console.log("inside");
        res.render('upazilla/signup', { title: 'ডাল,তেল ও মসলা বীজ উৎপাদন সংরক্ষণ ও বিতরণ (৩য় পর্যায়) প্রকল্প',msg:'',records: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('upazilla/signup', { title: 'ডাল,তেল ও মসলা বীজ উৎপাদন সংরক্ষণ ও বিতরণ (৩য় পর্যায়) প্রকল্প',msg:'',records: err });
    })
};
module.exports.upazillasignuppost=async(req,res)=>{
    try {
        const{dds,uname,password,confirmPassword}=req.body;
        const ddata=await dd.findAll();
        const data = await upazilla.findAll({ where: {uname: uname} });
        
        if(data.length > 0){
            res.render('upazilla/signup',{title: 'ডাল,তেল ও মসলা বীজ উৎপাদন সংরক্ষণ ও বিতরণ (৩য় পর্যায়) প্রকল্প',msg:'ERROR: The upazilla is already enrolled!',records: ddata})
        }
        else if(password !== confirmPassword){
           res.render('upazilla/signup',{title: 'ডাল,তেল ও মসলা বীজ উৎপাদন সংরক্ষণ ও বিতরণ (৩য় পর্যায়) প্রকল্প',msg:'ERROR: Passwords do not match!',records: ddata})
        }
        else{
            const hashedPassword = await bcrypt.hash(password, 10);
            console.log(hashedPassword);
            try{
                const createupazilla = await upazilla.create({
                    uname: uname,
                    password:hashedPassword,
                    dd_id:dds,
                    pd_id:1
                    })
                res.render('upazilla/signup',{title: 'ডাল,তেল ও মসলা বীজ উৎপাদন সংরক্ষণ ও বিতরণ (৩য় পর্যায়) প্রকল্প',msg:'upazilla Registered Successfully!',records: ddata})
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
        var upazillas=await upazilla.findOne({where: {id: req.session.user_id}});
        var chakkass=await chakKa.findAll({where: {upazilla_id: req.session.user_id}})
        console.log("inside");
        res.render('upazilla/chakKa/chakKa', { title: `ছকপত্রঃ- ${upazillas.upazilla} উপজেলার তথ্য `,success:'',records: chakkass });
    }
    catch(err){
        console.log("outside",err);
        res.render('upazilla/chakKa/chakKa', { title: `ছকপত্রঃ- উপজেলার তথ্য `,success:'', districts:err });
    }
    //  records:result

};

module.exports.chakKaYear=async(req,res)=>{
    await chakKa.findAll({
        where: {year: req.body.year,upazilla_id: req.session.user_id}
    })
    .then(data => {
        res.render('upazilla/chakKa/chakKaTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('upazilla/chakKa/chakKaYear', { title: `ছকপত্রঃ- উপজেলার তথ্য `,success:'', records: err });
    })

};

module.exports.chakKaForm=async(req,res)=>{
    var upazillass=await upazilla.findOne({
        where: {id: req.session.user_id}
    })
    res.render('upazilla/chakKa/chakKaForm', { title: 'ছকপত্রঃ- উপজেলার তথ্য',msg:'' ,success:'',upazillas:upazillass,user_id: req.session.user_id});
};

module.exports.chakKaFormPost=async(req,res)=>{
    var name= req.body.name;
    var moshur= req.body.moshur;
    var moshurAbadi= req.body.moshurAbadi;
    var mug= req.body.mug;
    var mugAbadi= req.body.mugAbadi;
    var mashkolai= req.body.mashkolai;
    var mashkolaiAbadi= req.body.mashkolaiAbadi;
    var kheshari= req.body.kheshari;
    var kheshariAbadi= req.body.kheshariAbadi;
    var felon= req.body.felon;
    var felonAbadi= req.body.felonAbadi;
    var arohor= req.body.arohor;
    var arohorAbadi= req.body.arohorAbadi;
    var shorisha= req.body.shorisha;
    var shorishaAbadi= req.body.shorishaAbadi;
    var til= req.body.til;
    var tilAbadi= req.body.tilAbadi;
    var soyabean= req.body.soyabean;
    var soyabeanAbadi= req.body.soyabeanAbadi;
    var chinabadam= req.body.chinabadam;
    var chinabadamAbadi= req.body.chinabadamAbadi;
    var sunflower= req.body.sunflower;
    var sunflowerAbadi= req.body.sunflowerAbadi;
    var onion= req.body.onion;
    var onionAbadi= req.body.onionAbadi;
    var roshun= req.body.roshun;
    var roshunAbadi= req.body.roshunAbadi;
    var holud= req.body.holud;
    var holudAbadi= req.body.holudAbadi;
    var morich= req.body.morich;
    var morichAbadi= req.body.morichAbadi;
    var ada= req.body.ada;
    var adaAbadi= req.body.adaAbadi;
    var dhonia= req.body.dhonia;
    var dhoniaAbadi= req.body.dhoniaAbadi;
    var kalojira= req.body.kalojira;
    var kalojiraAbadi= req.body.kalojiraAbadi;
    
    var bikolpo= req.body.bikolpo;
    var comment= req.body.comment;
    var year =req.body.year;
    var user_id =req.body.user_id;
    var dd_id =req.body.dd;

    await chakKa.create({
        name: name,
        moshur:moshur,
        moshurAbadi:moshurAbadi,
        mug:mug,
        mugAbadi:mugAbadi,
        mashkolai:mashkolai,
        mashkolaiAbadi:mashkolaiAbadi,
        kheshari:kheshari,
        kheshariAbadi:kheshariAbadi,
        felon:felon,
        felonAbadi:felonAbadi,
        arohor:arohor,
        arohorAbadi:arohorAbadi,
        shorisha:shorisha,
        shorishaAbadi:shorishaAbadi,
        til:til,
        tilAbadi:tilAbadi,
        soyabean:soyabean,
        soyabeanAbadi:soyabeanAbadi,
        chinabadam:chinabadam,
        chinabadamAbadi:chinabadamAbadi,
        sunflower:sunflower,
        sunflowerAbadi:sunflowerAbadi,
        onion:onion,
        onionAbadi:onionAbadi,
        roshun:roshun,
        roshunAbadi:roshunAbadi,
        holud:holud,
        holudAbadi:holudAbadi,
        morich:morich,
        morichAbadi:morichAbadi,
        ada:ada,
        adaAbadi:adaAbadi,
        dhonia:dhonia,
        dhoniaAbadi:dhoniaAbadi,
        kalojira:kalojira,
        kalojiraAbadi:kalojiraAbadi,

        bikolpo:bikolpo,
        comment:comment,
        
        year:year,
        upazilla_id:user_id,
        dd_id:dd_id 
    })   
        
        .then(data => {
            res.redirect('/upazilla/chakKa');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};
module.exports.chakKaEdit=async(req,res)=>{
    var id=req.params.id;
    console.log('id',id);
    res.render('upazilla/chakKa/chakKaForm', { title: 'ছকপত্রঃ- উপজেলার তথ্য',msg:'' ,success:'',user_id: req.session.user_id});
};

module.exports.chakKaDelete=async(req,res)=>{
    
            res.redirect('/upazilla/chakKa');
        
  
};
//chakKa controller end

//bijSale controller
module.exports.bijSale=async(req,res)=>{
    try{
        var upazillas=await upazilla.findOne({where: {id: req.session.user_id}});
        var bijSaless=await bijSale.findAll({where: {upazilla_id: req.session.user_id}})
        console.log("inside");
        res.render('upazilla/bijSale/bijSale', { title: `ছকপত্রঃ- ${upazillas.upazilla} উপজেলার তথ্য `,success:'',records: bijSaless });
    }
    catch(err){
        console.log("outside",err);
        res.render('upazilla/bijSale/bijSale', { title: `ছকপত্রঃ- উপজেলার তথ্য `,success:'', districts:err });
    }
    //  records:result

};

module.exports.bijSaleYear=async(req,res)=>{
    await bijSale.findAll({
        where: {year: req.body.year,upazilla_id: req.session.user_id}
    })
    .then(data => {
        res.render('upazilla/bijSale/bijSaleTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('upazilla/bijSale/bijSaleYear', { title: `ছকপত্রঃ- উপজেলার তথ্য `,success:'', records: err });
    })

};

module.exports.bijSaleForm=async(req,res)=>{
    var upazillass=await upazilla.findOne({
        where: {id: req.session.user_id}
    })
    res.render('upazilla/bijSale/bijSaleForm', { title: 'ছকপত্রঃ- উপজেলার তথ্য',msg:'' ,success:'',upazillas:upazillass,user_id: req.session.user_id});
};

module.exports.bijSaleFormPost=async(req,res)=>{
    var number= req.body.number;

    var moshur= req.body.moshur;
    console.log(moshur);
    var moshurAmount= req.body.moshurAmount;
    var moshurSale= req.body.moshurSale;
    var moshurBlock= req.body.moshurBlock;

    var mug= req.body.mug;
    var mugAmount= req.body.mugAmount;
    var mugSale= req.body.mugSale;
    var mugBlock= req.body.mugBlock;

    var mashkolai= req.body.mashkolai;
    var mashkolaiAmount= req.body.mashkolaiAmount;
    var mashkolaiSale= req.body.mashkolaiSale;
    var mashkolaiBlock= req.body.mashkolaiBlock;

    var kheshari= req.body.kheshari;
    var kheshariAmount= req.body.kheshariAmount;
    var kheshariSale= req.body.kheshariSale;
    var kheshariBlock= req.body.kheshariBlock;

    var felon= req.body.felon;
    var felonAmount= req.body.felonAmount;
    var felonSale= req.body.felonSale;
    var felonBlock= req.body.felonBlock;

    var arohor= req.body.arohor;
    var arohorAmount= req.body.arohorAmount;
    var arohorSale= req.body.arohorSale;
    var arohorBlock= req.body.arohorBlock;

    var shorisha= req.body.shorisha;
    var shorishaAmount= req.body.shorishaAmount;
    var shorishaSale= req.body.shorishaSale;
    var shorishaBlock= req.body.shorishaBlock;

    var til= req.body.til;
    var tilAmount= req.body.tilAmount;
    var tilSale= req.body.tilSale;
    var tilBlock= req.body.tilBlock;

    var soyabean= req.body.soyabean;
    var soyabeanAmount= req.body.soyabeanAmount;
    var soyabeanSale= req.body.soyabeanSale;
    var soyabeanBlock= req.body.soyabeanBlock;

    var chinabadam= req.body.chinabadam;
    var chinabadamAmount= req.body.chinabadamAmount;
    var chinabadamSale= req.body.chinabadamSale;
    var chinabadamBlock= req.body.chinabadamBlock;

    var sunflower= req.body.sunflower;
    var sunflowerAmount= req.body.sunflowerAmount;
    var sunflowerSale= req.body.sunflowerSale;
    var sunflowerBlock= req.body.sunflowerBlock;

    var onion= req.body.onion;
    var onionAmount= req.body.onionAmount;
    var onionSale= req.body.onionSale;
    var onionBlock= req.body.onionBlock;

    var roshun= req.body.roshun;
    var roshunAmount= req.body.roshunAmount;
    var roshunSale= req.body.roshunSale;
    var roshunBlock= req.body.roshunBlock;

    var holud= req.body.holud;
    var holudAmount= req.body.holudAmount;
    var holudSale= req.body.holudSale;
    var holudBlock= req.body.holudBlock;

    var morich= req.body.morich;
    var morichAmount= req.body.morichAmount;
    var morichSale= req.body.morichSale;
    var morichBlock= req.body.morichBlock;

    var ada= req.body.ada;
    var adaAmount= req.body.adaAmount;
    var adaSale= req.body.adaSale;
    var adaBlock= req.body.adaBlock;

    var dhonia= req.body.dhonia;
    var dhoniaAmount= req.body.dhoniaAmount;
    var dhoniaSale= req.body.dhoniaSale;
    var dhoniaBlock= req.body.dhoniaBlock;

    var kalojira= req.body.kalojira;
    var kalojiraAmount= req.body.kalojiraAmount;
    var kalojiraSale= req.body.kalojiraSale;
    var kalojiraBlock= req.body.kalojiraBlock;


    var comment= req.body.comment;
    var year =req.body.year;
    var user_id =req.body.user_id;
    var dd_id =req.body.dd;

    await bijSale.create({
        number: number,
        moshur:moshur,
        moshurAmount:moshurAmount,
        moshurSale:moshurSale,
        moshurBlock:moshurBlock,

        mug:mug,
        mugAmount:mugAmount,
        mugSale:mugSale,
        mugBlock:mugBlock,

        mashkolai:mashkolai,
        mashkolaiAmount:mashkolaiAmount,
        mashkolaiSale:mashkolaiSale,
        mashkolaiBlock:mashkolaiBlock,

        kheshari:kheshari,
        kheshariAmount:kheshariAmount,
        kheshariSale:kheshariSale,
        kheshariBlock:kheshariBlock,

        felon:felon,
        felonAmount:felonAmount,
        felonSale:felonSale,
        felonBlock:felonBlock,

        arohor:arohor,
        arohorAmount:arohorAmount,
        arohorSale:arohorSale,
        arohorBlock:arohorBlock,

        shorisha:shorisha,
        shorishaAmount:shorishaAmount,
        shorishaSale:shorishaSale,
        shorishaBlock:shorishaBlock,

        til:til,
        tilAmount:tilAmount,
        tilSale:tilSale,
        tilBlock:tilBlock,

        soyabean:soyabean,
        soyabeanAmount:soyabeanAmount,
        soyabeanSale:soyabeanSale,
        soyabeanBlock:soyabeanBlock,

        chinabadam:chinabadam,
        chinabadamAmount:chinabadamAmount,
        chinabadamSale:chinabadamSale,
        chinabadamBlock:chinabadamBlock,

        sunflower:sunflower,
        sunflowerAmount:sunflowerAmount,
        sunflowerSale:sunflowerSale,
        sunflowerBlock:sunflowerBlock,

        onion:onion,
        onionAmount:onionAmount,
        onionSale:onionSale,
        onionBlock:onionBlock,

        roshun:roshun,
        roshunBlock:roshunBlock,
        roshunSale:roshunSale,
        roshunAmount:roshunAmount,

        holud:holud,
        holudAmount:holudAmount,
        holudSale:holudSale,
        holudBlock:holudBlock,

        morich:morich,
        morichAmount:morichAmount,
        morichSale:morichSale,
        morichBlock:morichBlock,

        ada:ada,
        adaAmount:adaAmount,
        adaSale:adaSale,
        adaBlock:adaBlock,

        dhonia:dhonia,
        dhoniaAmount:dhoniaAmount,
        dhoniaSale:dhoniaSale,
        dhoniaBlock:dhoniaBlock,

        kalojira:kalojira,
        kalojiraAmount:kalojiraAmount,
        kalojiraSale:kalojiraSale,
        kalojiraBlock:kalojiraBlock,


        comment:comment,
        
        year:year,
        upazilla_id:user_id,
        dd_id:dd_id 
    })   
        
        .then(data => {
            res.redirect('/upazilla/bijSale');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};
module.exports.bijSaleEdit=async(req,res)=>{
    var id=req.params.id;
    console.log('id',id);
    res.render('upazilla/bijSale/bijSaleForm', { title: 'ছকপত্রঃ- উপজেলার তথ্য',msg:'' ,success:'',user_id: req.session.user_id});
};

module.exports.bijSaleDelete=async(req,res)=>{
    
            res.redirect('/upazilla/bijSale');
        
  
};
//bijSale controller end
