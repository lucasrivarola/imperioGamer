const fs = require('fs');
let db = require('../database/models');
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

let productDetailController = {
    /* Renderea página detalle de producto. VISTA DEL USUARIO*/
        listarProductos: function(req,res,next){
            let user = req.session.login
            db.products.findAll()
                .then(function(product){
                    res.render('productsUsers',{
                        title: "Imperio Gamer",
                        productos: product,
                        user: req.session.login,
                        aMiles: toThousand
                    })
                })
        },

        categorias: function(req,res,next){
            let categ = req.params.category_id;
            db.products.findAll({where: {category_id : categ}})
            .then(function(producto){
                res.render("categorias",{
                    title: "Imperio Gamer",
                    productos: producto,
                    user: req.session.login,
                    aMiles: toThousand  
                })
            })
        },

        mostrarDetalleProducto: function(req, res, next) {
            let user = req.session.login

         db.products.findByPk(req.params.id,{include:
             [{association: "carritos"}, {association: "platforms"}, {association: "languages"}, {association: "categories"}]})
             .then(function(product){
                res.render("productDetail", {
                    title: product.product_name,
                    producto: product,
                    user: req.session.login,
                    aMiles : toThousand
                });
                console.log("entre a user: " + user.is_admin)
             })
           
       },

       agregarCarrito: function(req,res){
           let id_prod = req.params.id
           let  user = req.session.login
           let user_id = new String(user.id);
           db.carritos.findOne({where: {usuario_id: user_id}})
           .then(function(resultado){
               let cart = new String(resultado.id)
               db.carritoProductos.create({
                   carrito_id: cart,
                   product_id: id_prod
               }).then(function(){
                   db.products.findOne({
                    include: [{association: "categories"}],   
                    where:{id:id_prod}})
                   .then(function(respuesta){
                       res.redirect("/user/products/"+respuesta.category_id)
                   })
               })
           })
       },
       comprar: function(req, res){
            let id_prod = req.params.id
            let  user = req.session.login
           let user_id = new String(user.id);
           db.carritos.findOne({where: {usuario_id: user_id}})
           .then(function(resultado){
               let cart = new String(resultado.id)
               db.carritoProductos.create({
                   carrito_id: cart,
                   product_id: id_prod
               })
               res.redirect("/carrito/tus-productos");
           })
       }

    }


     
 module.exports = productDetailController