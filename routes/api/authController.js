const Usuario  = require("../../models/Usuario");
const jwt = require('jsonwebtoken')
require('dotenv').config()

class authController{

// login post desde el API
async postAPI(req, res, next) {

    try {
      const { email, password } = req.body;

      // buscar el usuario en la BD
      const usuario = await Usuario.findOne({ email: email });

      
      // si no lo encuentro o no coincide la contraseña -->error
      if (!usuario || !(await usuario.comparePassword(password)) ) {
        res.json({ error: 'invalid credentials'});
        return;
      }


      // si existe y la contraseña coincide
      // crear un token JWT con el _id del usurio dentro
      const token = await jwt.sign({ _id: usuario._id }, process.env.JWT_SECRET,{
        expiresIn: '2d'
      })


      res.json({jwt:{token}})
    } catch (err) {
      next(err);

    }

  }


}

module.exports = authController;