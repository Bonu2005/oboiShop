import { Router } from "express";
import {pegination, createProduct, deleteProduct, getAllProducts, getOneProduct, getProductIsMaxPrice, getProductIsMinPrice, getProductsByBrend, getProductsByCategory, getProductsByCountry, getProductsFilterByPrice, updateProduct } from "../controllers/product.controller.js";
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


/**
 * @swagger
 * /isMaxPrice:
 *   get:
 *     summary: "Get product with the highest price"
 *     description: "Retrieve the product that has the maximum price"
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: "A product with the maximum price"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 price:
 *                   type: integer
 *       500:
 *         description: "Internal server error"
 */
productRouter.get("/isMaxPrice", getProductIsMaxPrice)


/**
 * @swagger
 * /isMinPrice:
 *   get:
 *     summary: "Get product with the lowest price"
 *     description: "Retrieve the product that has the minimum price"
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: "A product with the minimum price"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 price:
 *                   type: integer
 *       500:
 *         description: "Internal server error"
 */
productRouter.get("/isMinPrice", getProductIsMinPrice)


/**
 * @swagger
 * /products:
 *   get:
 *     summary: "Get products filtered by price range"
 *     description: "Retrieve products that fall within the given price range"
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: from
 *         required: true
 *         description: "Minimum price of the products to filter"
 *         schema:
 *           type: integer
 *       - in: query
 *         name: to
 *         required: true
 *         description: "Maximum price of the products to filter"
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: "Filtered products"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   price:
 *                     type: integer
 *       500:
 *         description: "Internal server error"
 */
productRouter.get("/products", getProductsFilterByPrice)

/**
 * @swagger
 * /productByCountry/{id}:
 *   get:
 *     summary: "Get one from products"
 *     description: "Retrieve products by country from id"
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
 *                     type: string
 *                   decription_uz:
 *                     type: string
 *                   decription_ru:
 *                     type: string
 *                   washable:
 *                     type: string
 *                   size:
 *                     type: string
 *                   image:
 *                     type: string
 *       500:
 *         description: "Internal server error"
*/

productRouter.get("/productByCountry/:id", getProductsByCountry)


/**
 * @swagger
 * /productByCategory/{id}:
 *   get:
 *     summary: "Get one from products"
 *     description: "Retrieve products by country from id"
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
 *                     type: string
 *                   decription_uz:
 *                     type: string
 *                   decription_ru:
 *                     type: string
 *                   washable:
 *                     type: string
 *                   size:
 *                     type: string
 *                   image:
 *                     type: string
 *       500:
 *         description: "Internal server error"
*/

productRouter.get("/productByCategory/:id", getProductsByCategory)


/**
 * @swagger
 * /productByBrand/{id}:
 *   get:
 *     summary: "Get one from products"
 *     description: "Retrieve products by country from id"
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
 *                     type: string
 *                   decription_uz:
 *                     type: string
 *                   decription_ru:
 *                     type: string
 *                   washable:
 *                     type: string
 *                   size:
 *                     type: string
 *                   image:
 *                     type: string
 *       500:
 *         description: "Internal server error"
*/


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
 *                     type: string
 *                   decription_uz:
 *                     type: string
 *                   decription_ru:
 *                     type: string
 *                   washable:
 *                     type: string
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
 *               image:
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
 *                 type: string
 *               decription_uz:
 *                 type: string
 *               decription_ru:
 *                 type: string
 *               categoriesID:
 *                 type: string
 *               washable:
 *                 type: string
 *               size:
 *                 type: string
 *     security:
 *       - BearerAuth: []
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
 *                   type: string
 *                 decription_uz:
 *                   type: string
 *                 decription_ru:
 *                   type: string
 *                 washable:
 *                   type: string
 *                 categoriesID:
 *                   type: string
 *                 size:
 *                   type: string
 *                 image:
 *                   type: string  # Bu yerda server tomonidan yuborilgan rasm URLi bo'ladi
 *       500:
 *         description: "Internal server error"
 */


productRouter.post("/products", upload.single("image"), createProduct)


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
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
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
 *                 type: string
 *               decription_uz:
 *                 type: string
 *               decription_ru:
 *                 type: string
 *               washable:
 *                 type: string
 *               size:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     security:
 *       - BearerAuth: []
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
 *                     type: string
 *                   decription_uz:
 *                     type: string
 *                   decription_ru:
 *                     type: string
 *                   washable:
 *                     type: string
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
 *     security:
 *       - BearerAuth: []
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
 *                     type: string
 *                   decription_uz:
 *                     type: string
 *                   decription_ru:
 *                     type: string
 *                   washable:
 *                     type: string
 *                   size:
 *                     type: string
 *                   image:
 *                     type: string
 *       500:
 *         description: "Internal server error"
*/

productRouter.delete("/products/:id", middleWare, passedRole(["admin", "superadmin"]), deleteProduct)
productRouter.get("/products?:page?:take", middleWare, passedRole(["admin", "superadmin"]), pegination)
export default productRouter