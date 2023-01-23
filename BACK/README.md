INSTRUCTIONS 

1/ Créer Folder 'images' à la racine
2/ créer New File '.env' à la racine. Y spécifier un numéro de port (3000 requis), un USER MangoAtlas, le PSW MangoAtlas associé, la clef spécifique (chaine située après @) associée MangoAtlas alouée par MangoAtlas, et le token selon le schéma indicatif d'exemple ci-après:

PORT = 3000
DB_USERNAME = "user"
DB_PASSWORD = "user"
DB_CLEF = "cluster0.5aarlh8.mongodb.net/?retryWrites=true&w=majority"

ENV_TOKEN = "XXX"

2/ Vous devez posséder une version recente de .node (à partir de 19.3.0) puis installer à la racine le pack npm par la commande 'npm install'

3/ Lancer le server avec la commande 'nodemon server' 