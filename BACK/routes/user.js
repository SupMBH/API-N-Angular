//Logique de ROUTING pour plus de modularité
const express = require("express");
//Routeur Express (La méthode express.Router() crée des routeurs séparés pour chaque route principale)
const router = express.Router();
//Appel Middleware & controller
const ctrlEmail = require("../middleware/ctrlEmail");
const ctrlPassword = require("../middleware/ctrlPassword");
const userCtrl = require("../controllers/user");
//Routes spécifiées (occurences router et non pas app.get car nous avons crée ce fichier de routes), exporté puis enregistré ensuite dans app.js
router.post("/signup",  ctrlEmail, ctrlPassword, userCtrl.signup);
router.post("/login", ctrlEmail, userCtrl.login);
//export
module.exports = router;