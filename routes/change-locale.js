const express = require("express");
const router = express.Router();

/* GET /change-locale */
router.get("/:locale", (req, res, next) => {
  const locale = req.params.locale;

  // poner cookie en la respuesta indicando el locale al browser
  res.cookie("nodeapp-locale", locale, {
    maxAge: 1000 * 60 * 60 * 24 * 30,
  });

  // responder con una redirección a la página de donde venía la petición
  res.redirect(req.get("referer"));
}),
  (module.exports = router);
