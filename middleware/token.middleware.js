import jwt from "jsonwebtoken"
import { config } from "dotenv"
config()

const middleWare = (req,res,next)=>{
    let token = req.header("Authorization")
    if(!token){
        res.status(400).json({message:"not authorized"})
        return
    }
    try {
        let verify = jwt.verify(token,process.env.TOKEN)
        console.log(verify);
        
        req.malumot=a
        console.log(req.malumot);
        next() 
    } catch (error) {
        res.status(401).json({error:error.message})
    }
}
export default middleWare