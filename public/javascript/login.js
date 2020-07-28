const form = document.querySelector(" .ingreso-usuario")
const email = document.querySelector("#email");
const password = document.querySelector("#password")
const errorEmail = document.querySelector("#error-email")
const errorPassword = document.querySelector("#error-password")
const errorDiv = document.querySelector(".error");
const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const errorBack = document.querySelector("#error-back")


let mensajes = [];

function inputRojo(elemento) {
  elemento.classList.add("input-error");
}

function inputVerde(elemento) {
  elemento.classList.add("input-exito");
}


function validarEmail(emailUsuario) {
  if (emailUsuario === "" || emailUsuario === null) { 
    mensajes.push("Debe ingresar un correo electrónico válido.");
    inputRojo(email);
  } else if (!emailFormat.test(emailUsuario)) {
    mensajes.push("El correo electrónico debe tener un formato válido.");
    inputRojo(email);
  } else {
    inputVerde(email);
  }
}

function validarPassword(passwordUsuario){
  if (passwordUsuario === "" || passwordUsuario === null) {
    mensajes.push("Debe ingresar una contraseña");
    inputRojo(password);
    password.value = "";
  } else {
    inputVerde(password);
  }
}


function crearUl(){
  errorDiv.innerHTML = "<ul id= 'lista'></ul>";
}

function crearLi(){
  let lista = document.querySelector("#lista");
  console.log(lista);
  mensajes.forEach(function (element) {
    lista.innerHTML += `<li class="msg-error">${element}</li>`;
  });
  mensajes = [];
}





form.addEventListener("submit", function(e){
  validarEmail(email.value)
 validarPassword(password.value);

  if (mensajes.length > 0) {
  e.preventDefault()
  crearUl();
    crearLi();
    errorBack.remove();
  }

  
  
})