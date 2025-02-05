import { Router } from "express";
import { createAdmin, login, registr, sendPhone ,verify} from "../controllers/user.controller.js";

import  passedRole from "../middleware/rolePolice.js"
let userRoute = Router()

userRoute.post("/sendPhone",sendPhone)
userRoute.get("/verify/:otp1/:phone",verify)
userRoute.post("/registr",registr)
userRoute.post("/login",login)
userRoute.post("/createAdmin",passedRole(["admin"]),createAdmin)
export default userRoute