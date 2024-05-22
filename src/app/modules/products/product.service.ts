import { TProducts } from "./product.interface";
import { ProductModel } from "./product.model";
const ObjectId = require('mongodb').ObjectId;


const createProductIntoDB = async (productData: TProducts)=>{
   
   const result = await ProductModel.create(productData)
   return result
}


const getAllProductDB = async(search?:string)=>{
    const searchItem = await ProductModel.findOne({name:search})
    const allProduct = await ProductModel.find({})
    return {
        searchItem,allProduct
    }
}


const getSingleProductsDB  = async(id:string)=>{
    console.log("id",id)
    const getProductId = await ProductModel.findById(id)
    console.log("getser",getProductId)
        
    return getProductId;
}

const deleteProductsDB = async(id:string)=>{
    
    const deletedProducts = await ProductModel.updateOne({id},{isDeleted:true})
   
    return deletedProducts
}

const getUpdateProductsDB = async(productId:string,updateInfo:any)=>{
    const updatedProducts = await ProductModel.findByIdAndUpdate(productId,updateInfo)
    return updatedProducts;
}


export const productService = {
    createProductIntoDB,
    getAllProductDB,
    getSingleProductsDB,
    deleteProductsDB,
    getUpdateProductsDB
}