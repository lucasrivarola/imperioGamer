window.onload = function(){

    let form = document.querySelector('form.createProduct');
    
   
    let section = document.querySelector('input.section');
    let titulo = document.querySelector('input.titulo');
    let category = document.querySelector('select.category');
    let description = document.querySelector('textarea.description');
    let plataforma = document.querySelector('select.plataforma');
    let idioma = document.querySelector('select.idioma');
    let price = document.querySelector('input.price');
    let discount = document.querySelector('input.discount');
    let ulErrors = document.querySelector("div.errors")
   
    
    let errors = []

    function inputRojo(elemento){
        elemento.classList.add("input-error");
    }

    function inputVerde(elemento){
        elemento.classList.add("input-exito");
    }

    /* -------- Validacion en vivo ---------- */
    section.addEventListener("blur",function(e){
        if(section.value){
            inputVerde(section)
        } else {
            section.classList.remove("input-exito");
            inputRojo(section)
            
        }
    });

    titulo.addEventListener("blur",function(e){
        if(titulo.value){
            inputVerde(titulo)
        } else {
            titulo.classList.remove("input-exito");
            inputRojo(titulo)
        }
    });

    category.addEventListener("blur",function(e){
        if(category.value){
            inputVerde(category)
        } else {
            category.classList.remove("input-exito");
            inputRojo(category)
        }
    });

    description.addEventListener("blur",function(e){
        if(description.value){
            inputVerde(description)
        } else {
            description.classList.remove("input-exito");
            inputRojo(description)
        }
    });

    plataforma.addEventListener("blur",function(e){
        if(plataforma.value){
            inputVerde(plataforma)
        } else {
            plataforma.classList.remove("input-exito");
            inputRojo(plataforma)
        }
    });

    idioma.addEventListener("blur",function(e){
        if(idioma.value){
            inputVerde(idioma)
        } else {
            idioma.classList.remove("input-exito");
            inputRojo(idioma)
        }
    });

    price.addEventListener("blur",function(e){
        if(price.value){
            inputVerde(price)
        } else {
            price.classList.remove("input-exito");
            inputRojo(price)
        }
    });

    discount.addEventListener("blur",function(e){
        if(discount.value){
            inputVerde(discount)
        } else {
            discount.classList.remove("input-exito");
            inputRojo(discount)
        }
    });

   




    /*-------  Funciones del Sumbit ------- */
    function validSection(section){
        if (section === "" || section === null) {
            errors.push("El campo Nombre esta vacio");
        } 
    }

    function validTitulo(titulo){
        if (titulo === "" || titulo === null) {
            errors.push("El campo Titulo esta vacio");
        } 
    }

    function validCategory(category){
        if (category === "" || category === null) {
            errors.push("El campo Category esta vacio");
        } 
    }

    function validDescription(description){
        if(description.length < 30 || (description === "" || description === null)){
            errors.push("El campo Descripcion debe tener mas de 30 caracteres")
        }
    }

    function validPlataforma(plataforma){
        if (plataforma === "" || plataforma === null) {
            errors.push("El campo Plataforma esta vacio");;
        } 
    }

    function validIdioma(idioma){
        if (idioma === "" || idioma === null) {
            errors.push("El campo Idioma esta vacio");;
        } 
    }

    function validPrice(price){
        if (price === "" || price === null) {
            errors.push("El campo Price esta vacio");;
        } 
    }

    function validDiscount(discount){
        if (discount === "" || discount === null) {
            errors.push("El campo Descuento esta vacio");;
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
        validSection(section.value);
        validTitulo(titulo.value);
        validCategory(category.value);
        validPlataforma(plataforma.value);
        validDescription(description.value);
        validIdioma(idioma.value);
        validPrice(price.value);
        validDiscount(discount.value);
       if(errors.length > 0){
         e.preventDefault()
         crearUl();
         crearLi();
       }    
      });
}