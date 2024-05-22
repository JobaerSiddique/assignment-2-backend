import { z } from "zod";


export const orderValidation = z.object({
    email:z.string({message:"email is required"}),
    productId: z.string({message:"ProductId Must be required "}),
    price:z.number({message:"price must be number type"}).min(1,{message:"Price greater than 0"}),
    quantity: z.number({message:"quantity must be number type"}).min(1,{message:"quantity must be greater than 0"})
})