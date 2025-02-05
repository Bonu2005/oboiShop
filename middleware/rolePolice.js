function passedRole(roles) {
   return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
         return res.status(400).send({ message: "Not allowed" });
      }
      next();
   };
}
 
export default passedRole;