import { Router } from "express";
import { createOrderItem, deleteOrderItem, getOneOrderItem, getOrderItems, pegination, updateOrderItem } from "../controllers/orderItem.controller.js";
import selfPolice from "../middleware/selfPolice.js";
import passedRole from "../middleware/rolePolice.js";
import middleWare from "../middleware/token.middleware.js";

let orderItemRouter = Router()

/**
 * @swagger
 * tags:
 *   name: OrderItem
 *   description: orderItem management endpoints
 */


/**
 * @swagger
 * /orderItem:
 *   get:
 *     summary: "Get all orderItem"
 *     description: "Retrieve a list of all available orderItem"
 *     tags: [OrderItem]
 *     responses:
 *       200:
 *         description: "A list of orderItem"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   product_id:
 *                     type: integer
 *                   order_id:
 *                     type: integer
 *       500:
 *         description: "Internal server error"
*/

orderItemRouter.get("/orderItem", middleWare, getOrderItems)


/**
 * @swagger
 * /orderItem/{id}:
 *   get:
 *     summary: "Get one from orderItem"
 *     description: "Retrieve one available orderItem from id"
 *     tags: [OrderItem]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the orderItem to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: "a orderItem"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   product_id:
 *                     type: integer
 *                   order_id:
 *                     type: integer
 *       500:
 *         description: "Internal server error"
*/

orderItemRouter.get("/orderItem/:id", middleWare, getOneOrderItem)


/**
 * @swagger
 * /orderItem:
 *   post:
 *     summary: "Post orderItem for orderItem"
 *     description: "Post new orderItem"
 *     tags: [OrderItem]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product_id:
 *                 type: integer
 *               order_id:
 *                 type: integer
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: "post new orderItem"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   product_id:
 *                     type: integer
 *                   order_id:
 *                     type: integer
 *       500:
 *         description: "Internal server error"
*/

orderItemRouter.post("/orderItem", passedRole(["admin", "superadmin"]), createOrderItem)


/**
 * @swagger
 * /orderItem/{id}:
 *   patch:
 *     summary: "Update something from one orderItem"
 *     description: "Post new orderItem"
 *     tags: [OrderItem]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the orderItem to retrieve.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product_id:
 *                 type: string
 *               order_id:
 *                 type: string
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: "update orderItem"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   product_id:
 *                     type: integer
 *                   order_id:
 *                     type: integer
 *       500:
 *         description: "Internal server error"
*/

orderItemRouter.patch("/orderItem/:id", selfPolice(["admin"]), updateOrderItem)


/**
 * @swagger
 * /orderItem/{id}:
 *   delete:
 *     summary: "Delete one orderItem"
 *     description: "Deleting orderItem"
 *     tags: [OrderItem]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the orderItem to retrieve.
 *         schema:
 *           type: integer
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: "Deleting orderItem"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   product_id:
 *                     type: integer
 *                   order_id:
 *                     type: integer
 *       500:
 *         description: "Internal server error"
*/

orderItemRouter.delete("/orderItem/:id", passedRole(["admin", "superadmin"]), deleteOrderItem)
orderItemRouter.get("/orderItemPagination?:page?:take", pegination)
export default orderItemRouter