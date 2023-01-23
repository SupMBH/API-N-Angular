//Middleware d'authentification
//*La méthode verify() du package jsonwebtoken permet de vérifier la validité d'un token et sécurise les routes de l'API
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const result = dotenv.config();
module.exports = (req, res, next) => {
      try {
            const token = req.headers.authorization.split(" ")[1];
            const decodedToken = jwt.verify(token, `${process.env.ENV_TOKEN}`);
            const userId = decodedToken.userId;
            req.auth = {
                  userId: userId,
            };
            next();
      } catch (error) {
            res.status(401).json({ error });
      }
};
