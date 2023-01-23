//Serveur node
const http = require("http");
const app = require("./app");

//Message de bienvenue
console.log("Bienvenue sur l'API du site PIIQUANTE");

//La fonction normalizePort renvoie un port valide, qu'il soit fourni sous la forme d'un numéro ou d'une chaîne 
const normalizePort = (val) => {
      const port = parseInt(val, 10);

      if (isNaN(port)) {
            return val;
      }
      if (port >= 0) {
            return port;
      }
      return false;
};
const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

//la fonction errorHandler recherche les différentes erreurs et les gère de manière appropriée. Elle est ensuite enregistrée dans le serveur.
const errorHandler = (error) => {
      if (error.syscall !== "listen") {
            throw error;
      }
      const address = server.address();
      const bind =
            typeof address === "string" ? "pipe " + address : "port: " + port;
      switch (error.code) {
            case "EACCES":
                  console.error(bind + " requires elevated privileges.");
                  process.exit(1);
                  break;
            case "EADDRINUSE":
                  console.error(bind + " is already used.");
                  process.exit(1);
                  break;
            default:
                  throw error;
      }
};

const server = http.createServer(app);

//Un écouteur d'évènements est également enregistré.
server.on("error", errorHandler);
server.on("listening", () => {
      const address = server.address();
      const bind = typeof address === "string" ? "pipe " + address : "port " + port;
      console.log("Listening on " + bind);
});

//Execution de l'écoute sur le Port
server.listen(port);