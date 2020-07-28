var express = require("express");
var router = express.Router();
var usuariosApiController = require("../../controllers/api/apiUsuariosControllers")
var userCheck = require("../../middlewares/userCheckLogin")

router.get("/usuario", usuariosApiController.encontrarUsuario)
router.get('/carritos', userCheck,usuariosApiController.api);
router.get('/productos',usuariosApiController.apiProd);

module.exports = router