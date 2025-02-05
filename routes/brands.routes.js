import { Router } from "express";
import { create, findAll, findOne, remove, update } from "../controllers/brands.controller.js";
import upload from "../multer/multer.js";

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
 *         description: "post new brand"
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

brandsRoute.post("/brands", upload.single("image"), create)

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

brandsRoute.patch("/brands/:id", update)


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

brandsRoute.delete("/brands/:id", remove)

export default brandsRoute