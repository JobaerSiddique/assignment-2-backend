"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderValidation = void 0;
const zod_1 = require("zod");
exports.orderValidation = zod_1.z.object({
    email: zod_1.z.string({ message: "email is required" }),
    productId: zod_1.z.string({ message: "ProductId Must be required " }),
    price: zod_1.z.number({ message: "price must be number type" }).min(1, { message: "Price greater than 0" }),
    quantity: zod_1.z.number({ message: "quantity must be number type" }).min(1, { message: "quantity must be greater than 0" })
});
