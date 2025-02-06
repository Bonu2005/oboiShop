import { Router } from "express";
import { create, findAll, findOne, remove, update,pegination } from "../controllers/country.controller.js";

const countryRoute = Router()
/**
 * @swagger
 * tags:
 *   name: Country
 *   description: country management endpoints
 */

/**
 * @swagger
 * /country:
 *   get:
 *     summary: "Get all country"
 *     description: "Retrieve a list of all available country"
 *     tags: [Country]
 *     responses:
 *       200:
 *         description: "A list of country"
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
 *       500:
 *         description: "Internal server error"
 */
countryRoute.get("/country", findAll)


/**
 * @swagger
 * /country/{id}:
 *   get:
 *     summary: "Get one from country"
 *     description: "Retrieve one available country from id"
 *     tags: [Country]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the brand to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: "a country"
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
 *       500:
 *         description: "Internal server error"
*/

countryRoute.get("/country/:id", findOne)


/**
 * @swagger
 * /country:
 *   post:
 *     summary: "Post country for country"
 *     description: "Post new country"
 *     tags: [Country]
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
 *     responses:
 *       200:
 *         description: "post new country"
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
 *       500:
 *         description: "Internal server error"
 */

countryRoute.post("/country", create)



/**
 * @swagger
 * /country/{id}:
 *   patch:
 *     summary: "Update something from one country"
 *     description: "Post new country"
 *     tags: [Country]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the brand to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: "update country"
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
 *       500:
 *         description: "Internal server error"
 */

countryRoute.patch("/country/:id", update)



/**
 * @swagger
 * /country/{id}:
 *   delete:
 *     summary: "Delete one country"
 *     description: "Deleting country"
 *     tags: [Country]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the brand to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: "Deleting country"
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
 *       500:
 *         description: "Internal server error"
*/

countryRoute.delete("/country/:id", remove)
countryRoute.get("/countryPagination?:page?:take", pegination)
export default countryRoute