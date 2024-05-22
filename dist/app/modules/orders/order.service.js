"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderServices = void 0;
const product_model_1 = require("../products/product.model");
const order_model_1 = require("./order.model");
const createOrders = (orders) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId, quantity } = orders;
    console.log("find", productId, quantity);
    // find the products for productDb
    const product = yield product_model_1.ProductModel.findById(productId);
    if (!product) {
        throw new Error('Product not Found');
    }
    // check quantity for 0
    if (product.inventory.quantity < quantity) {
        throw new Error('Insufficient stock');
    }
    //update the product inventory after create order
    product.inventory.quantity = (product === null || product === void 0 ? void 0 : product.inventory.quantity) - quantity;
    product.inventory.inStock = product.inventory.quantity > 0;
    yield product.save();
    // create order
    const newOrder = yield order_model_1.orderModel.create(orders);
    return newOrder;
});
const getAllOrdersDB = (email) => __awaiter(void 0, void 0, void 0, function* () {
    if (email) {
        return yield order_model_1.orderModel.find({ email });
    }
    else {
        return yield order_model_1.orderModel.find({});
    }
});
exports.orderServices = {
    createOrders,
    getAllOrdersDB
};
