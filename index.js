import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import routerVeterinario from "./routes/veterinarioRoutes.js";
import routerPaciente from "./routes/pacienteRoutes.js";

const app = express();

app.use(express.json());

dotenv.config();

connectDB();

const dominiosPermitidos = ["http://localhost:5173"];

const corsOption = {
  origin: function (origin, callback) {
    if (dominiosPermitidos.indexOf(origin) !== -1) {
      //El origen del request esta permitido
      callback(null, true);
    } else {
      callback(new Error("No permitido por CORS"));
    }
  },
};

app.use(cors(corsOption));

app.use("/api/veterinarios", routerVeterinario);
app.use("/api/pacientes", routerPaciente);

const port = process.env.PORT || 4000;

app.listen(4000, () => {
  console.log(`Servidor funcionando en el puerto ${port}`);
});
