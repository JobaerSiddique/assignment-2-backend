import { TProducts } from "./product.interface";
import { ProductModel } from "./product.model";



const createProductIntoDB = async (productData: TProducts)=>{
   
   const result = await ProductModel.create(productData)
   return result
}


const getAllProductDB = async(searchItem?:string)=>{
    
  console.log(searchItem)
    if(searchItem){
        // 'i' for case-insensitive
        return await ProductModel.find({
          $or: [
            { name: { $regex: searchItem,$options:'i' } },
            { description: { $regex: searchItem, $options:'i' } },
            { tags: { $regex: searchItem, $options:'i' } }
          ],
          isDeleted: false
        });
    }
    else{
        return await ProductModel.find({})
    }
}


const getSingleProductsDB  = async(id:string)=>{
    console.log("id",id)
    const getProductId = await ProductModel.findById(id)
    console.log("getser",getProductId)
        
    return getProductId;
}

const deleteProductsDB = async(id:string)=>{
    
    const deletedProducts = await ProductModel.updateOne({_id:id},{
        $set:{isDeleted:true}
    })
   
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