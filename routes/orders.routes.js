import { Router } from "express";
import { createOrder, deleteOrder, getOneOrder, getOrder, updateOrder } from "../controllers/order.controller.js";
import middleWare from "../middleware/token.middleware.js";

const ordersRouter = Router()

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order management endpoints
 */


/**
 * @swagger
 * /orders:
 *   get:
 *     summary: "Get all orders"
 *     description: "Retrieve a list of all available orders"
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: "A list of orders"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   user_id:
 *                     type: integer
 *                   total_price:
 *                     type: integer
 *       500:
 *         description: "Internal server error"
*/

ordersRouter.get("/orders", middleWare, getOrder)


/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: "Get one from orders"
 *     description: "Retrieve one available orders from id"
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the orders to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: "a orders"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   user_id:
 *                     type: integer
 *                   total_price:
 *                     type: integer
 *       500:
 *         description: "Internal server error"
*/

ordersRouter.get("/orders/:id", middleWare, getOneOrder)


/**
 * @swagger
 * /orders:
 *   post:
 *     summary: "Post orders for orders"
 *     description: "Post new orders"
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name_uz:
 *                 type: string
 *               name_ru:
 *                 type: string
 *               image:
 *                 type: string
 *     responses:
 *       200:
 *         description: "post new orders"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   user_id:
 *                     type: integer
 *                   total_price:
 *                     type: integer
 *       500:
 *         description: "Internal server error"
*/

ordersRouter.post("/orders", middleWare, createOrder)


/**
 * @swagger
 * /orders/{id}:
 *   patch:
 *     summary: "Update something from one orders"
 *     description: "Post new orders"
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the orders to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: "update orders"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   user_id:
 *                     type: integer
 *                   total_price:
 *                     type: integer
 *       500:
 *         description: "Internal server error"
*/

ordersRouter.patch("/orders/:id", middleWare,  updateOrder)



/**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     summary: "Delete one orders"
 *     description: "Deleting orders"
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the orders to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: "Deleting orders"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   user_id:
 *                     type: integer
 *                   total_price:
 *                     type: integer
 *       500:
 *         description: "Internal server error"
*/

ordersRouter.delete("/orders/:id", middleWare, deleteOrder)

export default ordersRouter