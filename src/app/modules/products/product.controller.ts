import { Request, Response } from "express";
import { ProductValidationSchema, updateProductValidation } from "./product.zod";
import { productService } from "./product.service";




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
    const searchProduct = req.query.searchTerm as string | undefined 
    console.log(searchProduct)
    try {
        let products ;
        if(searchProduct){
            products = await productService.getAllProductDB(searchProduct)
            console.log("searc",products.length)
            res.status(200).json({
                success:true,
                message:`Products matching search term ${searchProduct} fetched successfully!`,
                data:products
            })
        }
        else{
            products = await productService.getAllProductDB()
            console.log(products)
            res.status(200).json({
                success:true,
                message:"Product fetched successfully!",
                data:products
            })
        }
           
        
        
    } catch (error) {
        res.send(error)
    }
}



const getSingleProduct = async(req:Request,res:Response)=>{
    try {
        const {productId}= req.params;
    
    const result = await productService.getSingleProductsDB(productId)
   res.status(200).json({
    success:true,
    message:"Product fetched successfully!",
    data:result
   })
    } catch (error:any) {
        res.status(400).json({
            success:false,
            message:error.message
        })
    }
}

const deleteProducts = async(req:Request,res:Response)=>{
    try {
       
        const {productId}= req.params;
    const result = await productService.deleteProductsDB(productId)

    if(result.modifiedCount >0){
        res.status(200).json({
            success:true,
            message:"Product deleted successfully!",
            data:null
        })
    }
    else{
        res.status(404).json({ 
            success: false, 
            message: "Product not found or already deleted" });

    }
    
    
    } catch (error) {
        console.log("err",error)
    }
}

// update section

const updateProduct = async(req:Request,res: Response)=>{
    try {
        const {productId} = req.params;
    const updateProducts = req.body;
    const verifyType = await updateProductValidation.parse(updateProducts)
    
    const updated = await productService.getUpdateProductsDB(productId,verifyType)
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