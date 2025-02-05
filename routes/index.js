import { Router } from "express";
import userRoute from "./user.routes.js";
<<<<<<< HEAD
import productRouter from "./product.routes.js";
import orderItemRouter from "./orderItem.routes.js";
import ordersRouter from "./orders.routes.js";
import categoryItemRoute from "./categoryItem.routes.js";
import categoryRoute from "./category.routes.js";
import brandsRoute from "./brands.routes.js";
import countryRoute from "./country.routes.js";

let mainRoute = Router()

mainRoute.use("/",userRoute)
mainRoute.use("/", productRouter)
mainRoute.use("/", orderItemRouter)
mainRoute.use("/", ordersRouter)
mainRoute.use("/", categoryItemRoute)
mainRoute.use("/", categoryRoute)
mainRoute.use("/", brandsRoute)
mainRoute.use("/", countryRoute)
=======
import countryRoute from "./country.routes.js";
import categoryRoute from "./category.routes.js";
import brandsRoute from "./brands.routes.js";
import categoryItemRoute from "./categoryItem.routes.js";

let mainRoute = Router()

mainRoute.use("/", userRoute)
mainRoute.use("/", countryRoute)
mainRoute.use("/", categoryRoute)
mainRoute.use("/", brandsRoute)
mainRoute.use("/", categoryItemRoute)
>>>>>>> 11fbd170c5ca09d3dc21baf4b7ccabf5a0b692f0

export default mainRoute