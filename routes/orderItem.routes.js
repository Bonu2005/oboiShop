import { Router } from "express";
import { createOrderItem, deleteOrderItem, getOneOrderItem, getOrderItems, updateOrderItem } from "../controllers/orderItem.controller.js";

let orderItemRouter = Router()
orderItemRouter.get("/orderItem", getOrderItems)
orderItemRouter.get("/orderItem/:id", getOneOrderItem)
orderItemRouter.post("/orderItem", createOrderItem)
orderItemRouter.patch("/orderItem/:id", updateOrderItem)
orderItemRouter.delete("/orderItem/:id", deleteOrderItem)

export default orderItemRouter