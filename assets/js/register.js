var notify = document.querySelector('#notify')

function generateRan() {
    var max = 20;
    var random = [];
    for (var i = 0; i < max; i++) {
        var temp = Math.floor(Math.random() * max);
        if (random.indexOf(temp) == -1) {
            random.push(temp);
        } else
            i--;
    }
    localStorage.setItem("codigo", random[1])

}

console.log(generateRan());

document.getElementById("confirmpass").onclick = function() {
        setInterval(() => {
            if (document.getElementById("pass").value == document.getElementById("confirmpass").value) {
                document.getElementById("alertpass").className = "flex p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800"
                document.getElementById("alertpass").style.display = "block"
                document.querySelector("#alertpass").innerHTML = "As Senhas Se Coincidem"
            } else {
                document.getElementById("alertpass").className = "p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
                document.getElementById("alertpass").style.display = "block"
                document.querySelector("#alertpass").innerHTML = "As Senhas Não Se Coincidem"

            }
        }, 1000);
        if (document.getElementById("confirmpass").value == null && document.getElementById("pass").value == null) {
            document.getElementById("alertpass").className = "p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
            document.getElementById("alertpass").style.display = "block"
            document.querySelector("#alertpass").innerHTML = "Você Precisa Digitar A Senha"
        }


    }
    //VERIFICAR IP//


