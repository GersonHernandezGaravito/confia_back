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

router.get("/get_category/:id", getProfile, (req, res) => {
  res.json(res.perfil.categoriaU);
});

//AGREGAR CATEGORIAS
router.patch("/add_category/:id", getProfile, async (req, res) => {
  if (req.body.categoriaU != null) {
    res.perfil.categoriaU.push(req.body.categoriaU);
  }
  try {
    const updatedCate = await res.perfil.save();
    res.json(updatedCate);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.patch("/delete_category/:id", getProfile, async (req, res) => {
    if (req.body.categoriaU != null) {
      res.perfil.categoriaU.pop(req.body.categoriaU);
    }
    try {
      const updatedCate = await res.perfil.save();
      res.json(updatedCate);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

module.exports = router;