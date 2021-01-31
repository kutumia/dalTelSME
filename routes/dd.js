const express = require("express");
const router = express.Router();
// const { Router } = require("express");
const app=express();
const {ddsignup,ddsignuppost,ddlogin,ddloginpost,ddDashboard,chakKHa,chakKaFilter,chakKa,bijSale,bijSaleFilter} = require('../controllers/dd.controller');
router.get('/login',ddlogin);
router.post('/logins',ddloginpost);
router.get('/dashboard',ddDashboard);


router.get('/signup',ddsignup);
router.post('/signups',ddsignuppost);

router.get('/chakKa',chakKa);
router.post('/chakKaFilter',chakKaFilter);

router.get('/chakKHa',chakKHa);

router.get('/bijSale',bijSale);
router.post('/bijSaleFilter',bijSaleFilter);


module.exports = router;