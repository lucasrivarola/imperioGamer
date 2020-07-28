var express = require('express');
var router = express.Router();
var ingresoUsuarioController = require("../controllers/ingresoUsuarioController");
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const { check, validationResult, body} = require("express-validator");
let db = require('../database/models')
let email= 
 

/* GET página de logueo */
router.get('/', ingresoUsuarioController.mostrarPaginaLogin); 
router.post('/',[
    check("email").isEmail().withMessage('Debe ingresar un mail válido').bail().custom((value, { req }) => {
      let email = req.body.email
      db.usuarios.findOne({where: {email: email}})

      .then(function(usuario){
        if (usuario.email == email) {
            return true;
          }
        
    
        return false
      })
      
    }).withMessage('El email no coincide con la contraseña.'),
    ],[

    body("password").custom((value, { req }) => {
      let password = req.body.password
      db.usuarios.findOne({where: {email: email}})
      .then(function(usuario){
        if (bcrypt.compareSync(password, usuario.password)){
          return true;
        }

        return false
      })
    }).withMessage("Contraseña inválida")


], ingresoUsuarioController.login);



module.exports = router;
