"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const product_routes_1 = require("./app/modules/products/product.routes");
const order_routes_1 = require("./app/modules/orders/order.routes");
const app = (0, express_1.default)();
// parse
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// routes section
app.use('/api/products', product_routes_1.ProductRoutes);
// order Route
app.use('/api/orders', order_routes_1.orderRoutes);
// test section
app.get('/', (req, res) => {
    res.send('Server is Start Hurray');
});
exports.default = app;
