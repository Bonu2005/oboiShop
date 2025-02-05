import { Router } from "express";
import { login, registr, sendPhone ,verify} from "../controllers/user.controller.js";


let userRoute = Router()

userRoute.post("/sendPhone",sendPhone)
userRoute.get("/verify/:otp1/:phone",verify)
userRoute.post("/registr",registr)
userRoute.post("/login",login)

export default userRoute