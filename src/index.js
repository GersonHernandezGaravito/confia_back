const express = require ('express');
const app = express();
const cors = require('cors');

require('./database');
//const router = require('./routes');
app.use(cors());
app.use(express.json());

app.use('/auth/', require('./routes/index'))

const rutaUsuarios = require("./routes/usuarios");
app.use("/users/", rutaUsuarios);

const rutaPresupuesto = require("./routes/presupuesto");
app.use("/budget/", rutaPresupuesto);

app.listen(3130);

console.log('Servidor en puerto', 3130);