var notify = document.querySelector('#notify')
document.getElementById("imgperfil").src = localStorage.getItem("urlimg")



document.getElementById("nomeperfil").innerHTML = localStorage.getItem("nome")

document.getElementById("cargo").innerText = localStorage.getItem("cargo")
document.getElementById("img").src = localStorage.getItem("urlimg")






var files = [];
document.getElementById("files").addEventListener("change", function(e) {
    files = e.target.files;
    for (let i = 0; i < files.length; i++) {
        console.log(files[i]);
    }
});

document.getElementById("send").addEventListener("click", function() {
    //checks if files are selected
    if (files.length != 0) {
        //Loops through all the selected files
        for (let i = 0; i < files.length; i++) {
            //create a storage reference
            var storage = firebase.storage().ref(files[i].name);

            //upload file
            var upload = storage.put(files[i]);

            //update progress bar
            upload.on(
                "state_changed",
                function progress(snapshot) {
                    var percentage =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    document.getElementById("progress").innerText = "Enviando: " + percentage + '%'

                },

                function error() {
                    alert("error uploading file");
                },

                function complete() {

                    getFileUrl(files[i].name)
                    Swal.fire(
                        'Foto de Perfil Atualizada',
                        '',
                        'success'
                    )

                }
            );
        }
    } else {
        alert("No file chosen");
    }
});

function getFileUrl(filename) {
    //create a storage reference
    var storage = firebase.storage().ref(filename);

    //get file url
    storage
        .getDownloadURL()
        .then(function(url) {
            console.log(url);
            localStorage.setItem("urlimg", url)
            enviarimg()

        })
        .catch(function(error) {
            console.log("error encountered");
        });
}

function enviarimg() {
    db.collection("usuarios").doc(localStorage.getItem("email")).update({
            urlimg: localStorage.getItem("urlimg")
        })
        .then(() => {
            console.log("Document successfully updated!");
        })
        .catch((error) => {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
}




function foto() {
    document.getElementById("boxfoto").style.transition = "1s"
    document.getElementById("boxfoto").style.display = "block"
}

function sobre() {
    Swal.fire({
        title: '<strong>Informações</strong>',
        icon: '',
        html: '<span style="color:white;">Email:</span><span id="email"></span>' +
            '<span style="color:white;">Código(Ref):</span><span id="codigo"></span>' +
            '<span style="color:white;">Código(Usado):</span><span id="codigousado"></span>',
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: '<i class="fa fa-thumbs-up"></i> Great!',
        confirmButtonAriaLabel: 'Thumbs up, great!',
        cancelButtonText: '<i class="fa fa-thumbs-down"></i>',
        cancelButtonAriaLabel: 'Thumbs down'
    })
}