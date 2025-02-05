import express from "express"
import {config} from "dotenv"
import mainRoute from "./routes/index.js"
config()

const app = express()
app.use(express.json())
app.use("",mainRoute)


app.listen(process.env.PORT,()=>{
    console.log(`server is run on PORT ${process.env.PORT}`);
})