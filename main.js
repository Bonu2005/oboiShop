import express from "express"
import {config} from "dotenv"
config()

const app = express()
app.use(express.json())



app.listen(process.env.PORT,()=>{
    console.log(`server is run on PORT ${process.env.PORT}`);
})