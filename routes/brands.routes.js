import { Router } from "express";
import { create, findAll, findOne, remove, update } from "../controllers/brands.controller.js";
import upload from "../multer/multer.js";

const brandsRoute = Router()

brandsRoute.get("/brands", findAll)
brandsRoute.get("/brands/:id", findOne)
brandsRoute.post("/brands", upload.single("image"), create)
brandsRoute.patch("/brands/:id", update)
brandsRoute.delete("/brands/:id", remove)

export default brandsRoute