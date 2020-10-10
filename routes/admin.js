var express = require('express');
var router = express.Router();
var productHelper = require('../helper/product_helper');

/* GET users listing. */
router.get('/', function(req, res, next) {

  productHelper.getProducts().then((products)=>{  
  res.render('admin_/view_products',{admin:true,products})
})
});

router.get('/add_product',(req,res)=>{
  res.render('admin_/add_product',{admin:true})
});

router.post('/add_product',(req,res)=>{
  
  
  productHelper.addProduct(req.body,(id)=>{
    console.log(id);
    const image = req.files.image;
    image.mv('./public/product-images/'+id+'.jpg',(err,done)=>{
      if(!err){
        res.render('admin_/add_product');
      }else{
        console.log(err);
      }
    });
   
  });
})

module.exports = router;
