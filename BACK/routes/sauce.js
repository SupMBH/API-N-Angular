//Logique de ROUTING pour plus de modularité
const express = require("express");
//Routeur Express (La méthode express.Router() crée des routeurs séparés pour chaque route principale)
const router = express.Router();
//Appel Middleware & controller
const SauceCtrl = require("../controllers/sauce");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
//Routes spécifiées (occurences router et non pas app.get car nous avons crée ce fichier de routes), exporté puis enregistré ensuite dans app.js
router.get("/", auth, SauceCtrl.getAllSauce);
router.get("/:id", auth, SauceCtrl.getOneSauce);
router.post("/", auth, multer, SauceCtrl.createSauce);//!multer après auth
router.put("/:id", auth, multer, SauceCtrl.modifySauce);//!multer après auth
router.delete("/:id", auth, SauceCtrl.deleteSauce);
router.post("/:id/like", auth, SauceCtrl.likeSauce);
//export
module.exports = router;