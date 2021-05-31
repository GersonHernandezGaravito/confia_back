const { Schema, model } = require('mongoose');

const esquemaGasto = new Schema({
    idPresupuesto: String,
    montoGasto: Number
}, {
    timestamps : true
});


module.exports = model('Gasto', esquemaGasto);

