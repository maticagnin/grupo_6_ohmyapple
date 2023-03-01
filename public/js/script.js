window.addEventListener("load", function(){

    let inputPassword = document.querySelector(".inputpass")


        inputPassword.addEventListener("focus", function(){
            if(inputPassword.value.length < 8){
                inputPassword.placeholder = "8 digitos como mínimo";

               

                 inputPassword.addEventListener("blur", function(){
                    inputPassword.placeholder = "Contraseña";
                 })
            }
        })

    let formulario = document.querySelector(".register-form-box")

    formulario.addEventListener("submit", function (e) {
        
        let errores = [];

        let campoNombre_apellido = document.querySelector("input.nombre_apellido");

        if(campoNombre_apellido.value == ""){
            errores.push("El campo Nombre y Apellido debe estar completo");
        }else if (campoNombre_apellido.value.length < 2){
            errores.push("El campo Nombre y Apellido debe tener mínimo 2 caracteres")
        }

        let campoEmail = document.querySelector("input.email");
        let regEmail =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


        if(campoEmail.value == ""){
            errores.push("El campo Email debe estar completo");
            campoEmail.classList.add("is-invalid");
        } else if (!regEmail.test(campoEmail.value)) {
            errores.push("El formato de email es inválido..");
            campoEmail.classList.add("is-invalid");
        } else {
            campoEmail.classList.add("is-valid");
            campoEmail.classList.remove("is-invalid");
        }     


        let campoPass = document.querySelector("input.inputpass");

        if(campoPass.value == ""){
            errores.push("El campo Contraseña debe estar completo");
        }else if (campoPass.value.length < 8){
            errores.push("El campo Contraseña debe tener mínimo 8 caracteres")
        }

        if (errores.length > 0){
            e.preventDefault();

            let ulErrores = document.querySelector("div.errores ul");

            ulErrores.innerHTML = ""

            for(let i = 0; i < errores.length; i++){
                ulErrores.innerHTML += "<li>" + errores[i] + "</li>"
            }
        }
 
    })
})

window.addEventListener("load", function(){

    let inputPassword = document.querySelector(".inputpass")


        inputPassword.addEventListener("focus", function(){
            if(inputPassword.value.length < 8){
                inputPassword.placeholder = "8 digitos como mínimo";

               

                 inputPassword.addEventListener("blur", function(){
                    inputPassword.placeholder = "Contraseña";
                 })
            }
        })

    let formularioLogin = document.querySelector(".form-box")

    formularioLogin.addEventListener("submit", function (e) {
        
        let errores = [];

        let campoEmail = document.querySelector("input.email");
        let regEmail =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


        if(campoEmail.value == ""){
            errores.push("El campo Email debe estar completo");
            campoEmail.classList.add("is-invalid");
        } else if (!regEmail.test(campoEmail.value)) {
            errores.push("El formato de email es inválido.");
            campoEmail.classList.add("is-invalid");
        } else {
            campoEmail.classList.add("is-valid");
            campoEmail.classList.remove("is-invalid");
        }     


        let campoPass = document.querySelector("input.inputpass");

        if(campoPass.value == ""){
            errores.push("El campo Contraseña debe estar completo");
        }else if (campoPass.value.length < 8){
            errores.push("El campo Contraseña debe tener mínimo 8 caracteres")
        }

        if (errores.length > 0){
            e.preventDefault();

            let ulErrores = document.querySelector("div.errores ul");

            ulErrores.innerHTML = ""

            for(let i = 0; i < errores.length; i++){
                ulErrores.innerHTML += "<li>" + errores[i] + "</li>"
            }
        }
 
    })
})

    window.addEventListener("load", function(){
        
    let formularioCreacion = document.querySelector("form.creacion-formulario")

    formularioCreacion.addEventListener("submit", function (e) {
    
        let errores = [];
        let campoNombre = document.querySelector(".nombre");

        if(campoNombre.value == ""){
            errores.push("El campo Nombre debe estar completo");
        }else if (campoNombre.value.length < 5){
            errores.push("El campo Nombre debe tener mínimo 5 caracteres")
        }

        let campoDescripcion = document.querySelector(".descripcion");

        if(campoDescripcion.value.length < 20){
            errores.push("El campo Descripción debe tener mínimo 20 caracteres")
        }

        if (errores.length > 0){
            e.preventDefault();

            let ulErrores = document.querySelector("div.errores ul");
            ulErrores.innerHTML = ""
            for(let i = 0; i < errores.length; i++){
                ulErrores.innerHTML += "<li>" + errores[i] + "</li>"
            }
        }
    })
 

})

window.addEventListener("load", function(){
    let burger = document.querySelector(".burger");
    let hamburguesa = document.querySelector(".home-barraLateral");
    let main = document.querySelector(".home-main");

    burger.addEventListener("click", function(){
        hamburguesa.style.display = "flex"
        hamburguesa.style.position = "absolute"
        hamburguesa.style.width = "70%"
        hamburguesa.style.zIndex = "1"
        main.style.justifyContent = "left"

        burger.addEventListener("click", function(){
            hamburguesa.style.display = "none"
     
        })
 
    })

})
