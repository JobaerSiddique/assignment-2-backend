import { z } from "zod";



const VarientValidationSchema = z.object({
    type:z.string({message:"type must be required"}).min(1),
    value:z.string({message:"Value must be required"})
})

const InventoryValidationSchema = z.object({
    quantity: z.number({message:"please requird a vaild number"}).min(1, {message:"Quantity must be postive number"}),
    inStock: z.boolean()
})

export const ProductValidationSchema = z.object({
    searchTerm:z.string().optional(),
    name:z.string({message:"Name must be required"}),
    description:z.string({message:"Description must be required"}),
    price:z.number({message:"Price must be required"}).min(1,{message:"Price must be required"}),
    tags:z.array(z.string({message:"tags must be required"})),
    variants: z.array(VarientValidationSchema),
    inventory:InventoryValidationSchema,
    isDeleted:z.boolean().optional().default(false)
})
export const updateProductValidation = z.object({
    searchTerm:z.string().optional(),
    name:z.string({message:"Name must be required"}).optional(),
    description:z.string({message:"Description must be required"}).optional(),
    price:z.number({message:"Price must be required"}).min(1,{message:"Price must be greater than 0"}).optional(),
    tags:z.array(z.string({message:"tags must be required"})).optional(),
    variants: z.array(VarientValidationSchema).optional(),
    inventory:InventoryValidationSchema.optional(),
    isDeleted:z.boolean().optional().default(false).optional()
})



