const form = document.querySelector("#registro-usuario");
const nombre = document.querySelector("#name");
const apellido = document.querySelector("#apellido");
const direccion = document.querySelector("#direccion");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const error = document.querySelector("#error");
const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const avatarFile = document.querySelector("#avatar");
const extensionesPermitidos =  /(\.jpg|\.jpeg|\.png|\.gif)$/i;
let input = document.querySelectorAll("input");


  fetch("http://localhost:3000/api/usuario")
  .then(function(response){
       return response.json();
  })
  .then(function(emails){

     
     let mensajes = [];
    
     
     function inputRojo(elemento) {
       elemento.classList.add("input-error");
     }
     
     function inputVerde(elemento) {
       elemento.classList.add("input-exito");
     }
     
     function validarNombre(nombreUsuario) {
       if (nombreUsuario === "" || nombreUsuario === null) {
         mensajes.push("Debe ingresar un nombre.");
         inputRojo(nombre);
       } else if (nombreUsuario.length < 2) {
         mensajes.push("El nombre debe tener al menos 2 caracteres");
       } else {
         inputVerde(nombre);
       }
     }
     
     function validarApellido(apellidoUsuario) {
       if (apellidoUsuario === "" || apellidoUsuario === null) {
         mensajes.push("Debe ingresar un apellido.");
         inputRojo(apellido);
       } else if (apellidoUsuario.length < 2) {
         mensajes.push("El apellido debe tener al menos 2 caracteres");
         inputRojo(apellido);
       } else {
         inputVerde(apellido);
       }
     }
     
     function validarDireccion(direccionUsuario) {
       if (direccionUsuario === "" || direccionUsuario === null) {
         mensajes.push("Debe ingresar una dirección.");
         inputRojo(direccion);
       } else {
         inputVerde(direccion);
       }
     }
     
     function validarEmail(emailUsuario) {
      let correoEnBase;

      for(let i = 0; i < emails.length; i++) {
    
        if (emails[i].email == emailUsuario) {
          correoEnBase = emailUsuario
          break;
        }
      
      }



       if (emailUsuario === "" || emailUsuario === null) { 
         mensajes.push("Debe ingresar un correo electrónico válido.");
         inputRojo(email);
       } else if (!emailFormat.test(emailUsuario)) {
         mensajes.push("El correo electrónico debe tener un formato válido.");
         inputRojo(email);
       } else if (correoEnBase == emailUsuario) {
        mensajes.push("El correo electrónico ya se encuentra en nuestra base de datos.");
        inputRojo(email);
       } else {
         inputVerde(email);
       }

       
     
     }
     
     function validarPassword(passwordUsuario) {
       if (passwordUsuario === "" || passwordUsuario === null) {
         mensajes.push("Debe ingresar una contraseña.");
         inputRojo(password);
         password.value = "";
       } else if (passwordUsuario.length < 8) {
         mensajes.push("La contraseña debe tener al menos 8 caracteres.");
         inputRojo(password);
         password.value = "";
       } else {
         inputVerde(password);
       }
     }

     function validarExtensionArchivo(archivoUsuario) {
       if (archivoUsuario != "" && !extensionesPermitidos.exec(archivoUsuario) ) {
        mensajes.push("Solo puede subir archivos con formato jpg, jpeg, png o gif.");
       }
     }
     
     function crearUl() {
       error.innerHTML = "<ul id= 'lista'></ul>";
     }
     
     function crearLi() {
       let lista = document.querySelector("#lista");
       mensajes.forEach(function (element) {
         lista.innerHTML += `<li class="msg-error">${element}</li>`;
       });
       mensajes = [];
     }
     
     form.addEventListener("submit", function (e) {

       validarNombre(nombre.value);
       validarApellido(apellido.value);
       validarDireccion(direccion.value);
       validarEmail(email.value);
       validarPassword(password.value);
      validarExtensionArchivo(avatarFile.value);
      
     
       if (mensajes.length > 0) {
         e.preventDefault();
         crearUl();
         crearLi();
       }
     });
    
  
  })
 


