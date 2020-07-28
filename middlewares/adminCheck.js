const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
var {check, validationResult, body} = require('express-validator');

function userCheck(req,res,next){
    if(req.session.login !== undefined){
        if(req.session.login.is_admin == 'no'){
            user = req.session.login
            res.redirect('/')
        } else {
            next();
        }
 
    } else {
        res.redirect('/')
    }
}
module.exports = userCheck