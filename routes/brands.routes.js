import { Router } from "express";
import { create, findAll, findOne, remove, update } from "../controllers/brands.controller.js";

const brandsRoute = Router()

brandsRoute.get("/brands", findAll)
brandsRoute.get("/brands/:id", findOne)
brandsRoute.post("/brands", create)
brandsRoute.patch("/brands/:id", update)
brandsRoute.delete("/brands/:id", remove)

export default brandsRoute