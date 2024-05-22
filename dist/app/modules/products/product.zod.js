"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductValidation = exports.ProductValidationSchema = void 0;
const zod_1 = require("zod");
const VarientValidationSchema = zod_1.z.object({
    type: zod_1.z.string({ message: "type must be required" }).min(1),
    value: zod_1.z.string({ message: "Value must be required" })
});
const InventoryValidationSchema = zod_1.z.object({
    quantity: zod_1.z.number({ message: "please requird a vaild number" }).min(1, { message: "Quantity must be postive number" }),
    inStock: zod_1.z.boolean()
});
exports.ProductValidationSchema = zod_1.z.object({
    searchTerm: zod_1.z.string().optional(),
    name: zod_1.z.string({ message: "Name must be required" }),
    description: zod_1.z.string({ message: "Description must be required" }),
    price: zod_1.z.number({ message: "Price must be required" }).min(1, { message: "Price must be required" }),
    tags: zod_1.z.array(zod_1.z.string({ message: "tags must be required" })),
    variants: zod_1.z.array(VarientValidationSchema),
    inventory: InventoryValidationSchema,
    isDeleted: zod_1.z.boolean().optional().default(false)
});
exports.updateProductValidation = zod_1.z.object({
    searchTerm: zod_1.z.string().optional(),
    name: zod_1.z.string({ message: "Name must be required" }).optional(),
    description: zod_1.z.string({ message: "Description must be required" }).optional(),
    price: zod_1.z.number({ message: "Price must be required" }).min(1, { message: "Price must be greater than 0" }).optional(),
    tags: zod_1.z.array(zod_1.z.string({ message: "tags must be required" })).optional(),
    variants: zod_1.z.array(VarientValidationSchema).optional(),
    inventory: InventoryValidationSchema.optional(),
    isDeleted: zod_1.z.boolean().optional().default(false).optional()
});