function register() {

    var docRef = db.collection("ips").doc(localStorage.getItem("myip"));

    docRef.get().then((doc) => {

        if (doc.exists) {
            localStorage.setItem("contas", doc.data().Contas)
        }
        if (localStorage.getItem("contas") > 5) {
            notify.play()
            let timerInterval
            Swal.fire({
                title: 'AntiBug Em Ação!',
                html: '',
                timer: 2000,
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading()
                    const b = Swal.getHtmlContainer().querySelector('b')
                    timerInterval = setInterval(() => {
                        b.textContent = Swal.getTimerLeft()
                    }, 100)
                },
                willClose: () => {
                    clearInterval(timerInterval)
                }
            })

            .then((result) => {
                /* Read more about handling dismissals below */
                if (result.dismiss === Swal.DismissReason.timer) {
                    notify.play()
                    Swal.fire(
                        'Você Denovo??!',
                        'Você Já Criou Conta Conosco.',
                        'error'
                    )
                }
            })
        } else {
            // doc.data() will be undefined in this case

            db.collection("usuarios").doc(document.getElementById("email").value).get().then((doc) => {
                if (doc.exists) {

                    notify.play()
                    Swal.fire({
                        title: '<strong>Já Existe Conta Com Esse Email</u></strong>',
                        icon: 'error',

                        showConfirmButton: false,
                        showCloseButton: true,
                        showCancelButton: false,
                        focusConfirm: false,




                    })
                } else {

                    db.collection("ips").doc(localStorage.getItem("myip")).set({

                            ip: localStorage.getItem("myip"),
                            Data: str_hora + "  " + str_data,
                            Contas: parseInt(localStorage.getItem("contas")) + parseInt(1)
                        })
                        .then(() => {
                            console.log("IP SALVO NO SISTEMA");
                        })
                        .catch((error) => {
                            console.error("Error writing document: ", error);
                        });

                    db.collection("usuarios").doc(document.getElementById("email").value).set({
                            nome: document.getElementById("nome").value,
                            email: document.getElementById("email").value,
                            senha: document.getElementById("pass").value,
                            saldo: 2,
                            Data: str_hora + "  " + str_data,
                            TotalCursos: 0,
                            Sobre: '',
                            urlimg: '../assets/logo.png',
                            Shared: 0,
                            DataSharedone: null,
                            DataSharedtwo: null,
                            DataSharedtree: null,
                            Msg: null,
                            CodigoRef: document.getElementById("CodigoRef").value,
                            Codigo: localStorage.getItem("codigo"),
                            ip: localStorage.getItem("myip"),
                            alert: null,
                            msgsistema: null,
                            banido: "nao",
                        })
                        .then(() => {
                            verificarcodigo()

                            db.collection("plataforma").doc("infor").get().then((doc) => {
                                if (doc.exists) {
                                    localStorage.setItem("inforusuarios", doc.data().usuarios)
                                    db.collection("plataforma").doc("infor").update({
                                            usuarios: parseInt(localStorage.getItem("inforusuarios") + parseInt(1)),
                                        })
                                        .then(() => {
                                            console.log("Document successfully updated!");
                                        })
                                        .catch((error) => {
                                            // The document probably doesn't exist.
                                            console.error("Error updating document: ", error);
                                        });
                                } else {
                                    // doc.data() will be undefined in this case
                                    console.log("No such document!");
                                }
                            }).catch((error) => {
                                console.log("Error getting document:", error);
                            });


                            localStorage.setItem("cadastrado", "sim")

                            localStorage.setItem("email", document.getElementById("email").value)

                            notify.play()
                            Swal.fire({
                                title: '<strong>Conta Criada Com Sucesso</u></strong>',
                                icon: 'success',
                                html: 'Agora Você Tem Total Acesso a Nossa Plataforma!',

                                showCloseButton: true,
                                showCancelButton: false,
                                focusConfirm: true,
                                confirmButtonText: '<a href="../index.html" class="fa fa-thumbs-up"> Continuar!</a>',
                                confirmButtonColor: '#7e3af2',



                            })

                        })
                        .catch((error) => {
                            console.error("Error writing document: ", error);
                        });
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });

        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });


}




function logado() {
    notify.play()
    Swal.fire({
        title: '<strong>Logado Com Sucesso!</u></strong><br><br><a href="index.html" class="signUpBtn rounded-lg bg-white bg-opacity-20 py-3 px-6 text-base font-medium text-white duration-300 ease-in-out hover:bg-opacity-100 hover:text-dark" style="background-color:#3056d3;" >Continuar</a>',
        icon: 'success',

        showConfirmButton: false,
        showCloseButton: false,
        showCancelButton: false,
        focusConfirm: false,



    })

}

function verificarcodigo() {
    db.collection("usuarios").where("Codigo", "==", document.getElementById("CodigoRef").value)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {

                localStorage.setItem("emaildo", doc.data().email)
                localStorage.setItem("saldodo", doc.data().saldo)
                localStorage.setItem("quantidadeshared", doc.data().Shared)
                    //pegar meu saldo




                pegarmeusaldo()
                addsaldo()
                addsaldored()


            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
}

function pegarmeusaldo() {
    db.collection("usuarios").doc(document.getElementById("email").value).get().then((doc) => {
        if (doc.exists) {
            localStorage.setItem("meusaldo", doc.data().saldo)
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
}

function addsaldo() {
    db.collection("usuarios").doc(localStorage.getItem("emaildo")).update({
            saldo: parseInt(localStorage.getItem("saldodo")) + parseInt(2),
            Shared: parseInt(localStorage.getItem("quantidadeshared")) + parseInt(1)
        })
        .then(() => {
            console.log("Saldo Do Dono Do Codigo Atualizado");
        })
        .catch((error) => {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
}

function pegarmeusaldo() {
    db.collection("usuarios").doc(document.getElementById("email").value).get().then((doc) => {
        if (doc.exists) {
            localStorage.setItem("meusaldo", doc.data().saldo)
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
}

function addsaldored() {
    db.collection("usuarios").doc(localStorage.getItem("email")).update({
            saldo: parseInt(3)

        })
        .then(() => {
            console.log("Saldo Do Codigo Atualizado");
        })
        .catch((error) => {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
}



var adata = new Date();
var dia = adata.getDate(); // 1-31
var dia_sem = adata.getDay(); // 0-6 (zero=domingo)
var mes = adata.getMonth(); // 0-11 (zero=janeiro)
var ano2 = adata.getYear(); // 2 dígitos
var ano4 = adata.getFullYear(); // 4 dígitos
var hora = adata.getHours(); // 0-23
var min = adata.getMinutes(); // 0-59
var seg = adata.getSeconds(); // 0-59
var mseg = adata.getMilliseconds(); // 0-999
var tz = adata.getTimezoneOffset(); // em minutos
var str_data = dia + '/' + (mes + 1) + '/' + ano4;
var str_hora = hora + ':' + min + ':' + seg;