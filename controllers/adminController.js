const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
var {check, validationResult, body} = require('express-validator');
let db = require('../database/models');

let registerAdminController = {
/* Renderea página de registro. */
    mostrarPaginaAdmin: function(req, res, next) {

        db.usuarios.findByPk(req.session.login.id)
        .then(usuario=>{
           
                res.render('/');   
            }
        )
        
       
        res.render('adminPanel');    
   },

   registerAdmin: function(req, res, next){
       let user = req.session.login
            console.log(typeof user)
            res.render('register', {
                title: "Ingresá a tu cuenta",
                user: user,
            });
        
   },

   nuevoUsuarioAdmin: function(req, res, next){
    let email = req.body.email
    let errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.render('register', {errors: errors.errors})
           } else {
           db.usuarios.findOne({ where: { email: email } })
            .then(function(resultado){
            if(resultado == null){
                
                let encriptado = bcrypt.hashSync(req.body.password, 10);

                let avatar;
                if (req.file === undefined) {
                  avatar = "unnamed.png"
              } else {
                  avatar = req.files[0].filename;
              }
                 db.usuarios.create({
                  first_name: req.body.nombre,
                  last_name: req.body.apellido,
                  dni: req.body.dni,
                  direccion: req.body.direccion,
                  tel: req.body.telefono,
                  email: req.body.email,
                  password: encriptado,
                  avatar: avatar,
                  localidad_id: 1,
                  provincia_id: 1, 
                  is_admin: "yes"
                 }).then(function(usuarioCreado){

                if(!errors.isEmpty()){
                    return res.render('register', {errors: errors.errors})
                } else {

                    db.usuarios.findOne({ where: { email: email } }).then(function(resultado){
                        res.redirect('/admin')
                    })
                }
                 })

            } else {
                if(resultado.dataValues.email ==  email){
                    res.redirect('/ingreso-usuario')
                }
            }
    })
    .catch(err =>{
        console.log(err)
    })
    }
   }
}

module.exports = registerAdminController