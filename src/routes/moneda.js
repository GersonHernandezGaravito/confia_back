const { Router } = require('express');
const router = Router();
const Usuario = require("../models/Usuario");
const Perfil = require ('../models/Perfil');
const Monedas = require ('../models/Moneda');


//OBTENER PERFIL
async function getProfile(req, res, next) {
  let usuario;
  let perfil;
    try {
      usuario = await Usuario.findById(req.params.id);
      perfil = await Perfil.findOne({codigoUsuario: usuario._id});
      if (perfil == null) {
        return res.status(404).json({ message: "PERFIL NO ENCONTRADO" });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
    res.perfil = perfil;
    next();
}

router.get("/get_monedasU/:id", getProfile, async(req, res) => {
    monedasUsuario = res.perfil.monedaU;
    let monedasU = [];
    //console.log(monedasUsuario);
    for (let entry of monedasUsuario) {
        moneda = await Monedas.findById(entry.idMoneda);
        monedasU.push(moneda);
    }
    //moneda = await Monedas.findById(res.perfil.monedaU.idMoneda);    
    
    res.json(monedasU);
});

router.get("/get_monedas", async (req, res) => {
    try {
        const monedas = await Monedas.find()
        res.json(monedas)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}); 

//AGREGAR MONEDA
router.patch("/add_moneda/:id", getProfile, async (req, res) => {
  if (req.body.monedaU != null) {
    res.perfil.monedaU.push(req.body.monedaU);
  }
  try {
    const updatedMone = await res.perfil.save();
    res.json(updatedMone);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.patch("/eliminar_moneda/:id", getProfile, async (req, res) => {
    if (req.body.monedaU != null) {
      res.perfil.monedaU.pop(req.body.monedaU);
    }
    try {
      const updatedMone = await res.perfil.save();
      res.json(updatedMone);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

module.exports = router;