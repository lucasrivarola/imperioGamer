var express = require('express');
var router = express.Router();
var homeController = require("../controllers/homeController");
var userCheck = require("../middlewares/userCheckLogin");

/* GET HOME. */
router.get('/', homeController.mostrarHome);
router.get('/contacto',homeController.contacto);
router.post('/contacto',homeController.contactados);
router.get('/search', homeController.search);
router.get('/politicas-de-privacidad', homeController.politicas);
router.get('/nosotros', homeController.nosotros);

module.exports = router;
