var express = require('express');
var router = express.Router();
var productHelper = require('../helper/product_helper');

/* GET home page. */
router.get('/', function(req, res, next) {
 productHelper.getProducts().then((products)=>{
  res.render('user/view_products', { products });
 })
  
});

module.exports = router;
