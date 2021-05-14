const { Schema, model } = require('mongoose');

const esquemaUsuario = new Schema({
    nombreU: String,
    correo: String,
    contrasena: String,
}, {
    timestamps : true
});


module.exports = model('Usuario', esquemaUsuario);

//model()
