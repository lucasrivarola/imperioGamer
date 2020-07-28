const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
var {check, validationResult, body} = require('express-validator');

function userCheck(req,res,next){
    let user;
    if(req.session.login == undefined){
        user = req.session.login
         res.redirect('/ingreso-usuario')
    } else {
        next();
    }
 
}

module.exports = userCheck