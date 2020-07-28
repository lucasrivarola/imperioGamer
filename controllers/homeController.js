const fs = require('fs')
const path = require('path');
let db = require('../database/models');
const { Sequelize } = require('../database/models');
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const Op = Sequelize.Op

let populares;
let ofertas;
let banner;

let homeController = {

    /* Renderea el home. */

  
    mostrarHome: function(req, res, next) {
      var usuarioLogueado;
      if (req.session.login != undefined) {
         usuarioLogueado = req.session.login
      }
     
      db.products.findAll({
        where: {section: "populares"}, limit: 8 ,
        order: [["id","DESC"]],
      })
      .then(function(products){
        populares = products
        db.products.findAll({
          where: {section: "ofertas" }, limit: 8 ,
          order: [["id","DESC"]],
        })
        .then(function(products2){
          ofertas = products2
          db.products.findAll({
            where: {section: "banner"},
            order: [["id", "DESC"]]
          })
          .then(function(products3){
            console.log(usuarioLogueado)
            banner = products3;
            res.render('index',{
              title: "Imperio Gamer",
              populares: populares,
              ofertas: ofertas,
              banner: banner,
              user: req.session.login
            })
          })
        })
      })
      

   },

   search: function(req, res) {
    let userSearch = req.query.search
    db.products.findAll({where: {product_name: {[Op.like]: "%" + userSearch + "%" }}})
        
           .then(function(products) {
             res.render("search", {
               title: 'busqueda',
               productos:products,
               user: req.session.login,
               aMiles: toThousand
              })
           })
    
  },

  contacto: function(req,res){
    res.render("contacto",{
      title: "Contacto",
      user: req.session.login
    })
  },

  contactados: function(req,res){
    res.render("contactados",{
      title: "Contacto",
      user: req.session.login
    })
  },


  politicas: function(req,res){
    res.render("politicas",{
      title: "Politicas de privacidad",
      user: req.session.login
    })
  },

  nosotros: function(req,res){
    res.render("nosotros",{
      title: "Nosotros",
      user: req.session.login
    })
  },
}


module.exports = homeController