import { Request, Response } from "express";
import { orderValidation } from "./order.zod";
import { orderServices } from "./order.service";
import { ProductModel } from "../products/product.model";
import { orderModel } from "./order.model";




const createOrder = async (req: Request,res:Response)=>{
   try {
    const OrderCollection = req.body;
    const orderVaild =  orderValidation.parse(OrderCollection)
    // check product
    const Products = await ProductModel.findById(OrderCollection.productId)
    
    if(!Products){
       return res.status(404).json({
            success:false,
            message:"Order not found"
        })
    }

    //check available quantity for the products
    if(Products.inventory.quantity < OrderCollection.quantity){
        return res.status(400).json({
            success: false,
            message:"Insufficient quantity available in inventory"
        })
    }
    const orders = await orderServices.createOrders(orderVaild)
    
    
    // update productInformation
    Products.inventory.quantity = Products.inventory.quantity - OrderCollection.quantity
    Products.inventory.inStock = Products.inventory.quantity>0
    await Products.save()
    res.status(200).json({
        success:true,
        message:"Order created successfully!",
        data:orders
    })
    
   } catch (error) {
    console.log(error)
   }
}


const getAllOrder = async (req: Request,res:Response)=>{
    
    try {
        const {email}= req.query
        let orders;
    if(email){
     orders = await orderServices.getAllOrdersDB(email)
     
    }
     
        orders = await orderServices.getAllOrdersDB()
     res.status(200).json({
         success:true,
         message:"Orders fetched successfully!",
         data:orders
     })
     
  } catch (error) {
    console.log(error)
  }
}





export const orderController = {
    createOrder,
    getAllOrder
}