import { Router } from "express";
import passedRole from "../middleware/rolePolice.js";
import { skidka, productsOnDiscount } from "../controllers/Discounts.controller.js";

const skidkaRoute = Router()


/**
 * @swagger
 * tags:
 *   name: Discount
 *   description: products management endpoints
 */

/**
 * @swagger
 * /productSale:
 *   post:
 *     summary: "to do discount"
 *     description: "Post new products"
 *     tags: [Discount]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product_id:
 *                 type: integer
 *               discount:
 *                 type: integer
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
 *                     type: integer
 *                 product_id:
 *                     type: integer
 *                 discount:
 *                     type: integer
 *       500:
 *         description: "Internal server error"
*/

skidkaRoute.post("/productDiscount", passedRole(["admin"]), skidka)



/**
 * @swagger
 * /allProductsOnDiscount:
 *   get:
 *     summary: "Get all products on discount"
 *     description: "Retrieve a list of all available products"
 *     tags: [Discount]
 *     responses:
 *       200:
 *         description: "A list of products on discount"
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

skidkaRoute.get("/allProductsOnDiscount", productsOnDiscount)

export default skidkaRoute