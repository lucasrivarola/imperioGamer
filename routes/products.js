var express = require('express');
var router = express.Router();
var productsController= require("../controllers/productsController");
var adminCheckLogin = require("../middlewares/adminCheck");
var path = require('path')
const multer = require('multer');
var {check, validationResult, body} = require('express-validator');
var storage = multer.diskStorage({
	destination:(req,file,cb)=>{
		cb(null,'public/images/productos');
	},
	filename:(req,file,cb)=>{
		cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
	}
});
var upload = multer({storage:storage});
/* GET listado productos para el admin. */

router.get('/', adminCheckLogin, productsController.listadoDeProductos);

router.get('/create', adminCheckLogin, productsController.mostrarCargaProd);
router.post('/', upload.any(), [
	check("section").isLength({min:1}).withMessage('El campo sección esta  vacio'),
	check("name").isLength({min:1}).withMessage('El campo titulo esta  vacio'),
	check("category").isLength({min:1}).withMessage('El campo categoria esta  vacio'),
	check("description").isLength({min:30}).withMessage('El campo descripcion tiene que tener mas de 30 caracteres'),
	check("plataforma").isLength({min:1}).withMessage('El campo plataforma esta  vacio'),
	check("idioma").isLength({min:1}).withMessage('El campo idioma esta vacio'),
	check("price").isLength({min:1}).withMessage('El campo precio esta vacio'),
	check("discount").isLength({min:1, max:100}).withMessage('El campo descuento tiene que estar entre los valores 0 y 100'),
  ], productsController.cargaProducto);

router.get('/:id', adminCheckLogin, productsController.mostrarDetalleProducto);
router.delete('/:id', productsController.delete);

router.get('/:id/edit', adminCheckLogin, productsController.formEdit);
router.put('/:id',upload.any(), [
	check("section").isLength({min:1}).withMessage('El campo sección esta  vacio'),
	check("name").isLength({min:1}).withMessage('El campo titulo esta  vacio'),
	check("category").isLength({min:1}).withMessage('El campo categoria esta  vacio'),
	check("description").isLength({min:30}).withMessage('El campo descripcion tiene que tener mas de 30 caracteres'),
	check("plataforma").isLength({min:1}).withMessage('El campo plataforma esta  vacio'),
	check("idioma").isLength({min:1}).withMessage('El campo idioma esta vacio'),
	check("price").isLength({min:1}).withMessage('El campo precio esta vacio'),
	check("discount").isLength({min:1, max:100}).withMessage('El campo descuento tiene que estar entre los valores 0 y 100'),
  ], productsController.edit);




module.exports = router;
