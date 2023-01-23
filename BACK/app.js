//FRAMEWORK EXPRESS UTILISE -> Création de app.js où sera appelée la methode express + constantes et requirements 
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const userRoutes = require("./routes/user");
const sauceRoutes = require("./routes/sauce");
//module path pour rendre les images statiques
const path = require("path");
const dotenv = require("dotenv");
const result = dotenv.config();

//Package MONGOOSE 
//* ! DB_USERNAME,DB_PASSWORD et DB_CLEF sont à parametrer en fichier .env !
mongoose.set('strictQuery', false);
mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLEF}`,
      { useNewUrlParser: true, useUnifiedTopology: true })
   .then(() => console.log("Connexion à MongoDB réussie !"))
   .catch(() => console.log("Connexion à MongoDB échouée !"));

//CORS: localhost:3000 et localhost:4200 
app.use((req, res, next) => {
   res.setHeader("Access-Control-Allow-Origin","*");
   res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
   res.setHeader("Access-Control-Allow-Methods","GET, POST, PUT, DELETE, PATCH, OPTIONS");
   res.setHeader("Cross-Origin-Ressource-Policy", "same-site");
   next();
});

//Méthode app.use() pour attribuer un middleware à une route spécifique
app.use(bodyParser.json());
app.use("/images", express.static(path.join(__dirname, "images")));//Indique à Express qu'images est statique dans un sous-répertoire __dirname à chaque requête vers la route /images
app.use("/api/sauces", sauceRoutes);
app.use("/api/auth", userRoutes);

//Export
module.exports = app;