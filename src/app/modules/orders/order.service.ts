import { ProductModel } from "../products/product.model";
import { TOrder } from "./order.interface";
import { orderModel } from "./order.model";



const createOrders = async(orders:TOrder)=>{
    console.log("orders",orders)
    const {productId,quantity}= orders
    const findProduct = await ProductModel.findById(productId)
  
    const orderInsert = await orderModel.create(orders)
    return {orderInsert,findProduct}
}


const getAllOrdersDB = async(email?:string)=>{
    console.log("email service",email)
    const emailquery:any = {}
    let orders;
    if(email){
        emailquery.email= email
    }
 orders= await orderModel.find({emailquery})

    
orders = await orderModel.find({})
    return orders
    
}



export const orderServices ={
    createOrders,
    getAllOrdersDB
}