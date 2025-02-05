import { Router } from "express";
import { createOrder, deleteOrder, getOneOrder, getOrder, updateOrder } from "../controllers/order.controller.js";

const ordersRouter = Router()

ordersRouter.get("/orders", getOrder)
ordersRouter.get("/orders/:id", getOneOrder)
ordersRouter.post("/orders", createOrder)
ordersRouter.patch("/orders/:id", updateOrder)
ordersRouter.delete("/orders/:id", deleteOrder)

export default ordersRouter