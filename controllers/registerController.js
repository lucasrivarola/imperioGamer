const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
var { check, validationResult, body } = require("express-validator");
let db = require("../database/models");

let registerController = {
  /* Renderea página de registro. */
  mostrarPaginaRegistro: function (req, res, next) {
    res.render("register", {
      user: req.session.login,
      title: "Registrate",
    });
  },
  nuevoUsuario: function (req, res, next) {
    let email = req.body.email;
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render("register", {
        errors: errors.errors,
        user: req.session.login,
      });
    } else {
      db.usuarios
        .findOne({ where: { email: email } })
        .then(function (resultado) {
          if (resultado == null) {
            let encriptado = bcrypt.hashSync(req.body.password, 10);
            
            let avatar;
            if (req.files[0] != undefined) {
              avatar = req.files[0].filename;
              
            } else {
              avatar = "unnamed.png";
            } 
            
            db.usuarios
              .create({
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
                is_admin: "no",
              })
              .then(function (usuarioCreado) {
                db.usuarios.findOne({ where: { email: email } })
                  .then(function (resultado) {
                    req.session.login = resultado;
                    db.carritos.create({
                      usuario_id: resultado.dataValues.id
                    })
                    res.redirect("/user/profile/" + req.session.login.id);
                  });
              });
          } else {
            if (resultado.dataValues.email == email) {
              res.redirect("/ingreso-usuario");
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
};

module.exports = registerController;
