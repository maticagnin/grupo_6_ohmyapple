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



})
