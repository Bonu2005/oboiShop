import { Router } from "express";
import { create, findAll, findOne, remove, update } from "../controllers/categoryItem.controller.js";

const categoryItemRoute = Router()

categoryItemRoute.get("/categoryItem", findAll)
categoryItemRoute.get("/categoryItem/:id", findOne)
categoryItemRoute.post("/categoryItem", create)
categoryItemRoute.patch("/categoryItem/:id", update)
categoryItemRoute.delete("/categoryItem/:id", remove)

export default categoryItemRoute