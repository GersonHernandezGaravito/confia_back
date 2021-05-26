const { Schema, model } = require('mongoose');

const esquemaPresupuesto = new Schema({
    idUsuario: String,
    monto: Number,
    periodo: Number,
    fechaInicio: Date
}, {
    timestamps : true
});


module.exports = model('Presupuesto', esquemaPresupuesto);

