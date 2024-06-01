"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const mongoose_1 = require("mongoose");
const VarientSchema = new mongoose_1.Schema({
    type: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    }
});
const InventorySchema = new mongoose_1.Schema({
    quantity: {
        type: Number,
        required: true
    },
    inStock: {
        type: Boolean,
        required: true
    },
});
const ProductSchema = new mongoose_1.Schema({
    searchTerm: {
        type: String,
    },
    name: {
        type: String,
        required: [true, "Name Must be Required"]
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    tags: {
        type: [String],
        required: true
    },
    variants: {
        type: [VarientSchema],
        required: true
    },
    inventory: {
        type: InventorySchema,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
});
exports.ProductModel = (0, mongoose_1.model)('Product', ProductSchema);
