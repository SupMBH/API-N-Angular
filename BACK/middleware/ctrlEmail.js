//module npm email-validator
const validator = require("email-validator");
module.exports = (req, res, next) => {
    const { email, password } = req.body;
    console.log("Début de la vérification des données d'entrée");
    if (!email || !validator.validate(email)) {
        console.log("Email non valide");
        return res.status(400).json({ error: "email non valide problème" });
    }
    if (!password) {
        console.log("Mot de passe absent");
        return res.status(400).json({ error: 'password est requis' });
    }
    console.log("Données d'entrée valides");
    next();
};