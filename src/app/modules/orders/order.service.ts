import { ProductModel } from "../products/product.model";
import { TOrder } from "./order.interface";
import { orderModel } from "./order.model";



const createOrders = async(orders:TOrder)=>{
    
    const {productId,quantity}= orders
    console.log("find",productId,quantity)
    
        // find the products for productDb
    const product = await ProductModel.findById(productId)

    if(!product){
        throw new Error('Product not Found')
    }

    // check quantity for 0
    if(product.inventory.quantity < quantity){
        
        throw new Error('Insufficient stock');
    }

     //update the product inventory after create order
    product.inventory.quantity = product?.inventory.quantity - quantity
    product.inventory.inStock = product.inventory.quantity > 0

    await product.save()
        // create order
    const newOrder = await orderModel.create(orders)
    return newOrder

   

    
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