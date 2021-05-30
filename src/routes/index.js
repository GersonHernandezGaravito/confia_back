const { Router } = require('express');
const router = Router();
const Usuario = require('../models/Usuario');
const Perfil = require ('../models/Perfil');


const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

router.get('/', (req, res) => res.send('Hola Mundo'));


var BCRYPT_SALT_ROUNDS = 10;
router.post('/registrar', async(req, res) => {
    //req.body.contrasena = bcrypt.hashSync(request.body.contrasena, 10);
    const {nombreU, correo, contrasena, intentos} = req.body;
    const hashedPwd = await bcrypt.hash(req.body.contrasena, BCRYPT_SALT_ROUNDS);
    
    const nuevoUsuario = new Usuario({nombreU, correo, contrasena : hashedPwd});
    await nuevoUsuario.save();

    const nuevoPerfil = new Perfil({codigoUsuario: nuevoUsuario._id, codigoRol: 1});
    await nuevoPerfil.save();

    const token = jwt.sign({_id: nuevoUsuario._id}, 'secretkey');
    const perfil = await Perfil.findOne({codigoUsuario: nuevoUsuario._id});

    res.status(200).json({token,  rol: perfil.codigoRol})

});

router.post('/ingresar', async(req, res) => {
    const {nombreU, contrasena} = req.body;
    const usuario = await Usuario.findOne({nombreU}) 
    const perfil = await Perfil.findOne({codigoUsuario: usuario._id});
    if (usuario) {
        const cmp = await bcrypt.compare(contrasena, usuario.contrasena);
        if(cmp){
        const token = jwt.sign({_id: usuario._id},'secretkey');
        //const desc = jwt.sign({rol: perfil.codigoRol}, 'secretkey')
        res.status(200).json({token, rol: perfil.codigoRol})

        }
        if(!cmp) {
            return res.status(401).send("Contrasena Incorrecta");
        }
    }
    if (!usuario) return res.status(401).send("Usuario Inexistente");
    //if (usuario.contrasena !== contrasena) 

});


router.post('/accesopublico', (req,res) =>{
    res.json([
        {
            _id: 1,
            nombre: "prueba 1",
            descripcion: "prueba numero uno",
            fecha: "2020-08-07"
        },
        {
            _id: 2,
            nombre: "prueba 2",
            descripcion: "prueba numero dos",
            fecha: "2020-08-07"
        }
    ])
});

router.post('/accesoprivado', validarToken, (req,res) =>{
    res.json([
        {
            _id: 1,
            nombre: "prueba 1",
            descripcion: "prueba numero uno",
            fecha: "2020-08-07"
        },
        {
            _id: 2,
            nombre: "prueba 2",
            descripcion: "prueba numero dos",
            fecha: "2020-08-07"
        }
    ])
});

module.exports = router;

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



