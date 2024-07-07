// Importa los módulos necesarios: express, mongoose y las rutas definidas en "./routes/routes"
const express = require("express");
const mongoose = require("mongoose");
const usersRoutes = require("./routes/usersRoutes");
const midd = require("./Middlewares/middleware");

// Configura la promesa global de Mongoose para usar Promises nativas de JavaScript
mongoose.Promise = global.Promise;

// Conecta a la base de datos MongoDB local en el puerto 27017 y la base de datos 'dbusers'
mongoose
  .connect("mongodb://localhost:27017/dbusers")
  .then(console.log("Conectado a base de datos:Mongodb")) // Mensaje de éxito al conectar
  .catch(
    (error) => console.error("Error al conectarce a base de datos :", error) // Manejo de error al conectar
  );

// Crea una instancia de la aplicación Express
const app = express();

// Configura la aplicación Express para usar JSON como formato de datos
app.use(express.json());

// Configura la aplicación Express para poder parsear datos de URL codificados
app.use(express.urlencoded({ extended: true }));

// Utiliza el middleware 'routes' importado para manejar las rutas de la aplicación
app.use("/", usersRoutes());

// Define el número de puerto en el que la aplicación Express va a escuchar
const port = 5000;

// Hace que la aplicación Express escuche en el puerto especificado
app.listen(port, () => {
  console.log("Servidor corriendo correctamente"); // Mensaje de éxito al iniciar el servidor
});
