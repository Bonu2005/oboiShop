import { Router } from "express";
import { create, findAll, findOne, remove, update } from "../controllers/category.controller.js";
import upload from "../multer/multer.js";

const categoryRoute = Router()

categoryRoute.get("/category", findAll)
categoryRoute.get("/category/:id", findOne)
categoryRoute.post("/category", upload.single("image"), create)
categoryRoute.patch("/category/:id", update)
categoryRoute.delete("/category/:id", remove)

export default categoryRoute