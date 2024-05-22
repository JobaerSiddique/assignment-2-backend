import { ProductModel } from "../products/product.model";
import { TOrder } from "./order.interface";
import { orderModel } from "./order.model";



const createOrders = async(orders:TOrder)=>{
    console.log("orders",orders)
    const {productId}= orders
    const findProduct = await ProductModel.findById(productId)
  
    const orderInsert = await orderModel.create(orders)
    return {orderInsert,findProduct}
}


const getAllOrdersDB = async(email?:string)=>{
    
    const emailquery:any = {}
    let orders;
    if(email){
        emailquery.email= email
    }
    console.log("email service",emailquery.email)
 orders= await orderModel.find({emailquery})

    

    return orders
    
}



export const orderServices ={
    createOrders,
    getAllOrdersDB
}