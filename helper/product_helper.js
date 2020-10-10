const db = require('../config/connection');
const collection =require('../config/collections');

module.exports ={

    addProduct:(product,callback)=>{
        console.log(product);
        db.get().collection('product').insertOne(product).then((data)=>{
            callback(data.ops[0]._id);
        });
    },
    getProducts:()=>{
        return new Promise(async(resolve,reject)=>{
          var products= await db.get().collection(collection.PRODUCT_COLLECTION).find().toArray()
            resolve(products)
        })
    }
};