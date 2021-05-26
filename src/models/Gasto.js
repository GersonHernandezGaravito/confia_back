const { Schema, model } = require('mongoose');

const esquemaGasto = new Schema({
    idPresupuesto: String,
    montoGasto: Number,
    fechaGasto: Date
}, {
    timestamps : true
});


module.exports = model('Gasto', esquemaGasto);

