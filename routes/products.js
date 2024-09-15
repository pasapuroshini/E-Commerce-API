import express from "express"

import {
    createNewCategory,getAllProducts,createNewProduct
} from "../app/controllers/productsController.js";

const ProductRouter = express.Router();

ProductRouter.post('/create/category', createNewCategory);
ProductRouter.get('/all/products', getAllProducts);
ProductRouter.post('/create/new/product', createNewProduct);

export default ProductRouter;