import { Router } from "express";
import { createOrder, deleteOrder, getOneOrder, getOrder, updateOrder } from "../controllers/order.controller.js";
import middleWare from "../middleware/token.middleware.js";

const ordersRouter = Router()

ordersRouter.get("/orders", middleWare, getOrder)
ordersRouter.get("/orders/:id", middleWare, getOneOrder)
ordersRouter.post("/orders", middleWare, createOrder)
ordersRouter.patch("/orders/:id", middleWare,  updateOrder)
ordersRouter.delete("/orders/:id", middleWare, deleteOrder)

export default ordersRouter