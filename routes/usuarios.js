const {Router} = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("..//middlewares/validar-campos");
const { esRoleValido, emailExiste, existeUsuarioPorId } = require("../helpers/db-validators");

const { usuariosGET, 
        usuariosPUT, 
        usuariosPOST, 
        usuariosDELETE, 
        usuariosPATCH } = require("../controllers/usuarios");

const router = Router();





router.get('/', usuariosGET);




router.put('/:id',[
        check("id", "No es un id valido").isMongoId(),
        check("id").custom(existeUsuarioPorId),
        check("rol").custom(esRoleValido),
        validarCampos
], usuariosPUT);


router.post('/', [
        check("nombre", "Nombre obligatorio").not().isEmpty(),
        check("password", "Password debe de ser de 6 letras como minimo").isLength({min: 6}),
        check("correo", "Correo no valido").isEmail(),
        check("correo").custom(emailExiste),
        // check("rol", "No es un rol permitido").isIn("ADMIN_ROLE","USER_ROLE"),
        check("rol").custom(esRoleValido),
        validarCampos
], usuariosPOST);


router.delete('/:id', [
        check("id", "No es un id valido").isMongoId(),
        check("id").custom(existeUsuarioPorId),
        validarCampos
], usuariosDELETE);

router.patch('/', usuariosPATCH);


  module.exports = router;