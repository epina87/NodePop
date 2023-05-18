const jwt = require("jsonwebtoken");
var createError = require("http-errors");

// modulo que exporta un middleware
module.exports = async (req, res, next) => {
  try {
    // recoger el jwtToken de la cabecera, o del body o de la query-string
    const jwtToken = req.get("Authorization") || req.query.jwt;

    // comprobar que me han mandado un jwtToken
    if (!jwtToken) {
      const error = createError(401, "no token provide");
      next(error);
      return;
    }

    // comprobar que el token es válido
    const payload = await jwt.verify(jwtToken, process.env.JWT_SECRET);

    req.usuarioLogadoDelAPI = payload._id;
    
    next();
  } catch (error) {
    if (error.message === "invalid signature") {
      next(createError(401, "invalid token"));
      return;
    }

    if (error.message === "Unexpected token � in JSON at position 0") {
      next(createError(401, "invalid token"));
      return;
    }

    if (error.message === "invalid token") {
      next(createError(401, "invalid token"));
      return;
    }

    next(error);
  }
};
