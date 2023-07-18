import jwt from "jsonwebtoken";
import Veterinario from "../models/Veterinario.js";

const checkAuto = async (req, res, next) => {
  let token;
  // Previo a esto ya se acabo de generar un token cifrado del id del usuario
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //Una vez pegamos el token postman, la sección Autho... validamos si el token es autentico y el id coincide con la BD
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.veterinario = await Veterinario.findById(decoded.id).select(
        "-password -token -confirmado"
      );
      return next();
    } catch (error) {
      const e = new Error("Token no válido");
      return res.status(403).json({ msg: e.message });
    }
  }

  if (!token) {
    const error = new Error("Token no válido o inexistente");
    res.status(403).json({ msg: error.message });
  }

  next();
};

export default checkAuto;
