function selfPolice(roles) {
   return (req, res, next) => {
      let { id } = req.params;
      console.log(req.user.role)
      if (id == req.user.id || roles.includes(req.user.role)) {
         next();
         return;
      }
      res.status(400).send({ message: "Not allowed update" });
   };
}

export default selfPolice;