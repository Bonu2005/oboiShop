import { Router } from "express";
import { create, findAll, findOne, remove, update } from "../controllers/category.controller.js";
import upload from "../multer/multer.js";

const categoryRoute = Router()


/**
 * @swagger
 * tags:
 *   name: Category
 *   description: Category management endpoints
 */

/**
 * @swagger
 * /category:
 *   get:
 *     summary: "Get all category"
 *     description: "Retrieve a list of all available category"
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: "A list of category"
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

categoryRoute.get("/category", findAll)


/**
 * @swagger
 * /category/{id}:
 *   get:
 *     summary: "Get one from Category"
 *     description: "Retrieve one available category from id"
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the category to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: "a category"
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
 *                   image:
 *                     type: string
 *       500:
 *         description: "Internal server error"
*/

categoryRoute.get("/category/:id", findOne)


/**
 * @swagger
 * /category:
 *   post:
 *     summary: "Post category for category"
 *     description: "Post new category"
 *     tags: [Category]
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
 *         description: "post new category"
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
 *                   image:
 *                     type: string
 *       500:
 *         description: "Internal server error"
*/

categoryRoute.post("/category", upload.single("image"), create)


/**
 * @swagger
 * /category/{id}:
 *   patch:
 *     summary: "Update something from one category"
 *     description: "Post new category"
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the category to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: "update category"
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
 *                   image:
 *                     type: string
 *       500:
 *         description: "Internal server error"
*/

categoryRoute.patch("/category/:id", update)


/**
 * @swagger
 * /category/{id}:
 *   delete:
 *     summary: "Delete one category"
 *     description: "Deleting category"
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the category to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: "Deleting category"
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
 *                   image:
 *                     type: string
 *       500:
 *         description: "Internal server error"
*/

categoryRoute.delete("/category/:id", remove)

export default categoryRoute