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
exports.productService = void 0;
const product_model_1 = require("./product.model");
const createProductIntoDB = (productData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.ProductModel.create(productData);
    return result;
});
const getAllProductDB = (searchItem) => __awaiter(void 0, void 0, void 0, function* () {
    if (searchItem) {
        // 'i' for case-insensitive
        return yield product_model_1.ProductModel.find({
            $or: [
                { name: { $regex: searchItem, $options: 'i' } },
                { description: { $regex: searchItem, $options: 'i' } },
                { tags: { $regex: searchItem, $options: 'i' } }
            ],
        });
    }
    else {
        return yield product_model_1.ProductModel.find({});
    }
});
const getSingleProductsDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("id", id);
    const getProductId = yield product_model_1.ProductModel.findById(id);
    console.log("getser", getProductId);
    return getProductId;
});
const deleteProductsDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedProducts = yield product_model_1.ProductModel.findByIdAndDelete(id);
    return deletedProducts;
});
const getUpdateProductsDB = (productId, updateInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedProducts = yield product_model_1.ProductModel.findByIdAndUpdate(productId, updateInfo);
    return updatedProducts;
});
exports.productService = {
    createProductIntoDB,
    getAllProductDB,
    getSingleProductsDB,
    deleteProductsDB,
    getUpdateProductsDB
};
