const { Router } = require('express');
const router = Router();
const Gasto = require("../models/Gasto");


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


router.get("/gastos", async (req, res) => {
  try {
      const gasto = await Gasto.find()
      res.json(gasto)
  } catch (err) {
      res.status(500).json({message: err.message})
  }
}); 

// Get One Route
router.get("/gastos/:id", validarToken, getGasto, (req, res) => {
  res.json(res.gasto);
});

// Create One Route 
router.post("/gastos", validarToken, async (req, res) => {
const {codigoUsuario, monto, periodo, fechaInicio} = req.body;
  try {
    const nuevoGasto = new Gasto({idPresupuesto, montoGasto, fechaGasto});
    await nuevoGasto.save();
        
    res.status(201).json({ nuevoGasto });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// Edit One Route PATCH version
router.patch("/gastos/:id", validarToken, getGasto, async (req, res) => {
  if (req.body._id != null) {
    res.gasto._id = req.body._id;
  }
  if (req.body.menu != null) {
    res.gasto.idPresupuesto = req.body.idPresupuesto;
  }
  if (req.body.padre != null) {
      res.gasto.montoGasto = req.body.montoGasto;
    }
  if (req.body.link != null) {
      res.gasto.fechaGasto = req.body.fechaGasto;
  }
  
  try {
    const updatedGasto = await res.gasto.save();
    res.json(updatedGasto);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete One Route
//Delete One
router.delete("/gastos/:id", validarToken, getGasto, async (req, res) => {
  try {
    await res.gasto.deleteOne();

    res.json({ message: "GASTO ELIMINADO" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getGasto(req, res, next) {
  let gasto;
  try {
    gasto = await Gasto.findById(req.params.id);
    if (gasto == null) {
      return res.status(404).json({ message: "GASTO NO ENCONTRADO" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.gasto = gasto;
  next();
}

module.exports = router;