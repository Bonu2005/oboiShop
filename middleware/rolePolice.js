import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

function passedRole(roles) {
   return (req, res, next) => {
      let token = req.header("Authorization");
      if (!token) {
         return res.status(403).json({ message: "No token provided" });
      }
      if (token.startsWith("Bearer ")) {
         token = token.split(" ")[1];
      } else {
         return res.status(403).json({ message: "Invalid token format" });
      }
      try {
         let decoded = jwt.verify(token, process.env.TOKEN);
         req.malumot = decoded;

         if (roles.includes(decoded.role)) {
            next();
         } else {
            res.status(401).json({ message: "Not allowed" });
         }
      } catch (error) {
         res.status(400).json({ message: error.message });
      }
   };
}

export default passedRole;
