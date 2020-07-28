const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
var { check, validationResult, body } = require("express-validator");
const db = require("../database/models");

let ingresoUsuarioController = {
  /* Renderea página de login. */

  mostrarPaginaLogin: function (req, res, next) {
    let usuarioRegistrado = req.session.login;
    if (usuarioRegistrado) {
      res.redirect("/user/profile/" + usuarioRegistrado);
    } else {
      res.render("ingreso-usuario", {
        title: "Ingresá a tu cuenta",
        user: req.session.login,
      });

      console.log("entré a user: " + user);
    }
  },

  login: function (req, res, next) {
    let errors = validationResult(req);
    let email = req.body.email;

    db.usuarios.findOne({ where: { email: email } })
    .then(function (resultado) {
      if (resultado != null) {
        let password = req.body.password;

        if ( bcrypt.compareSync(password, resultado.dataValues.password)) {
          req.session.login = resultado.dataValues;
          if (req.body.check != undefined) {
            let tiempo = 1000 * 60 * 60;
            res.cookie("recordame", resultado.dataValues.id, {
              maxAge: tiempo,
            });
          }
          //cierra tercer if
          if(resultado.dataValues.is_admin == "yes"){
            db.carritos.create({
              usuario_id: resultado.dataValues.id
            })
            res.redirect("/admin");
            }else{
              db.carritos.create({
                usuario_id: resultado.dataValues.id
              })
              res.redirect("/user/profile/" + resultado.dataValues.id);
            }
            //cierra el cuarto if
        } else {
          res.render("ingreso-usuario", {
            title: "Ingresá a tu cuenta",
            errors: errors.errors,
            user: req.session.login,
          });
        }
        //cierra el segundo if
      } else {
        res.render("ingreso-usuario", {
          title: "Ingresá a tu cuenta",
          errors: errors.errors,
          user: req.session.login,
        });
      }
    });
    //cierra el primer if
  
  }

};

module.exports = ingresoUsuarioController;
