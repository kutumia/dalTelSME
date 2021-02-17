const express = require("express");
const router = express.Router();
// const { Router } = require("express");
const app=express();

const {upazillasignup,upazillasignuppost,upazillalogin,upazillaloginpost,upazillaDashboard,
    chakKa,chakKaYear,chakKaForm,chakKaFormPost,chakKaEdit,chakKaDelete,
bijSale,bijSaleYear,bijSaleForm,bijSaleFormPost,bijSaleEdit,bijSaleDelete,
dalSmeForm,dalSmeFormPost,dalSmeEdit,dalSmeDelete} = require('../controllers/upazilla.controller');
router.get('/login',upazillalogin);
router.post('/logins',upazillaloginpost);
router.get('/dashboard',upazillaDashboard);

router.get('/signup',upazillasignup);
router.post('/signups',upazillasignuppost);

router.get('/chakKa',chakKa);
router.post('/chakKaYear',chakKaYear);
router.get('/chakKaForm',chakKaForm);
router.post('/chakKaFormPost',chakKaFormPost);
router.get('/chakKaEdit/:id',chakKaEdit);
router.post('/chakKaDelete/:id',chakKaDelete);

router.get('/bijSale',bijSale);
router.post('/bijSaleYear',bijSaleYear);
router.get('/bijSaleForm',bijSaleForm);
router.post('/bijSaleFormPost',bijSaleFormPost);
router.get('/bijSaleEdit/:id',bijSaleEdit);
router.post('/bijSaleDelete/:id',bijSaleDelete);

router.get('/dalSmeForm',dalSmeForm);
router.post('/dalSmeFormPost',dalSmeFormPost);
router.get('/dalSmeEdit/:id',dalSmeEdit);
router.get('/dalSmeDelete/:id',dalSmeDelete);

module.exports = router;