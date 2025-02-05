import { Router } from "express";
import { create, findAll, findOne, remove, update } from "../controllers/category.controller.js";
import upload from "../multer/multer.js";
import passedRole from "../middleware/rolePolice.js";

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
 *     summary: "Post category for Category"
 *     description: "Post new category"
 *     tags: [Category]
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
 *     responses:
 *       200:
 *         description: "New category posted successfully"
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
 *                 image:
 *                   type: string  # Bu yerda server tomonidan yuborilgan rasm URLi bo'ladi
 *       500:
 *         description: "Internal server error"
 */

categoryRoute.post("/category", passedRole(["admin", "superadmin"]), upload.single("image"), create)


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

categoryRoute.patch("/category/:id", passedRole(["admin", "superadmin"]), update)


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

categoryRoute.delete("/category/:id", passedRole(["admin"]), remove)

export default categoryRoute