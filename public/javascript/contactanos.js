const nombre = document.querySelector("#nombre");
const email = document.querySelector("#email");
const comentario = document.querySelector("#comentario");
let input = document.querySelectorAll("input");
const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const form = document.querySelector("#contacto");
const error = document.querySelector("#error")
const errorNombre = document.querySelector("#error-nombre")
const errorEmail = document.querySelector("#error-email")
const errorComentario = document.querySelector("#error-comentario")


     
     let mensajes = [];
    
     
     function inputRojo(elemento) {
       elemento.classList.add("input-error");
     }
     
     function inputVerde(elemento) {
       elemento.classList.add("input-exito");
     }
     
     function validarNombre(nombreUsuario) {
       if (nombreUsuario === "" || nombreUsuario === null || nombreUsuario == undefined ) {
         mensajes.push("Debe ingresar un nombre.");
         errorNombre.innerHTML = "<span>Debe ingresar un nombre</span>"
         inputRojo(nombre);
       } else {
         inputVerde(nombre);
         errorNombre.innerHTML = ""
       }
     }
     
  
     
     function validarEmail(emailUsuario) {

       if (emailUsuario === "" || emailUsuario === null) { 
         mensajes.push("Debe ingresar un correo electrónico válido.");
         inputRojo(email);
         errorEmail.innerHTML = "<span>Debe ingresar un Email</span>"
       } else if (!emailFormat.test(emailUsuario)) {
         mensajes.push("El correo electrónico debe tener un formato válido.");
         errorEmail.innerHTML = "<span>Debe ingresar un Email con formato válido</span>"
         inputRojo(email);
       } else {
         inputVerde(email);
         errorEmail.innerHTML = ""
         mensajes = []
       }

     }
     
     function validarComentario(comentarioUsuario) {
       if (comentarioUsuario === "" || comentarioUsuario === null) {
         mensajes.push("Debe ingresar un mensaje.");
         inputRojo(comentario);
         errorComentario.innerHTML = "<span>Debe ingresar un mensaje</span>"
       } else if (comentarioUsuario.length < 40) {
         mensajes.push("Su mensaje debe tener al menos 40 caracteres.");
         inputRojo(comentario);
         errorComentario.innerHTML = "<span>Su mensaje debe tener al menos 40 caracteres</span>"
       } else {
         inputVerde(comentario);
         errorComentario.innerHTML = ""
       }
     }

    
     form.addEventListener("submit", function (e) {
console.log(nombre.value)
       validarNombre(nombre.value);
       validarEmail(email.value);
       validarComentario(comentario.value);
      console.log(mensajes)
       if (mensajes.length > 0) {
         e.preventDefault();
         
       }
      
     });
    
  

 


