const db = require('../config/connection');
const collection =require('../config/collections');
const { response } = require('express');
const objectId = require("mongodb").ObjectId

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
    },
    deleteProducts:(proId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.PRODUCT_COLLECTION).removeOne({_id:objectId(proId)}).then((response)=>{
                console.log(response);
                resolve(response)
            })
        })
    },
    findAllDetails:(proId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.PRODUCT_COLLECTION).findOne({_id:objectId(proId)}).then((response)=>{
                resolve(response);
            })
        })
    },
    uploadProduct:(proId,productDetails)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.PRODUCT_COLLECTION).updateOne({_id:objectId(proId)},
            {$set:{
                name:productDetails.name,
                category:productDetails.category,
                description:productDetails.description,
                price:productDetails.price
            }}).then(()=>{
                resolve()
        })
        })
    }
};