import { Router } from "express";
import { createProduct, getAllProducts, getOneProduct } from "../controllers/product.controller.js";

let productRouter = Router()
productRouter.get("/products", getAllProducts)
productRouter.get("/products/:id", getOneProduct)
productRouter.post("/products", createProduct)

export default productRouter