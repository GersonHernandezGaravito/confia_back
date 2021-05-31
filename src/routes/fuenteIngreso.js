const { Router } = require('express');
const router = Router();
const Usuario = require("../models/Usuario");
const Perfil = require ('../models/Perfil');



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

router.get("/get_fuente/:id", getProfile, (req, res) => {
  res.json(res.perfil.fuenteIngreso);
});

//AGREGAR FUENTES DE INGRESO
router.patch("/add_fuente/:id", getProfile, async (req, res) => {
  if (req.body.fuenteIngreso != null) {
    res.perfil.fuenteIngreso.push(req.body.fuenteIngreso);
  }
  try {
    const updatedFue = await res.perfil.save();
    res.json(updatedFue);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.patch("/delete_fuente/:id", getProfile, async (req, res) => {
    if (req.body.fuenteIngreso != null) {
      res.perfil.fuenteIngreso.pop(req.body.fuenteIngreso);
    }
    try {
      const updatedFue = await res.perfil.save();
      res.json(updatedFue);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

module.exports = router;