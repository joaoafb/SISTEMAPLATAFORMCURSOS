var notify = document.querySelector('#notify')


document.getElementById("nome").value = localStorage.getItem("nome")
document.getElementById("email").value = localStorage.getItem("email")
document.getElementById("codigo").value = localStorage.getItem("meucodigo")
document.getElementById("codigousado").value = localStorage.getItem("codigousado")
document.getElementById("sobre").value = localStorage.getItem("sobre")


    
let base64String = "";


  
function atualizarperfil() {
    var file = document.querySelector(
        'input[type=file]')['files'][0];
  
    var reader = new FileReader();
    console.log("next");
      
    reader.onload = function () {
        base64String = reader.result.replace("data:", "")
            .replace(/^.+,/, "");
  
        imageBase64Stringsep = base64String;
  
  
        mudarsobre()
        function mudarsobre(){
            db.collection("usuarios").doc(localStorage.getItem("email")).update({
               urlimg:base64String,
     
            
            
            })
            .then(() => {
                notify.play()
                Swal.fire(
                    'Perfil Atualizado Com Sucesso!',
                    '',
                    'success'
                  )
            })
            .catch((error) => {
                notify.play()
                Swal.fire(
                    'Imagem Maior Que 11MB, Escolha Outra!',
                    '',
                    'error'
                  )
            });
            }

    }
    reader.readAsDataURL(file);
   
        
        
        
        
    
}

  


