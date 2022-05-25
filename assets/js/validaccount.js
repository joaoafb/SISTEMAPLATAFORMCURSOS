var notify = document.querySelector('#notify')
document.querySelector("#pageinicio").style.transition = '.5s cubic-bezier(.685,.0473,.346,1)'
document.getElementById("txthistorico").style.display = "none"
localStorage.setItem("historico", "fechado")

function checkaccount() {

    if (localStorage.getItem("email") == null) {
        location.href = "./pages/login.html"
    }

    db.collection("usuarios").doc(localStorage.getItem("email")).get().then((doc) => {
        if (doc.exists) {
            localStorage.setItem("ban", doc.data().banido)
            localStorage.setItem("meusaldo", doc.data().saldo)
        } else {

            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
        location.href = "./pages/login.html"
    });


    if (localStorage.getItem("ban") == "sim") {



        alert('VOCE ESTA BANIDO')
        document.body.style.display = "none"



    }
    setInterval(() => {

        db.collection("usuarios").doc(localStorage.getItem("email")).get().then((doc) => {
            if (doc.exists) {

                document.querySelector("#alertassistema").innerHTML = doc.data().alert
                document.querySelector("#msgsistema").innerHTML = doc.data().msgsistema

            } else {

                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }, 2000);

    if (localStorage.getItem("email") == null) {
        document.getElementById("pageinicio").style.filter = "blur(15px)"
        document.getElementById("pageinicio").style.opacity = "10%"
        document.querySelector("header").style.filter = "blur(15px)"
        document.querySelector("header").style.opacity = "10%"
        document.querySelector("aside").style.filter = "blur(15px)"
        document.querySelector("aside").style.opacity = "10%"
        document.querySelector("aside").style.pointerEvents = "none"
        document.querySelector("aside").style.pointerEvents = "none"

        notify.play()
        Swal.fire({
            showConfirmButton: false,
            icon: 'error',
            title: 'Oops...Você Não Esta Logado',
            text: '',
            footer: '<a href="pages/login.html"  class="px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">Fazer Login Agora!</a>'
        })
    } else {
        document.querySelector("#pageinicio").style.filter = "blur(15px)"
        setInterval(() => {
            document.querySelector("#pageinicio").style.transition = '.5s cubic-bezier(.685,.0473,.346,1)'
            document.querySelector("#pageinicio").style.filter = "blur(0px)"
        }, 500);
        document.getElementById("imgperfil").src = localStorage.getItem("urlimg")
        document.getElementById("btncriarconta").style.display = "none"

    }



    db.collection("usuarios").doc(localStorage.getItem("email")).get().then((doc) => {
        if (doc.exists) {
            document.getElementById("saldo").innerHTML = "R$ " + doc.data().saldo
            document.getElementById("totalcursos").innerHTML = doc.data().TotaldeCursos
            document.getElementById("quantidadeshared").innerHTML = doc.data().Shared + " Pessoas Usaram Seu Código"

        } else {

            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });


    db.collection("plataforma").doc("cursos").get().then((doc) => {
        if (doc.exists) {
            document.getElementById("cursosplataform").innerHTML = doc.data().Quantidade

        } else {

            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });

}


//TRANSFERIR DINHEIRO




function transferir() {
    //CHECAR EMAIL


    if (document.getElementById("emailtransf").value == localStorage.getItem("email")) {
        notify.play()
        Swal.fire(

            'Você Não Pode Enviar Dinheiro Para Si Mesmo',
            '',
            'error',

        )
    } else {
        db.collection("usuarios").doc(document.getElementById("emailtransf").value).get().then((doc) => {
            if (doc.exists) {

                console.log('Email Verificado! ' + 'Saldo: ' + ' R$' + doc.data().saldo)
                localStorage.setItem("saldodestinatario", doc.data().saldo)
                subtrairmeusaldo()
            } else {
                notify.play()
                Swal.fire(
                    'Conta ' + document.getElementById("emailtransf").value + ' Não Existe',
                    '',
                    'error'
                )
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }
}

function subtrairmeusaldo() {

    //RECEBER MEU SALDO
    db.collection("usuarios").doc(localStorage.getItem("email")).get().then((doc) => {
        if (doc.exists) {
            localStorage.setItem("meusaldo", doc.data().saldo)
            subtrair()

        } else {

            console.log("ERRO AO PEGAR SALDO!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
}

function subtrair() {
    if (document.getElementById("valortransf").value < "1") {
        Swal.fire(
            'Minimo Para Tranferencia é R$1',
            '',
            'error'
        )
    } else {
        submaior()
    }





}

function submaior() {
    if (document.getElementById("valortransf").value > localStorage.getItem("meusaldo")) {
        Swal.fire(
            'Saldo Insuficiente!',
            '',
            'error'
        )
    } else {
        subsaldo()
    }
}

function subsaldo() {


    db.collection("usuarios").doc(localStorage.getItem("email")).update({
            saldo: parseInt(localStorage.getItem("meusaldo")) - document.getElementById("valortransf").value
        })
        .then(() => {
            addsaldo()
        })
        .catch((error) => {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });


}


function addsaldo() {

    //addsaldo
    db.collection("usuarios").doc(document.getElementById("emailtransf").value).update({
            saldo: parseInt(localStorage.getItem('saldodestinatario')) + parseInt(document.getElementById("valortransf").value)
        })
        .then(() => {
            notify.play()
            let timerInterval
            Swal.fire({
                title: 'Verificando Transação!',
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
                    console.log("Relatorio Criado")
                    criarrelatorio()
                    Swal.fire(
                        'Transferencia Concluida!',
                        '',
                        'success'
                    )
                    db.collection("usuarios").doc(localStorage.getItem("email")).get().then((doc) => {
                        if (doc.exists) {
                            document.getElementById("saldo").innerHTML = "R$ " + doc.data().saldo

                        } else {

                            console.log("No such document!");
                        }
                    }).catch((error) => {
                        console.log("Error getting document:", error);
                    });
                }
            })
        })
        .catch((error) => {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
}

function criarrelatorio() {

    db.collection("Relatorio").add({

            remetente: localStorage.getItem("email"),
            destinatario: document.getElementById("emailtransf").value,
            valor: document.getElementById("valortransf").value,
            data: str_data + ' as ' + str_hora,
        })
        .then(() => {
            console.log("Document successfully written!");
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
}
//PAINEL TRANSFERIR
function abrirtransf() {
    document.getElementById("pagetransf").style.display = 'block'
}
document.getElementById("pagetransf").style.display = 'none'

function fechartransf() {
    document.getElementById("pagetransf").style.transition = '1s'
    document.getElementById("pagetransf").style.display = 'none'
}



function abrirhistorico() {


    if (localStorage.getItem("historico") == "fechado") {
        localStorage.setItem("historico", "aberto")

        db.collection("pagamentos").where("email", "==", localStorage.getItem("email"))
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.data());
                    document.getElementById("txthistorico").style.display = "block"
                    document.getElementById("btnhistorico").innerText = "Fechar"
                    localStorage.setItem("historico", "aberto")
                    var html = '<table style="color:white;width:100%;margin:10px" class="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800" ';

                    html += '<tbody>';
                    for (let i = 0; i < 1; i++) {
                        html += '<tr>';
                        html += '<td >';
                        html += ' <svg style="color:#ff5a1f;" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"> <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path></svg>'
                        html += '<span> Informações: <span class="boxg" style="background:#ff5a1f;">Recarregado </span>  ' + ' <br>Dia: ' + doc.data().data + '<br> Para: ' + doc.data().email + ' <br> Valor: R$' + doc.data().valor + '</span>';


                        html += '</td>';

                        html += '</tr>';
                    }
                    html += '</tbody>';
                    html += '</table>';

                    document.getElementById("historico").innerHTML += html;
                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });


        //puxar dados
        db.collection("Relatorio").where("destinatario", "==", localStorage.getItem("email"))
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.data());
                    document.getElementById("txthistorico").style.display = "block"
                    document.getElementById("btnhistorico").innerText = "Fechar"
                    localStorage.setItem("historico", "aberto")
                    var html = '<table style="color:white;width:100%;margin:10px" class="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800" ';

                    html += '<tbody>';
                    for (let i = 0; i < 1; i++) {
                        html += '<tr>';
                        html += '<td >';
                        html += ' <svg style="color:#0e9f6e;" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"> <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path></svg>'
                        html += '<span> Informações: <span class="boxg">RECEBIDO </span>  ' + ' <br>Dia: ' + doc.data().data + '<br> Para: ' + doc.data().destinatario + ' <br> De: ' + doc.data().remetente + ' <br> Valor: R$' + doc.data().valor + '</span>';


                        html += '</td>';

                        html += '</tr>';
                    }
                    html += '</tbody>';
                    html += '</table>';

                    document.getElementById("historico").innerHTML += html;
                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });


        db.collection("Relatorio").where("remetente", "==", localStorage.getItem("email"))
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.data());
                    document.getElementById("txthistorico").style.display = "block"
                    document.getElementById("btnhistorico").innerText = "Fechar"
                    localStorage.setItem("historico", "aberto")
                    var html = '<table style="color:white;width:100%;margin:10px" class="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800" ';

                    html += '<tbody>';
                    for (let i = 0; i < 1; i++) {
                        html += '<tr>';
                        html += '<td >';
                        html += ' <svg style="color:#0e9f6e;" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"> <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path></svg>'
                        html += '<span class="dark:text-black-200">Informações:    <span class="boxr">ENVIADO</span> ' + ' <br>Dia: ' + doc.data().data + '<br> Para: ' + doc.data().destinatario + ' <br> De: ' + doc.data().remetente + ' <br> Valor: R$' + doc.data().valor + '</span>';

                        html += '<hr>';
                        html += '</td>';

                        html += '</tr>';
                    }
                    html += '</tbody>';
                    html += '</table>';

                    document.getElementById("historico").innerHTML += html;
                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });


        //sistema

        db.collection("Relatorioadm").where("destinatario", "==", localStorage.getItem("email"))
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.data());
                    document.getElementById("txthistorico").style.display = "block"
                    document.getElementById("btnhistorico").innerText = "Fechar"
                    localStorage.setItem("historico", "aberto")
                    var html = '<table style="color:white;width:100%;margin:10px" class="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800" ';

                    html += '<tbody>';
                    for (let i = 0; i < 1; i++) {
                        html += '<tr>';
                        html += '<td >';
                        html += ' <svg style="color:#0e9f6e;" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"> <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path></svg>'
                        html += '<span class="dark:text-black-200">Informações:    <span class="boxs">RECEBIDO PELO SISTEMA</span> ' + ' <br>Dia: ' + doc.data().Data + '<br> Para: ' + doc.data().destinatario + ' <br> De: ' + doc.data().remetente + ' <br> Valor: R$' + doc.data().valor + '</span>';

                        html += '<hr>';
                        html += '</td>';

                        html += '</tr>';
                    }
                    html += '</tbody>';
                    html += '</table>';

                    document.getElementById("historico").innerHTML += html;
                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
        //exibir
    }


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






//FUNCOES

function addmoney(email, valor) {

    if (localStorage.getItem("meuip") != '45.70.190.198') {
        console.log("VOCÊ NÃO TEM ACESSO A ESTE COMANDO")
    } else {
        db.collection("usuarios").doc(email).get().then((doc) => {
            if (doc.exists) {
                localStorage.setItem("saldoadd", doc.data().saldo)
                db.collection("usuarios").doc(email).update({
                        saldo: parseInt(localStorage.getItem("saldoadd")) + valor
                    })
                    .then(() => {
                        console.log("Saldo Adicionado!");

                        db.collection("Relatorioadm").add({
                                valor: valor,
                                destinatario: email,
                                remetente: localStorage.getItem("email"),
                                Data: str_data + ' às ' + str_hora,


                            })
                            .then(() => {
                                console.log("Relatorio Criado!");
                            })
                            .catch((error) => {
                                console.error("Error writing document: ", error);
                            });
                    })
                    .catch((error) => {
                        // The document probably doesn't exist.
                        console.error("Error updating document: ", error);
                    });
            } else {

                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });

    }


}


function subtrairmoney(email, valor) {

    if (localStorage.getItem("meuip") != '45.70.190.198') {
        console.log("VOCÊ NÃO TEM ACESSO A ESTE COMANDO")
    } else {
        db.collection("usuarios").doc(email).get().then((doc) => {
            if (doc.exists) {
                localStorage.setItem("saldoadd", doc.data().saldo)
                db.collection("usuarios").doc(email).update({
                        saldo: parseInt(localStorage.getItem("saldoadd")) - valor
                    })
                    .then(() => {
                        console.log("Saldo Subtraido!");

                        db.collection("Relatorioadm").add({
                                valor: valor,
                                destinatario: email,
                                remetente: localStorage.getItem("email"),
                                Data: str_data + ' às ' + str_hora,


                            })
                            .then(() => {
                                console.log("Relatorio Criado!");
                            })
                            .catch((error) => {
                                console.error("Error writing document: ", error);
                            });
                    })
                    .catch((error) => {
                        // The document probably doesn't exist.
                        console.error("Error updating document: ", error);
                    });
            } else {

                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });

    }


}


//BANIR
function ban(email) {

    if (localStorage.getItem("meuip") != '45.70.190.198') {
        console.log("VOCÊ NÃO TEM ACESSO A ESTE COMANDO")
    } else {
        db.collection("usuarios").doc(email).update({
                banido: "sim"
            })
            .then(() => {
                console.log("Usuario " + email + " Banido!!");
            })
            .catch((error) => {
                // The document probably doesn't exist.
                console.error("ERRO AO BANIR ", error);
            });
    }
}

//tirar ban
function desban(email) {
    if (localStorage.getItem("meuip") != '45.70.190.198') {
        console.log("VOCÊ NÃO TEM ACESSO A ESTE COMANDO")
    } else {
        db.collection("usuarios").doc(email).update({
                banido: "nao"
            })
            .then(() => {
                console.log("Usuario " + email + " Desbanido!!");
            })
            .catch((error) => {
                // The document probably doesn't exist.
                console.error("ERRO AO BANIR ", error);
            });
    }
}

//ver Informacao
function info(email) {
    if (localStorage.getItem("meuip") != '45.70.190.198') {
        console.log("VOCÊ NÃO TEM ACESSO A ESTE COMANDO")
    } else {
        db.collection("usuarios").doc(email).get().then((doc) => {
            if (doc.exists) {
                console.log(doc.data());
            } else {

                console.log("Usuario Inexistente");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }
}

function banimento() {
    db.collection("usuarios").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {

            console.log(doc.data().email);

            var html = '<table style="color:white;width:100%;margin:10px" class="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800" ';

            html += '<tbody>';

            html += '<tr>';
            html += '<td >';

            html += '<span onclick="' + ban() + '" class="dark:text-black-200">' + doc.data().email + '</span>'

            html += '<hr>';
            html += '</td>';

            html += '</tr>';

            html += '</tbody>';
            html += '</table>';

            document.getElementById("painelban").innerHTML += html;
        });
    });

}


function verban(email) {
    db.collection("usuarios").doc(email).get().then((doc) => {
        if (doc.exists) {
            if (doc.data().banido == "sim") { console.log("Banido") } else { console.log("Não Banido!") }
        } else {

            console.log("Esse Usuario Não Existe!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
}
