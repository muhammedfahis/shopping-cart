const { response } = require('express');
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
});

router.get('/delete_product/:id',(req,res)=>{
  const ProId = req.params.id;
  productHelper.deleteProducts(ProId).then((response)=>{
    console.log(response);
    res.redirect('/admin');
  })
});

router.get('/edit_product/:id',(req,res)=>{
  productHelper.findAllDetails(req.params.id).then((response)=>{
    res.render('admin_/edit_product',{response})
  })
});

router.post('/upload_product/:id',(req,res)=>{
  productHelper.uploadProduct(req.params.id,req.body).then(()=>{
    res.redirect('/admin/')
    if(req.files.image){
      let image = req.files.image
      image.mv('./public/product-images/'+req.params.id+'.jpg')
    }
  })
})

module.exports = router;
