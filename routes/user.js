const { response } = require('express');
var express = require('express');
var router = express.Router();
var productHelper = require('../helper/product_helper');
var userHelper = require('../helper/user_helper');


// middlewares

const redirectLogin = (req,res,next) =>{
  if(req.session.user){
    next()
  }else{
    res.redirect('/login')
  }
}

/* GET home page. */
router.get('/', function(req, res, next) {
 let user = req.session.user
   
 productHelper.getProducts().then((products)=>{
  res.render('user/view_products', { products,user });
 })
  
});

router.get('/login',(req,res)=>{
  if(req.session.user){
    res.redirect('/');
  }else{

    res.render('user/userLogin',{err:req.session.loginErr});
    req.session.loginErr = false;
  }
});
router.get('/signup',(req,res)=>{
  res.render('user/user_signup');
});

router.post('/signup',(req,res)=>{
  userHelper.doSignUp(req.body).then((data)=>{
    res.redirect('/login');
  })
});

router.post('/login',(req,res)=>{
  
  userHelper.doLogin(req.body).then((response)=>{
    if(response.status){
      req.session.loggedIn = true;
      req.session.user =response.user;
      res.redirect('/');
    }else{
      req.session.loginErr = 'invalid username or password'
      res.redirect('/login');
    }
  })
});

router.get('/logout',(req,res)=>{
  req.session.destroy();
  res.clearCookie('connect.sid');
  res.redirect('/');
});

router.get('/cart',redirectLogin,(req,res)=>{
  res.render('user/cart');
})

module.exports = router;
