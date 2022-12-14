const {response, request} = require("express");
const bcryptjs = require("bcryptjs")

const Usuario = require("../models/usuario");






const usuariosGET = async(req = request, res = response) => {

    const {limite = 5, desde = 0} = req.query;
    const query = {estado: true};


    const [total, usuarios] = await Promise.all([
      Usuario.countDocuments(query),
      Usuario.find(query)
      .skip(Number(desde))
      .limit(Number(limite))
    ]);
    
  
    res.json({
     total, 
     usuarios
    });
  }








const usuariosPUT = async (req, res = response) => {

    const {id} = req.params;
    const {_id, password, google, correo, ...resto} = req.body;

    //TODOvalidar contra BD
    if (password) {
      //encriptar password
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json(usuario);

  }







const usuariosPOST = async (req, res = response) => {

 
    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({nombre, correo, password, rol});

    
    //guardar en bd
    await usuario.save();

    res.json({

        usuario
    });
  }







const usuariosDELETE = async(req, res = response) => {

    const {id} = req.params;

    //fisicamente borrado
    // const usuario = await Usuario.findByIdAndDelete(id);
    const usuario = await Usuario.findByIdAndUpdate(id,{ estado: false});


    res.json(usuario);
  }







const usuariosPATCH = (req, res = response) => {
    res.json({
        msg: "patch API usuariosPATCH"
    });
  }








  module.exports = {
    usuariosGET,
    usuariosPUT,
    usuariosPOST,
    usuariosDELETE,
    usuariosPATCH
  }