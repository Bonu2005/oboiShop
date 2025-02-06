import { Router } from "express";
import { create, findAll, findOne, remove, update,pegination } from "../controllers/categoryItem.controller.js";

import passedRole from "../middleware/rolePolice.js";

const categoryItemRoute = Router()


/**
 * @swagger
 * tags:
 *   name: CategoryItem
 *   description: Category management endpoints
*/

/**
 * @swagger
 * /categoryItem:
 *   get:
 *     summary: "Get all categoryItem"
 *     description: "Retrieve a list of all available categoryItem"
 *     tags: [CategoryItem]
 *     responses:
 *       200:
 *         description: "A list of categoryItem"
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
 *                   image:
 *                     type: string
 *       500:
 *         description: "Internal server error"
*/

categoryItemRoute.get("/categoryItem", findAll)



/**
 * @swagger
 * /categoryItem/{id}:
 *   get:
 *     summary: "Get one from CategoryItem"
 *     description: "Retrieve one available categoryItem from id"
 *     tags: [CategoryItem]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the categoryItem to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: "a categoryItem"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   category_id:
 *                     type: integer
 *                   product_id:
 *                     type: integer
 *       500:
 *         description: "Internal server error"
*/

categoryItemRoute.get("/categoryItem/:id", findOne)


/**
 * @swagger
 * /categoryItem:
 *   post:
 *     summary: "Post category for categoryItem"
 *     description: "Post new categoryItem"
 *     tags: [CategoryItem]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               category_id:
 *                 type: integer
 *               product_id:
 *                 type: integer
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: "post new categoryItem"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   category_id:
 *                     type: integer
 *                   product_id:
 *                     type: integer
 *       500:
 *         description: "Internal server error"
*/

categoryItemRoute.post("/categoryItem", passedRole(["admin", "superadmin"]), create)


/**
 * @swagger
 * /categoryItem/{id}:
 *   patch:
 *     summary: "Update something from one categoryItem"
 *     description: "Post new categoryItem"
 *     tags: [CategoryItem]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the categoryItem to retrieve.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               category_id:
 *                 type: string
 *               product_id:
 *                 type: string
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: "update categoryItem"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   category_id:
 *                     type: integer
 *                   product_id:
 *                     type: integer
 *       500:
 *         description: "Internal server error"
*/

categoryItemRoute.patch("/categoryItem/:id", passedRole(["admin", "superadmin"]), update)


/**
 * @swagger
 * /categoryItem/{id}:
 *   delete:
 *     summary: "Delete one categoryItem"
 *     description: "Deleting categoryItem"
 *     tags: [CategoryItem]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the categoryItem to retrieve.
 *         schema:
 *           type: integer
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: "Deleting categoryItem"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   category_id:
 *                     type: integer
 *                   product_id:
 *                     type: integer
 *       500:
 *         description: "Internal server error"
*/

categoryItemRoute.get("/categoryItemPagination?:page?:take", pegination)
categoryItemRoute.delete("/categoryItem/:id", passedRole(["admin"]), remove)

export default categoryItemRoute