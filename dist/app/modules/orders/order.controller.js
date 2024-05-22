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
exports.orderController = void 0;
const order_zod_1 = require("./order.zod");
const order_service_1 = require("./order.service");
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const OrderCollection = req.body;
        const orderVaild = order_zod_1.orderValidation.parse(OrderCollection);
        const orders = yield order_service_1.orderServices.createOrders(orderVaild);
        res.status(200).json({
            success: true,
            message: "Order created successfully!",
            data: orders
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});
const getAllOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.query.email;
    try {
        let orders;
        if (email) {
            orders = yield order_service_1.orderServices.getAllOrdersDB(email);
            res.status(200).json({
                success: true,
                message: `Orders fetched successfully for ${email}!`,
                data: orders
            });
        }
        orders = yield order_service_1.orderServices.getAllOrdersDB();
        res.status(200).json({
            success: true,
            message: "Orders fetched successfully!",
            data: orders
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});
exports.orderController = {
    createOrder,
    getAllOrder
};
