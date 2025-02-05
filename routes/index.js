import { Router } from "express";
import userRoute from "./user.routes.js";

let mainRoute = Router()

mainRoute.use("/",userRoute)

export default mainRoute