//MODULARITE ++ simplification Lecture & Gestion : séparation de la logique métier des routes en Controllers
//*Fichier de contrôleur: Exporte des méthodes qui sont ensuite attribuées aux routes pour améliorer la maintenabilité 
const Sauce = require("../models/Sauce");
//module Fs (nécessaire pour sa méthode fs.unlink qui supprimera le lien symbolique pour modif et delete)
const fs = require("fs");
//logique de notre route POST en tant que fonction appelée createSauce()
exports.createSauce = (req, res, next) => {
      const sauceObject = JSON.parse(req.body.sauce);
      delete sauceObject._id;
      const sauce = new Sauce({
            ...sauceObject,
            imageUrl: `${req.protocol}://${req.get("host")}/images/${
                  req.file.filename
            }`,
            likes: 0,
            dislikes: 0,
            usersLiked: [],
            usersDisliked: [],
      });
      sauce.save()
            .then(() =>
                  res
                        .status(201)
                        .json({ message: "Nouvelle sauce enregistrée" })
            )
            .catch((error) => res.status(400).json({ error }));
};
//logique de notre route PUT en tant que fonction appelée modifySauce()
exports.modifySauce =(req, res, next) => {
        Sauce.findById(req.params.id)
          .then(sauce => {
                  if (sauce.userId !== req.auth.userId) {
                        res.status(403).json({message: "Utilisateur non autorisé"});
                      }
            const filename = sauce.imageUrl.split('/images/')[1];            
            const newBody=  updateBody(req)       
            
            Sauce.findByIdAndUpdate( req.params.id, newBody )
              .then(res.status(201).json({ message : "Sauce modifiée"}))
              
              .then(deleteOldImage(req,filename))
              .catch(error => res.status(400).json({ error })) 
          })
          .catch(error => res.status(404).json({ error }))
      } 
    function updateBody(req){
        if (req.file ==undefined) return req.body
        
        const modifyBody = JSON.parse(req.body.sauce)
        modifyBody.imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      
        return modifyBody
      }    
    function deleteOldImage(req,filename){        
        if (req.file ==undefined) return
        
        fs.unlink(`images/${filename}`,(err => {
          if (err) console.log(err);
          else {
            console.log("image supprimée")
          }
        }))
      }
//logique de notre route DELETE en tant que fonction appelée deleteSauce()
 exports.deleteSauce = (req, res, next) => {
      Sauce.findById(req.params.id)
          .then(sauce => {    
            if (!sauce) {
              res.status(404).json({message:"Aucune sauce trouvée"});
            }        
            if (sauce.userId !== req.auth.userId) {
              res.status(403).json({message: "Utilisateur non autorisé"});
            }
            const filename = sauce.imageUrl.split('/images/')[1];       
            fs.unlink(`images/${filename}`, () => {
                      Sauce.deleteOne({ _id: req.params.id })
                .then(() => res.status(200).json({ message: "Objet supprimé !"}))
                .catch(error => res.status(400).json({ error }));
            });
          })
          .catch(error => res.status(500).json({ error }));
      };
//logique de notre route GET en tant que fonction appelée getAllSauce()
exports.getAllSauce = (req, res, next) => {
      Sauce.find()
            .then((sauces) => res.status(200).json(sauces))
            .catch((error) => res.status(400).json({ error }));
};
//logique de notre route GET en tant que fonction appelée getOneSauce()
exports.getOneSauce = (req, res, next) => {
      Sauce.findOne({ _id: req.params.id })
            .then((sauces) => res.status(200).json(sauces))
            .catch((error) => res.status(404).json({ error }));
};
//logique de notre route POST en tant que fonction appelée likeSauce()
exports.likeSauce = (req, res, next) => {
      Sauce.findOne({ _id: req.params.id }).then((sauce) => {
            if (
                  req.body.like === 1 &&
                  !sauce.usersLiked.includes(req.body.userId)
            ) {                  
                  Sauce.updateOne(
                        { _id: req.params.id },
                        {
                              $inc: { likes: req.body.like++ },
                              $push: { usersLiked: req.body.userId },
                        }
                  )
                        .then((sauce) =>
                              res.status(200).json({ message: "Ajout Like" })
                        )
                        .catch((error) => res.status(400).json({ error }));
            } else if (
                  req.body.like === -1 &&
                  !sauce.usersDisliked.includes(req.body.userId)
            ) {                  
                  Sauce.updateOne(
                        { _id: req.params.id },
                        {
                              $inc: { dislikes: req.body.like++ * -1 },
                              $push: { usersDisliked: req.body.userId },
                        }
                  )
                        .then((sauce) =>
                              res.status(200).json({ message: "Ajout Dislike" })
                        )
                        .catch((error) => res.status(400).json({ error }));
            } else {
                  Sauce.findOne({ _id: req.params.id })
                        .then((sauce) => {
                              if (sauce.usersLiked.includes(req.body.userId)) {
                                    Sauce.updateOne(
                                          { _id: req.params.id },
                                          {
                                                $pull: {
                                                      usersLiked:
                                                            req.body.userId,
                                                },
                                                $inc: { likes: -1 },
                                          }
                                    )
                                          .then((sauce) => {
                                                res.status(200).json({
                                                      message: "Suppression Like",
                                                });
                                          })
                                          .catch((error) =>
                                                res.status(400).json({ error })
                                          );
                              } else if (
                                    sauce.usersDisliked.includes(
                                          req.body.userId
                                    )
                              ) {
                                    Sauce.updateOne(
                                          { _id: req.params.id },
                                          {
                                                $pull: {
                                                      usersDisliked:
                                                            req.body.userId,
                                                },
                                                $inc: { dislikes: -1 },
                                          }
                                    )
                                          .then((sauce) => {
                                                res.status(200).json({
                                                      message: "Suppression Dislike",
                                                });
                                          })
                                          .catch((error) =>
                                                res.status(400).json({ error })
                                          );
                              }
                        })
                        .catch((error) => res.status(400).json({ error }));
            }
      }); 
};