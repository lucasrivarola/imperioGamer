var express = require('express');
var router = express.Router();
var productCartControllers = require("../controllers/productCartControllers")
var userCheck = require("../middlewares/userCheckLogin");


/* GET productos que compró el usuario */
router.get('/tus-productos', userCheck,productCartControllers.verProductosUsuario);
router.post('/tus-productos/:prod/:cart',userCheck,productCartControllers.eliminarProd);
router.post('/tus-productos/:id',userCheck, productCartControllers.eliminarCarrito);


module.exports = router;
