//MIDDLEWARE validation PSW
const passwordValidator = require("password-validator");
const passwordSchema = new passwordValidator();
passwordSchema
      .is()
      .min(5) 
      .is()
      .max(100) 
      .has()
      .not()
      .spaces() 
      .is()
      .not()
      .oneOf(["Passw0rd", "Password123"]); 
module.exports = (req, res, next) => {
      if (passwordSchema.validate(req.body.password)) {
            next();
      } else {
            return res.status(403).json({ error: "Le mot de passe ne remplit pas une ou plusieurs des conditions suivantes :  La longueur minimale doit être de 5 caractères, La longueur maximale doit être de 100 caractères, Il ne doit pas y avoir d'espaces dans le mot de passe, Le mot de passe ne doit pas être égal à Passw0rd ou Password123"});}
};