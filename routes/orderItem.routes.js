import { Router } from "express";
import { createOrderItem, deleteOrderItem, getOneOrderItem, getOrderItems, updateOrderItem } from "../controllers/orderItem.controller.js";
import selfPolice from "../middleware/selfPolice.js";
import passedRole from "../middleware/rolePolice.js";
import middleWare from "../middleware/token.middleware.js";

let orderItemRouter = Router()
orderItemRouter.get("/orderItem", middleWare, getOrderItems)
orderItemRouter.get("/orderItem/:id", middleWare, getOneOrderItem)
orderItemRouter.post("/orderItem", passedRole(["admin", "superadmin"]), createOrderItem)
orderItemRouter.patch("/orderItem/:id", selfPolice(["admin"]), updateOrderItem)
orderItemRouter.delete("/orderItem/:id", passedRole(["admin", "superadmin"]), deleteOrderItem)

export default orderItemRouter