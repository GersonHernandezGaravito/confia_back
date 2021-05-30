const { Router } = require('express');
const router = Router();
const Usuario = require("../models/Usuario");
const Perfil = require ('../models/Perfil');


const bcrypt = require('bcryptjs');
var BCRYPT_SALT_ROUNDS = 10;

// Get All Route
router.get("/usuarios", async (req, res) => {
    try {
        const usuarios = await Usuario.find()
        const perfiles = await Perfil.find()
        res.json(usuarios)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}); 

// Get One Route
router.get("/usuarios/:id", getUser, (req, res) => {
    res.json(res.usuario);
  });

// Create One Route 
router.post("/usuarios", async (req, res) => {
  const {nombreU, correo, contrasena, rol} = req.body;
  const hashedPwd = await bcrypt.hash(contrasena, BCRYPT_SALT_ROUNDS);
    try {
      const nuevoUsuario = new Usuario({nombreU, correo, contrasena : hashedPwd});
      await nuevoUsuario.save();
     
      const nuevoPerfil = new Perfil({codigoUsuario: nuevoUsuario._id, codigoRol: rol});
      await nuevoPerfil.save();
     
      res.status(201).json({ nuevoUsuario });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
// Edit One Route PUT version
router.put("/usuarios/:id", getUser, async (req, res) => {
    try {
      const modificarUsuario = await res.usuario.set(req.body);
      res.json(modificarUsuario);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
});

// Edit One Route PATCH version
router.patch("/usuarios/:id", getUser, async (req, res) => {
    if (req.body.nombreU != null) {
      res.usuario.nombreU = req.body.nombreU;
    }
    if (req.body.correo != null) {
      res.usuario.correo = req.body.correo;
    }
    try {
      const updatedUser = await res.usuario.save();
      res.json(updatedUser);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
});

// Delete One Route
//Delete One
router.delete("/usuarios/:id", getUser, async (req, res) => {
    try {
      await res.usuario.deleteOne();

      const perfil = await Perfil.findOne({codigoUsuario: res.usuario._id});
      await perfil.deleteOne();
      res.json({ message: "USUARIO ELIMINADO" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});

async function getUser(req, res, next) {
    let usuario;
    try {
      usuario = await Usuario.findById(req.params.id);
      if (usuario == null) {
        return res.status(404).json({ message: "USUARIO NO ENCONTRADO" });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
    res.usuario = usuario;
    next();
}

module.exports = router;