import { Router } from "express";
import { create, findAll, findOne, pegination, remove, update } from "../controllers/brands.controller.js";
import upload from "../multer/multer.js";
import passedRole from "../middleware/rolePolice.js";

const brandsRoute = Router()

/**
 * @swagger
 * tags:
 *   name: Brands
 *   description: Brands management endpoints
 */

/**
 * @swagger
 * /brands:
 *   get:
 *     summary: "Get all brands"
 *     description: "Retrieve a list of all available brands"
 *     tags: [Brands]
 *     responses:
 *       200:
 *         description: "A list of brands"
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

brandsRoute.get("/brands", findAll)

/**
* @swagger
* /brands/{id}:
*   get:
*     summary: "Get all brands"
*     description: "Retrieve a list of all available brands"
*     tags: [Brands]
*     parameters:
*       - in: path
*         name: id
*         required: true
*         description: Numeric ID of the brand to retrieve.
*         schema:
*           type: integer
*     responses:
*       200:
*         description: A single brand.
*         content:
*           application/json:
*              schema:
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
*/

brandsRoute.get("/brands/:id", findOne)


/**
 * @swagger
 * /brands:
 *   post:
 *     summary: "Post brand for brands"
 *     description: "Post new brand"
 *     tags: [Brands]
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
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: "New brand posted successfully"
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

brandsRoute.post("/brands", passedRole(["admin", "superadmin"]), upload.single("image"), create)

/**
 * @swagger
 * /brands/{id}:
 *   patch:
 *     summary: "Update something from one brand"
 *     description: "Post new brand"
 *     tags: [Brands]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the brand to retrieve.
 *         schema:
 *           type: integer
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
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: "update brand"
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

brandsRoute.patch("/brands/:id", passedRole(["admin", "superadmin"]), update)


/**
 * @swagger
 * /brands/{id}:
 *   delete:
 *     summary: "Delete one brand"
 *     description: "Deleting brand"
 *     tags: [Brands]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the brand to retrieve.
 *         schema:
 *           type: integer
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: "Deleting brand"
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

brandsRoute.get("/brandsPagination?:page?:take", pegination)
brandsRoute.delete("/brands/:id", passedRole(["admin"]), remove)

export default brandsRoute