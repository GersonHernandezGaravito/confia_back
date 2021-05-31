const { Schema, model } = require('mongoose');

const esquemaMoneda = new Schema({
    _id: String,
    moneda: String,
    abreviatura: String,
    simbolo: String
}, {
    timestamps : true
});


module.exports = model('Moneda', esquemaMoneda);

