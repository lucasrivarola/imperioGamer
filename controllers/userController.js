const fs = require('fs')
const path = require('path');
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
let db = require('../database/models');
let checkLogin = require('../middlewares/userCheckLogin')
var {check, validationResult, body} = require('express-validator');
const bcrypt = require('bcrypt');

let homeController = {

    mostrarPerfil: function(req, res, next) {
    db.usuarios.findByPk(req.params.id).then(function (usuario){
      res.render('profile',{
        title: usuario.first_name,
        usuario: usuario,
        mgs:"",
        user: req.session.login
      });
    })
 
   },

   editPerfil:function(req, res, next) {
     
    let errors = validationResult(req)
   let password; 
   let password2 = req.body.password2;
   let avatar;
   
   if(!errors.isEmpty()){
     
    db.usuarios.findByPk(req.params.id).then(function (usuario){
      console.log("errors " + errors.errors[0].msg)
      res.render('profile',{
        title: usuario.first_name,
        usuario: usuario,
        mgs:"",
        errors: errors.errors,
        user: req.session.login
      });
    })
    
  } else { 
   
   if (req.body.password == password2) {
    if (req.body.password == "") {
      db.usuarios.findByPk(req.params.id).then(function(usuario){
       password = usuario.password;
  
      })
     } else {
       password = bcrypt.hashSync(req.body.password, 10);
     } 
   } 
    
   
   db.usuarios.findByPk(req.params.id)
      .then(function(usuario){
        if (req.files[0] != undefined) {
        avatar = req.files[0].filename;
        
        } else {
          avatar = usuario.avatar;
        }

        db.usuarios.findByPk(req.params.id)
        .then(function(usuario){
        if (req.files[0] != undefined) {
        avatar = req.files[0].filename;
        
        } else {
          avatar = usuario.avatar;
        } 

        db.usuarios.update({
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          dni: req.body.dni,
          email: req.body.email,
          tel: req.body.tel,
          password: password,
          direccion: req.body.direccion,
          avatar: avatar
        },
        
        {
                 
         where: {
             id: req.params.id
         }
     
       })
        res.redirect("/user/profile/"+ req.params.id)

       })
      })
  
  }

  },

  deslogUser: function(req,res, next){
    req.session.destroy();
    res.redirect('/');
  }

}


module.exports = homeController