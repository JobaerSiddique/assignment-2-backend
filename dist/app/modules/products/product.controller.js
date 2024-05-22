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
exports.productControllers = void 0;
const product_zod_1 = require("./product.zod");
const product_service_1 = require("./product.service");
const CreateProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const proudcts = req.body;
        console.log(proudcts);
        const vaildationProduct = product_zod_1.ProductValidationSchema.parse(proudcts);
        // console.log(vaildationProduct)
        const result = yield product_service_1.productService.createProductIntoDB(vaildationProduct);
        console.log(result);
        res.status(200).json({
            success: true,
            message: "Product created sucessfully",
            data: result
        });
    }
    catch (error) {
        if (error) {
            res.status(400).json({
                success: false,
                message: error
            });
        }
    }
});
const getAllProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const searchProduct = req.query.searchTerm;
    console.log(searchProduct);
    try {
        let products;
        if (searchProduct) {
            products = yield product_service_1.productService.getAllProductDB(searchProduct);
            res.status(200).json({
                success: true,
                message: `Products matching search term ${searchProduct} fetched successfully!`,
                data: products
            });
        }
        else {
            products = yield product_service_1.productService.getAllProductDB();
            console.log(products);
            res.status(200).json({
                success: true,
                message: "Product fetched successfully!",
                data: products
            });
        }
    }
    catch (error) {
        res.send(error);
    }
});
const getSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield product_service_1.productService.getSingleProductsDB(productId);
        res.status(200).json({
            success: true,
            message: "Product fetched successfully!",
            data: result
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});
const deleteProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield product_service_1.productService.deleteProductsDB(productId);
        res.status(200).json({
            success: true,
            message: "Product deleted successfully!",
            data: null
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});
// update section
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const updateProducts = req.body;
        const verifyType = yield product_zod_1.updateProductValidation.parse(updateProducts);
        const updated = yield product_service_1.productService.getUpdateProductsDB(productId, verifyType);
        res.status(200).json({
            success: true,
            message: "Product updated successfully!",
            data: updated
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.productControllers = {
    CreateProducts,
    getAllProduct,
    getSingleProduct,
    deleteProducts,
    updateProduct
};
