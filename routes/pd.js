const express = require("express");
const router = express.Router();
// const { Router } = require("express");
const app=express();

const {pdsignup,pdsignuppost,pdlogin,pdloginpost,pdDashboard,chakKa,chakKaFilter,chakKHa,dashboardFilter,dashboardDistrictFilter,chakKHaFilter,chakKaDistrictFilter,bijSale,bijSaleFilter,sale,saleFilter} = require('../controllers/pd.controller');
router.get('/login',pdlogin);
router.post('/logins',pdloginpost);
router.get('/dashboard',pdDashboard);
router.post('/dashboardFilter',dashboardFilter);
router.post('/dashboardDistrictFilter',dashboardDistrictFilter);

router.get('/signup',pdsignup);
router.post('/signups',pdsignuppost);

router.get('/chakKa',chakKa);
router.post('/chakKaDistrictFilter',chakKaDistrictFilter);
router.post('/chakKaFilter',chakKaFilter);

router.get('/chakKHa',chakKHa);
router.post('/chakKHaFilter',chakKHaFilter);

router.get('/bijSale',bijSale);
router.post('/bijSaleFilter',bijSaleFilter);

router.get('/sale',sale);
router.post('/saleFilter',saleFilter);

module.exports = router;