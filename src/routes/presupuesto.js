const { Router } = require('express');
const router = Router();
const Presupuesto = require("../models/Presupuesto");

const jwt = require('jsonwebtoken');

//Validación de acceso
function validarToken(req, res, next){
    if (!req.headers.authorization){
        return res.status(401).send('Acceso no autorizado');
    }
    const token = req.headers.authorization.split(' ')[1]

    if(token === 'null'){
        return res.status(401).send('Acceso no autorizado');
    }

    const dato = jwt.verify(token, 'secretkey')
    req.idUsuario = dato._id;
    next();
}


router.get("/presupuestos", validarToken, async (req, res) => {
  try {
      const presupuesto = await Presupuesto.find()
      res.json(presupuesto)
  } catch (err) {
      res.status(500).json({message: err.message})
  }
}); 

// Get One Route
router.get("/presupuestos/:id", validarToken, getPresupuesto, (req, res) => {
  res.json(res.presupuesto);
});

// Create One Route 
router.post("/presupuestos", async (req, res) => {
const {codigoUsuario, monto, periodo, fechaInicio, idFuente, idMoneda} = req.body;
  try {
    const nuevoPresupuesto = new Presupuesto({codigoUsuario, monto, periodo, fechaInicio, idFuente, idMoneda});
    await nuevoPresupuesto.save();
        
    res.status(201).json({ nuevoPresupuesto });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// Edit One Route PATCH version
router.patch("/presupuestos/:id", validarToken, getPresupuesto, async (req, res) => {
  if (req.body._id != null) {
    res.presupuesto._id = req.body._id;
  }
  if (req.body.codigoUsuario != null) {
    res.presupuesto.codigoUsuario = req.body.codigoUsuario;
  }
  if (req.body.monto != null) {
      res.presupuesto.monto = req.body.monto;
    }
  if (req.body.periodo != null) {
      res.presupuesto.periodo = req.body.periodo;
  }
  if (req.body.fechaInicio != null) {
      res.presupuesto.fechaInicio = req.body.fechaInicio;
  }
  if (req.body.idFuente != null) {
    res.presupuesto.idFuente = req.body.idFuente;
  }
  if (req.body.idMoneda != null) {
    res.presupuesto.idMoneda = req.body.idMoneda;
  }
  try {
    const updatedPresupuesto = await res.presupuesto.save();
    res.json(updatedPresupuesto);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete One Route
//Delete One
router.delete("/presupuestos/:id", validarToken, getPresupuesto, async (req, res) => {
  try {
    await res.presupuesto.deleteOne();

    res.json({ message: "PRESUPUESTO ELIMINADO" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getPresupuesto(req, res, next) {
  let presupuesto;
  try {
    presupuesto = await Presupuesto.findById(req.params.id);
    if (presupuesto == null) {
      return res.status(404).json({ message: "PRESUPUESTO NO ENCONTRADO" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.presupuesto = presupuesto;
  next();
}

module.exports = router;