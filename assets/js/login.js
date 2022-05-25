document.getElementById("email").value = localStorage.getItem("email")

function login() {


    db.collection("usuarios").doc(document.getElementById("email").value).get().then((doc) => {
        if (doc.exists) {
            if (doc.data().banido == "sim") {

                console.log("Banido")
                Swal.fire(

                    {
                        showConfirmButton: false,
                        icon: 'error',
                        title: 'VOCÊ ESTÁ BANIDO!!',
                        text: '',

                    })

            } else {

                console.log("Não Banido!")
                db.collection("usuarios").doc(document.getElementById("email").value).get().then((doc) => {
                    if (doc.exists) {
                        db.collection("usuarios").doc(document.getElementById("email").value).get().then((doc) => {
                            if (doc.exists) {
                                if (doc.data().senha == document.getElementById("password").value) {
                                    let timerInterval
                                    Swal.fire({
                                        title: 'Verificando Dados...',
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
                                    }).then((result) => {
                                        /* Read more about handling dismissals below */
                                        if (result.dismiss === Swal.DismissReason.timer) {

                                            Swal.fire(

                                                {
                                                    showConfirmButton: false,
                                                    icon: 'success',
                                                    title: 'Logado Com Sucesso!',
                                                    text: '',
                                                    footer: '<a href="../index.html">Continuar</a>'
                                                })
                                            localStorage.setItem("nome", doc.data().nome)
                                            localStorage.setItem("logado", "sim")
                                            localStorage.setItem("Codigo", doc.data().Codigo)
                                            localStorage.setItem("CodigoRef", doc.data().CodigoRef)
                                            localStorage.setItem("email", doc.data().email)
                                            localStorage.setItem("meucodigo", doc.data().Codigo)
                                            localStorage.setItem("sobre", doc.data().Sobre)
                                            localStorage.setItem("codigousado", doc.data().CodigoRef)
                                            localStorage.setItem("urlimg", doc.data().urlimg),
                                                localStorage.setItem("meuip", doc.data().ip)
                                            localStorage.setItem("ban", doc.data().banido)
                                        }
                                    })




                                } else {
                                    let timerInterval
                                    Swal.fire({
                                        title: 'Verificando Dados!',
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
                                    }).then((result) => {
                                        /* Read more about handling dismissals below */
                                        if (result.dismiss === Swal.DismissReason.timer) {
                                            (function($) {
                                                ohSnap('Senha Incorreta!', { color: 'red' }); // alert will have class 'alert-color'
                                            })(jQuery);
                                        }
                                    })


                                }
                            }
                        }).catch((error) => {
                            console.log("Error getting document:", error);
                        });
                    } else {
                        // doc.data() will be undefined in this case
                        (function($) {
                            ohSnap('Email ' + document.getElementById("email").value + ' Não Encontrado', { color: 'red' }); // alert will have class 'alert-color'
                        })(jQuery);
                    }
                }).catch((error) => {
                    console.log("Error getting document:", error);
                });
            }
        } else {
            // doc.data() will be undefined in this case
            console.log("Esse Usuario Não Existe!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });


}