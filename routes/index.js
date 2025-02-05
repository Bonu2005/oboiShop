import { Router } from "express";
import userRoute from "./user.routes.js";
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

export default mainRoute