const {response, request} = require("express")

const usuariosGET = (req = request, res = response) => {

    const {q, nombre = "No name", apikey, page = 1, limit} = req.query;

    res.json({
        msg: "get API - CONTROLADOR",
        q, nombre, apikey, page, limit
    });
  }


const usuariosPUT = (req, res = response) => {

    const {id} = req.params;

    res.json({
        msg: "put API usuariosPUT",
        id
    });
  }


const usuariosPOST = (req, res = response) => {

    const {nombre, edad} = req.body;


    res.json({
        msg: "post API usuariosPOST",
        nombre,
        edad
    });
  }


const usuariosDELETE = (req, res = response) => {
    res.json({
        msg: "delete API usuariosDELETE"
    });
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