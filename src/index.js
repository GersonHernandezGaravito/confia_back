const express = require ('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3130

require('./database');
//const router = require('./routes');
app.use(cors());
app.use(express.json());

app.use('/auth/', require('./routes/index'))

const rutaUsuarios = require("./routes/usuarios");
app.use("/users/", rutaUsuarios);

const rutaPresupuesto = require("./routes/presupuesto");
app.use("/budget/", rutaPresupuesto);

const rutaCategoria = require("./routes/categoria");
app.use("/category/", rutaCategoria);

const rutaMoneda = require("./routes/moneda");
app.use("/moneda/", rutaMoneda);

const rutaFuente = require("./routes/fuenteIngreso");
app.use("/fuente/", rutaFuente);

const rutaGastos = require("./routes/gasto");
app.use("/gasto/", rutaGastos);

app.listen(port);

console.log('Servidor en puerto', port);