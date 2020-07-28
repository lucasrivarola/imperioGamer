const db = require("../../database/models");

let ingresoUsuarioController = {

encontrarUsuario: function (req, res, next) {

  db.usuarios.findAll()
        .then(function(usuarios){

          res.json(usuarios)

        })
 },
 api: function(req, res){
  let user = req.session.login;
  let user_id = new String(user.id)
  
  db.carritos.findAll({
    where: {usuario_id: user_id},
    include: [{association: "products"}]
  })
  .then(function(respuesta){
    res.send(respuesta[0])
  })
},
apiProd: function(req, res){
  db.products.findOne({
    include: [{association: "languages"}, {association: "platforms"}, {association: "categories"}, {association: "carritos"}]
  })
  .then(function(respuesta){
    let rta = respuesta.languages.language_name;
    res.send(respuesta)
  })
}

}

module.exports = ingresoUsuarioController;