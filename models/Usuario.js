const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

//crear esqueram
const usuarioSchema = mongoose.Schema({
    email: { type: String, unique: true },
    password: String,
  });

//método estático
usuarioSchema.statics.hashPassword = function (password) {
    return bcrypt.hash(password, 7);
  };

//método de instancia
usuarioSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
  };

// crear el modelo
const Usuario = mongoose.model("Usuario", usuarioSchema);

//export el modelo
module.exports = Usuario;
