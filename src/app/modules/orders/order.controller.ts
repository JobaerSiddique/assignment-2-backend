import { Request, Response } from "express";
import { orderValidation } from "./order.zod";
import { orderServices } from "./order.service";






const createOrder = async (req: Request,res:Response)=>{
   try {
    const OrderCollection = req.body;
    const orderVaild =  orderValidation.parse(OrderCollection)
    const orders = await orderServices.createOrders(orderVaild)
   
    
    res.status(200).json({
        success:true,
        message:"Order created successfully!",
        data:orders
    })
    
   } catch (error: any) {
    res.status(400).json({
        success:false,
        message:error.message
    })
   }
}


const getAllOrder = async (req: Request,res:Response)=>{
    const email= req.query.email as string
    try {
        let orders;
    if(email){
     orders = await orderServices.getAllOrdersDB(email)
     res.status(200).json({
        success:true,
        message:`Orders fetched successfully for ${email}!`,
        data:orders
    })
    }
     
        orders = await orderServices.getAllOrdersDB()
     res.status(200).json({
         success:true,
         message:"Orders fetched successfully!",
         data:orders
     })
     
  } catch (error:any) {
    res.status(400).json({
        success:false,
        message: error.message
    })
  }
}





export const orderController = {
    createOrder,
    getAllOrder
}