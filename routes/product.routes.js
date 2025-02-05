import { Router } from "express";
import { createProduct, deleteProduct, getAllProducts, getOneProduct, getProductsByBrend, getProductsByCountry, updateProduct } from "../controllers/product.controller.js";
import passedRole from "../middleware/rolePolice.js";
import selfPolice from "../middleware/selfPolice.js";
import middleWare from "../middleware/token.middleware.js";
import upload from "../multer/multer.js";

let productRouter = Router()

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: products management endpoints
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: "Get all products"
 *     description: "Retrieve a list of all available products"
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: "A list of products"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name_uz:
 *                     type: string
 *                   name_ru:
 *                     type: string
 *                   brand_id:
 *                     type: integer
 *                   country_id:
 *                     type: integer
 *                   price:
 *                     type: integer
 *                   old_price:
 *                     type: integer
 *                   available:
 *                     type: boolean
 *                   decription_uz:
 *                     type: string
 *                   decription_ru:
 *                     type: integer
 *                   washable:
 *                     type: boolean
 *                   size:
 *                     type: string
 *                   image:
 *                     type: string
 *       500:
 *         description: "Internal server error"
*/

productRouter.get("/products", getAllProducts)

productRouter.get("/productByCountry/:id", getProductsByCountry)
productRouter.get("/productByBrand/:id", getProductsByBrend)


/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: "Get one from products"
 *     description: "Retrieve one available products from id"
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the products to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: "a products"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name_uz:
 *                     type: string
 *                   name_ru:
 *                     type: string
 *                   brand_id:
 *                     type: integer
 *                   country_id:
 *                     type: integer
 *                   price:
 *                     type: integer
 *                   old_price:
 *                     type: integer
 *                   available:
 *                     type: boolean
 *                   decription_uz:
 *                     type: string
 *                   decription_ru:
 *                     type: string
 *                   washable:
 *                     type: boolean
 *                   size:
 *                     type: string
 *                   image:
 *                     type: string
 *       500:
 *         description: "Internal server error"
*/

productRouter.get("/products/:id", getOneProduct)


/**
 * @swagger
 * /products:
 *   post:
 *     summary: "Post products for products"
 *     description: "Post new products"
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               upfile:
 *                 type: string
 *                 format: binary
 *               name_uz:
 *                 type: string
 *               name_ru:
 *                 type: string
 *               brand_id:
 *                 type: integer
 *               country_id:
 *                 type: integer
 *               price:
 *                 type: integer
 *               old_price:
 *                 type: integer
 *               available:
 *                 type: boolean
 *               decription_uz:
 *                 type: string
 *               decription_ru:
 *                 type: string
 *               washable:
 *                 type: boolean
 *               size:
 *                 type: string
 *     responses:
 *       200:
 *         description: "New product posted successfully"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name_uz:
 *                   type: string
 *                 name_ru:
 *                   type: string
 *                 brand_id:
 *                   type: integer
 *                 country_id:
 *                   type: integer
 *                 price:
 *                   type: integer
 *                 old_price:
 *                   type: integer
 *                 available:
 *                   type: boolean
 *                 decription_uz:
 *                   type: string
 *                 decription_ru:
 *                   type: string
 *                 washable:
 *                   type: boolean
 *                 size:
 *                   type: string
 *                 image:
 *                   type: string  # Bu yerda server tomonidan yuborilgan rasm URLi bo'ladi
 *       500:
 *         description: "Internal server error"
 */


productRouter.post("/products", upload.single("image"), middleWare, passedRole(["admin", "superadmin"]), createProduct)


/**
 * @swagger
 * /products/{id}:
 *   patch:
 *     summary: "Get one from products"
 *     description: "Retrieve one available products from id"
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the products to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: "a products"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name_uz:
 *                     type: string
 *                   name_ru:
 *                     type: string
 *                   brand_id:
 *                     type: integer
 *                   country_id:
 *                     type: integer
 *                   price:
 *                     type: integer
 *                   old_price:
 *                     type: integer
 *                   available:
 *                     type: boolean
 *                   decription_uz:
 *                     type: string
 *                   decription_ru:
 *                     type: string
 *                   washable:
 *                     type: boolean
 *                   size:
 *                     type: string
 *                   image:
 *                     type: string
 *       500:
 *         description: "Internal server error"
*/

productRouter.patch("/products/:id", middleWare, selfPolice(["admin", "superadmin"]), updateProduct)


/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: "Get one from products"
 *     description: "Retrieve one available products from id"
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the products to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: "a products"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name_uz:
 *                     type: string
 *                   name_ru:
 *                     type: string
 *                   brand_id:
 *                     type: integer
 *                   country_id:
 *                     type: integer
 *                   price:
 *                     type: integer
 *                   old_price:
 *                     type: integer
 *                   available:
 *                     type: boolean
 *                   decription_uz:
 *                     type: string
 *                   decription_ru:
 *                     type: string
 *                   washable:
 *                     type: boolean
 *                   size:
 *                     type: string
 *                   image:
 *                     type: string
 *       500:
 *         description: "Internal server error"
*/

productRouter.delete("/products/:id", middleWare, passedRole(["admin", "superadmin"]), deleteProduct)

export default productRouter