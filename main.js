import express from "express"
import {config} from "dotenv"
import productRouter from "./routes/product.routes.js"
import orderItemRouter from "./routes/orderItem.routes.js"
import ordersRouter from "./routes/orders.routes.js"
config()

const app = express()
app.use(express.json())

app.use("/", productRouter)
app.use("/", orderItemRouter)
app.use("/", ordersRouter)

app.listen(process.env.PORT,()=>{
    console.log(`server is run on PORT ${process.env.PORT}`);
})