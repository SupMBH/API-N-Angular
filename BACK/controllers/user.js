//Appel bcrypt
const bcrypt = require("bcrypt");
const User = require("../models/User");
//Appel jsonwebtoken
const jwt = require("jsonwebtoken");
//Token paramétrable en .env
const dotenv = require("dotenv");
const result = dotenv.config();
//Route Sign-up avec MAJ sans erreur Postman circuit court post soutenance
exports.signup = (req, res, next) => {
      console.log("Début de la création d'utilisateur");
      User.findOne({ email: req.body.email })
          .then(user => {
              if (user) {
                  console.log("L'adresse email est déjà utilisée");
                  return res.status(400).json({ error: 'Cette adresse email est déjà utilisée' });                        
              }
              bcrypt.hash(req.body.password, 10)
                  .then((hash) => {
                      const newUser = new User({
                          email: req.body.email,
                          password: hash,
                      });
                      newUser.save()
                          .then(() => {
                              console.log("Utilisateur créé avec succès");
                              res.status(201).json({ message: "Utilisateur créé !" });
                          })
                          .catch((error) => {
                              console.log("Erreur lors de la création de l'utilisateur");
                              res.status(400).json({ error });
                          });
                  })
          })
          .catch(error => {
              console.log("Erreur lors de la recherche de l'utilisateur existant")
              res.status(400).json({ error });
          });
};
//logique de notre route POST en tant que fonction appelée login() pour vérifier si un utilisateur qui tente de se connecter dispose d'identifiants valides
exports.login = (req, res, next) => {
      User.findOne({ email: req.body.email })
            .then((user) => {
                  if (!user) {
                        return res
                              .status(401)
                              .json({ error: "Utilisateur non trouvé !" });
                  }
                  bcrypt.compare(req.body.password, user.password)
                        .then((valid) => {
                              if (!valid) {
                                    return res.status(401).json({
                                          error: "Mot de passe incorrect !",
                                    });
                              }
                              res.status(200).json({
                                    userId: user._id,
                                    token: jwt.sign(
                                          { userId: user._id },
                                          `${process.env.ENV_TOKEN}`,
                                          { expiresIn: "24h" }
                                    ),
                              });
                        })
                        .catch((error) => res.status(500).json({ error }));
            })
            .catch((error) => res.status(500).json({ error }));
};