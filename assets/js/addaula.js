localStorage.setItem("arquivo", "")

var files = [];
document.getElementById("video").addEventListener("change", function(e) {
    files = e.target.files;
    for (let i = 0; i < files.length; i++) {
        console.log(files[i]);
        document.getElementById("tituloaula").value = files[i].name



        enviarvideo()


    }
});

var files = [];
document.getElementById("arquivo").addEventListener("change", function(e) {
    files = e.target.files;
    for (let i = 0; i < files.length; i++) {
        console.log(files[i]);




        enviararq()


    }
});


function enviarvideo() {
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
                    document.getElementById("progress").value = percentage;

                    document.getElementById("porcentagem").innerText = percentage + "%"
                },

                function error() {
                    alert("error uploading file");
                },

                function complete() {
                    getFileUrl(files[i].name)

                }
            );
        }
    } else {
        alert("No file chosen");
    }
};

function getFileUrl(filename) {
    //create a storage reference
    var storage = firebase.storage().ref(filename);

    //get file url
    storage
        .getDownloadURL()
        .then(function(url) {
            console.log(url);
            document.getElementById("link").value = url
        })
        .catch(function(error) {
            console.log("error encountered");
        });
}


function enviararq() {
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
                    document.getElementById("progressarq").value = percentage;

                    document.getElementById("porcentagemarq").innerText = percentage + "%"
                },

                function error() {
                    alert("error uploading file");
                },

                function complete() {

                    localStorage.setItem("arquivo", files[i].name)

                    getFileUrlarq(localStorage.getItem("arquivo"))
                }
            );
        }
    } else {
        alert("No file chosen");
    }
};

function getFileUrl(filename) {
    //create a storage reference
    var storage = firebase.storage().ref(filename);

    //get file url
    storage
        .getDownloadURL()
        .then(function(url) {
            console.log(url);
            document.getElementById("link").value = url
        })
        .catch(function(error) {
            console.log("error encountered");
        });
}

function getFileUrlarq(filename) {
    //create a storage reference
    var storage = firebase.storage().ref(filename);

    //get file url
    storage
        .getDownloadURL()
        .then(function(url) {
            console.log(url);
            localStorage.setItem("linkarquivo", url)
        })
        .catch(function(error) {
            console.log("error encountered");
        });
}

function addaula() {
    //receber quantidade de  modulos

    db.collection(document.getElementById("idcurso").value).doc("aula" + document.getElementById("aula").value + document.getElementById("modulo").value).set({
            link: document.getElementById("link").value,
            modulo: document.getElementById("modulo").value,
            titulo: document.getElementById("tituloaula").value,
            descricao: document.getElementById("descricao").value,
            curso: document.getElementById("idcurso").value,
            sequencia: document.getElementById("aula").value,
            arquivo: localStorage.getItem("linkarquivo"),
        })
        .then(() => {
            console.log("Aula Cadastrada");
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })

            Toast.fire({
                icon: 'success',
                title: 'Aula Cadastrada!'
            })
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
}

function load() {

    db.collection("cursos").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            const node = document.createElement("li");
            node.style.color = "white"
            node.style.listStyle = "None"
            const textnode = document.createTextNode(doc.id + ' ' + doc.data().titulocurso);
            node.appendChild(textnode);
            node.onclick = function() {
                document.getElementById("idcurso").value = doc.id
            }
            document.getElementById("list").appendChild(node);


        });
    });


}