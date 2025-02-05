import { Router } from "express";
import { createProduct, deleteProduct, getAllProducts, getOneProduct, getProductsByBrend, getProductsByCountry, updateProduct } from "../controllers/product.controller.js";
import passedRole from "../middleware/rolePolice.js";
import selfPolice from "../middleware/selfPolice.js";
import middleWare from "../middleware/token.middleware.js";
import upload from "../multer/multer.js";

let productRouter = Router()

productRouter.get("/productByCountry/:id", getProductsByCountry)
productRouter.get("/productByBrand/:id", getProductsByBrend)
productRouter.get("/products", getAllProducts)
productRouter.get("/products/:id", getOneProduct)
productRouter.post("/products", upload.single("image"), middleWare, passedRole(["admin", "superadmin"]), createProduct)
productRouter.patch("/products/:id", middleWare, selfPolice(["admin", "superadmin"]), updateProduct)
productRouter.delete("/products/:id", middleWare, passedRole(["admin", "superadmin"]), deleteProduct)

export default productRouter