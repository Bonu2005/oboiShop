import { Router } from "express";

import { createAdmin, login, registr, sendPhone ,verify,update,remove,pegination} from "../controllers/user.controller.js";
import  passedRole from "../middleware/rolePolice.js"
import middleWare from "../middleware/token.middleware.js";
import selfPolice from "../middleware/selfPolice.js";

let userRoute = Router()

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Users management endpoints
 */




/**
 * @swagger
 * /verify/{otp1}/{phone}:
 *   get:
 *     summary: "Verifying"
 *     description: "Verifying user with OTP and phone number"
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: otp1
 *         required: true
 *         description: OTP for verification
 *         schema:
 *           type: string
 *       - in: path
 *         name: phone
 *         required: true
 *         description: Phone number for verification
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: "User verified successfully."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 phone:
 *                   type: string
 *                 otp1:
 *                   type: string
 *       400:
 *         description: "Invalid OTP or phone number"
 *       500:
 *         description: "Internal server error"
 */

userRoute.get("/verify/:otp1/:phone",verify)

/**
 * @swagger
 * /sendPhone:
 *   post:
 *     summary: "Post user for user"
 *     description: "creating new user"
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *               password:
 *                 type: string
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: "New  successfully"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 fullname:
 *                   type: string
 *                 phone:
 *                   type: string
 *                 password:
 *                   type: string
 *       500:
 *         description: "Internal server error"
 */

userRoute.post("/sendPhone",sendPhone)

/**
 * @swagger
 * /registr:
 *   post:
 *     summary: "Registering"
 *     description: "Registering"
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *               fullName:
 *                 type: string
 *               password:
 *                 type: string
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: "Successfully registered"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 fullname:
 *                   type: string
 *                 phone:
 *                   type: string
 *                 password:
 *                   type: string
 *       500:
 *         description: "Internal server error"
 */

userRoute.post("/registr",registr)


/**
 * @swagger
 * /login:
 *   post:
 *     summary: "Login"
 *     description: "Login"
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *               password:
 *                 type: string
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: "Successfully logined"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 phone:
 *                   type: string
 *                 password:
 *                   type: string
 *       500:
 *         description: "Internal server error"
 */

userRoute.post("/login",login)


/**
 * @swagger
 * /createAdmin:
 *   post:
 *     summary: "create new admin"
 *     description: "create new admin"
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               fullname:
 *                   type: string
 *               phone:
 *                   type: string
 *               password:
 *                   type: string
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: "Successfully created"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 fullname:
 *                   type: string
 *                 phone:
 *                   type: string
 *                 password:
 *                   type: string
 *       500:
 *         description: "Internal server error"
 */

userRoute.post("/createAdmin",passedRole(["admin"]),createAdmin)
userRoute.get("/userPagination?:page?:take",passedRole(["admin"]),pegination)


/**
 * @swagger
 * /userUpdate:
 *   patch:
 *     summary: "Update user information"
 *     description: "Update user information"
 *     tags: [Users]
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
 *               fullname:
 *                 type: string
 *               phone:
 *                 type: string
 *               password:
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
 *                   fullname:
 *                       type: string
 *                   phone:
 *                       type: string
 *                   password:
 *                       type: string
 *       500:
 *         description: "Internal server error"
*/

userRoute.patch("/userUpdate",middleWare,selfPolice(["user"]),update)


/**
 * @swagger
 * /userRemove:
 *   delete:
 *     summary: "Delete user"
 *     description: "Deleting user"
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: integer
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: "Deleting user"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   fullname:
 *                     type: string
 *                   phone:
 *                     type: string
 *                   password:
 *                     type: string
 *       500:
 *         description: "Internal server error"
*/

userRoute.delete("/userRemove",middleWare, passedRole("user", "admin"),remove)
export default userRoute