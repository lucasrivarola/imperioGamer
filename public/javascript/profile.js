window.onload = function(){

    let form = document.querySelector('form.editProfile');
    
    let password = document.querySelector('input.password');
    let password2 = document.querySelector('input.password2');
    let first_name = document.querySelector('input.first_name');
    let last_name = document.querySelector('input.last_name');
    let dni = document.querySelector("input#dni")
    let tel = document.querySelector("input#tel")
    let direccion = document.querySelector("input#direccion")
    let ulErrors = document.querySelector("div.errors")
    
    let errors = []

    function inputRojo(elemento){
        elemento.classList.add("input-error");
    }

    function inputVerde(elemento){
        elemento.classList.add("input-exito");
    }

    /* -------- Validacion en vivo ---------- */

    password.addEventListener("blur",function(e){
        if(password.value){
            inputVerde(password)
        } else {
            password.classList.remove("input-exito");
            inputRojo(password)
            
        }
    })

    password2.addEventListener("blur",function(e){
        if(password2.value){
            inputVerde(password2)
        } else {
            password2.classList.remove("input-exito");
            inputRojo(password2)
            
        }
    })


    first_name.addEventListener("blur",function(e){
        if(first_name.value){
            inputVerde(first_name)
        } else {
            first_name.classList.remove("input-exito");
            inputRojo(first_name)
            
        }
    });

    last_name.addEventListener("blur",function(e){
        if(last_name.value){
            inputVerde(last_name)
        } else {
            last_name.classList.remove("input-exito");
            inputRojo(last_name)
        }
    });

    dni.addEventListener("blur",function(e){
        if(dni.value){
            inputVerde(dni)
        } else {
            dni.classList.remove("input-exito");
            inputRojo(dni)
        }
    });

    tel.addEventListener("blur",function(e){
        if(tel.value){
            inputVerde(tel)
        } else {
            tel.classList.remove("input-exito");
            inputRojo(tel)
        }
    });

    direccion.addEventListener("blur",function(e){
        if(direccion.value){
            inputVerde(direccion)
        } else {
            direccion.classList.remove("input-exito");
            inputRojo(direccion)
        }
    });

    /*-------  Funciones del Sumbit ------- */


    function validLastName(last_name){
        if (last_name === "" || last_name === null) {
            errors.push("El campo Apellido esta vacio");
        } 
    }

    function validDni(dni){
        if (dni === "" || dni === null) {
            errors.push("El campo DNI esta vacio");
        } 
    }

    function validTel(tel){
        if (tel === "" || tel === null) {
            errors.push("El campo Telefono esta vacio");
        } 
    }

    function validDireccion(direccion){
        if (direccion === "" || direccion === null) {
            errors.push("El campo Direccion esta vacio");;
        } 
    }
   
    function crearUl(){
        
        ulErrors.innerHTML = "<ul class='lista errors'></ul>";
    }
      
    function crearLi(){
        let lista = document.querySelector("ul.lista");
        errors.forEach(function (element) {
        lista.innerHTML += `<li class="msg-error"><span>${element}</span></li>`;
    });
        errors = [];
    }
    

    
   
    form.addEventListener("submit", function(e){
        validfirstName(first_name.value);
        validLastName(last_name.value);
        validDni(dni.value);
        validTel(tel.value);
        validDireccion(direccion.value);
       if(errors.length > 0){
         e.preventDefault()
         crearUl();
         crearLi();
       }    
      });
}