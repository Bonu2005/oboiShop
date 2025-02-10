import { Router } from "express";
import userRoute from "./user.routes.js";
import productRouter from "./product.routes.js";
import ordersRouter from "./orders.routes.js";
import categoryRoute from "./category.routes.js";
import brandsRoute from "./brands.routes.js";
import countryRoute from "./country.routes.js";
import skidkaRoute from "./skidka.routes.js";

let mainRoute = Router()

mainRoute.use("/", userRoute)
mainRoute.use("/", productRouter)

mainRoute.use("/", ordersRouter)
mainRoute.use("/", categoryRoute)
mainRoute.use("/", brandsRoute)
mainRoute.use("/", countryRoute)
mainRoute.use("/", skidkaRoute)

export default mainRoute