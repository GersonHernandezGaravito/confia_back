const { Schema, model } = require('mongoose');
const { Int32 } = require('mongodb');

const esquemaPerfil = new Schema({
    codigoUsuario: String,
    codigoRol: Number,
    categoriaU: [{
        nombreCategoria: String,
        descripcionCategoria: String
    }]
}, {
    timestamps : true
});

module.exports = model('Perfil', esquemaPerfil);

//model()
