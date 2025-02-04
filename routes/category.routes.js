import { Router } from "express";
import { create, findAll, findOne, remove, update } from "../controllers/category.controller.js";

const categoryRoute = Router()

categoryRoute.get("/category", findAll)
categoryRoute.get("/category/:id", findOne)
categoryRoute.post("/category", create)
categoryRoute.patch("/category/:id", update)
categoryRoute.delete("/category/:id", remove)

export default categoryRoute