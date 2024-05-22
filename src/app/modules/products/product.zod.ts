import { z } from "zod";



const VarientValidationSchema = z.object({
    type:z.string({message:"type must be required"}).min(1),
    value:z.string({message:"Value must be required"})
})

const InventoryValidationSchema = z.object({
    quantity: z.number().min(1, {message:"Quantity must be postive number"}),
    inStock: z.boolean()
})

export const ProductValidationSchema = z.object({
    searchTerm:z.string().optional(),
    name:z.string({message:"Name must be required"}),
    description:z.string({message:"Description must be required"}),
    price:z.number().min(1,{message:"Price must be required"}),
    tags:z.array(z.string({message:"tags must be required"})),
    variants: z.array(VarientValidationSchema),
    inventory:InventoryValidationSchema,
    isDeleted:z.boolean().optional().default(false)
})

