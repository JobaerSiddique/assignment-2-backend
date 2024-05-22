
import { Schema, model } from 'mongoose';
import { TInventory, TProducts, TVariants } from './product.interface';




const VarientSchema = new Schema<TVariants>({
    type:{
        type:String,
        required:true
    },
    value:{
        type:String,
        required:true
    }
})

const InventorySchema = new Schema<TInventory>({
    quantity:{
        type:Number,
        required:true
    },
    inStock:{
        type: Boolean,
        required:true
    },
   
})

const ProductSchema = new Schema<TProducts>({
    searchTerm:{
        type:String,
    },
    name:{
        type:String,
        required:[true,"Name Must be Required"]
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    tags:{
        type:[String],
        required:true
    },
    variants:{
        type:[VarientSchema],
        required:true
    },
    inventory:{
        type:InventorySchema,
        required:true
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
})




export const ProductModel = model<TProducts>('Product',ProductSchema)