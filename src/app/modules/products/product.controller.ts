import { Request, Response } from "express";
import { ProductValidationSchema } from "./product.zod";
import { productService } from "./product.service";
import { ProductModel } from "./product.model";



const CreateProducts = async(req:Request,res:Response)=>{
    try {
        const proudcts= req.body
        console.log(proudcts)
        const vaildationProduct = ProductValidationSchema.parse(proudcts)
        // console.log(vaildationProduct)

        const result = await productService.createProductIntoDB(vaildationProduct)
        console.log(result)
        res.status(200).json({
            success:true,
            message:"Product created sucessfully",
            data:result
        })
       
    } catch (error) {
        if(error){
            res.status(400).json({
                success:false,
                message:error
            })
        }
    }
}


const getAllProduct = async(req:Request,res:Response)=>{
    const {searchProduct} = req.query
    console.log(searchProduct)
    try {
        let searchItem : any = {}
        if(searchProduct){
            searchItem.name  ={$regex:searchProduct,}
            console.log("searchItem",searchItem)
        }
            const search  = await ProductModel.find(searchItem)
            return res.status(200).json({
                success:true,
            message:"Products fetched successfully!",
            data:search
            })
        
        // else{
        //     const products = await productService.getAllProductDB()
        // res.status(200).json({
        //     success:true,
        //     message:"Products fetched successfully!",
        //     data:products
        // })
        // }
    } catch (error) {
        res.send(error)
    }
}



const getSingleProduct = async(req:Request,res:Response)=>{
    try {
        const {productId}= req.params;
    console.log("productId",productId)
    const result = await productService.getSingleProductsDB(productId)
   res.status(200).json({
    success:true,
    message:"Product fetched successfully!",
    data:result
   })
    } catch (error) {
        
    }
}

const deleteProducts = async(req:Request,res:Response)=>{
    try {
       
        const {productId}= req.params;
    const result = await productService.deleteProductsDB(productId)

    res.status(200).json({
        success:true,
        message:"Product deleted successfully!",
        data:result
    })
    
    } catch (error) {
        console.log("err",error)
    }
}

// update section

const updateProduct = async(req:Request,res: Response)=>{
    try {
        const {productId} = req.params;
    const updateProducts = req.body;
    
    
    const updated = await productService.getUpdateProductsDB(productId,updateProducts)
    res.status(200).json({
        success:true,
        message:"Product updated successfully!",
        data:updated
    })
    
    } catch (error) {
        console.log(error)
    }
}

export  const productControllers = {
    CreateProducts,
    getAllProduct,
    getSingleProduct,
    deleteProducts,
    updateProduct
}