import jwt from "jsonwebtoken"
import { config } from "dotenv"
config()

const middleWare = (req,res,next)=>{
    let token = req.header("Authorization")
    if(!token){
        return res.status(400).json({message:"not authorized"})
    }
    try {
        let verify = jwt.verify(token,process.env.TOKEN)
        req.malumot=a
        next() 
    } catch (error) {
        res.status(401).json({error:error.message})
    }
}
export default middleWare