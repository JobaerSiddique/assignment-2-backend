import { TProducts } from "./product.interface";
import { ProductModel } from "./product.model";



const createProductIntoDB = async (productData: TProducts)=>{
   
   const result = await ProductModel.create(productData)
   return result
}


const getAllProductDB = async(searchItem?:string)=>{
    
  
    if(searchItem){
        // 'i' for case-insensitive
        return await ProductModel.find({
          $or: [
            { name: { $regex: searchItem,$options:'i' } },
            { description: { $regex: searchItem, $options:'i' } },
            { tags: { $regex: searchItem, $options:'i' } }
          ],
          
        });
    }
    else{
        return await ProductModel.find({})
    }
}


const getSingleProductsDB  = async(id:string)=>{
    
    const getProductId = await ProductModel.findById(id)
    
        
    return getProductId;
}

const deleteProductsDB = async(id:string)=>{
    
    const deletedProducts = await ProductModel.findByIdAndDelete(id)
   
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