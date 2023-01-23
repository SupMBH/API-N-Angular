// MONGOOSE
const mongoose = require("mongoose");
// Plug-in uniqueValidator 
const uniqueValidator = require("mongoose-unique-validator");
//Gestion MongoDB : implementation du schéma de données stricts des USERS (API plus robuste, flexible, maintenable)
const userSchema = mongoose.Schema({
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
});
// Injection de uniqueValidator
userSchema.plugin(uniqueValidator);
// Export du schéma
module.exports = mongoose.model("User", userSchema);