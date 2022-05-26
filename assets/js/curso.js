document.getElementById("imgperfil").src = localStorage.getItem("urlimg")


function list() {

    db.collection("usuarios").doc(localStorage.getItem("email")).get().then((doc) => {
        if (doc.exists) {
            localStorage.setItem("meusaldo", doc.data().saldo)
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });

    db.collection("cursos").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            localStorage.setItem("titulocurso", doc.data().titulocurso),
                localStorage.setItem("descricaocurso", doc.data().descricaocurso),
                localStorage.setItem("valor", doc.data().valor),
                localStorage.setItem("data", doc.data().data),
                localStorage.setItem("autor", doc.data().autor),
                localStorage.setItem("categoria", doc.data().categoria),
                localStorage.setItem("quantasaulascurso", doc.data().quantasaulascurso),
                localStorage.setItem("quantosmodulos", doc.data().quantosmodulos),
                console.log(doc.id, " => ", doc.data());
            localStorage.setItem("idcurso", doc.id)
            const descricao = doc.data().descricaocurso

            var html = '<div>';
            html += '<div  class="-mx-4 flex flex-wrap ">';
            html += '<div style="margin:10px;width:400px;height:auto;" class="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">'
            html += '<div class="wow fadeInUp group mb-10" data-wow-delay=".1s" style="visibility: visible; animation-delay: 0.1s;">'
            html += ' <div class="mb-8 overflow-hidden rounded">'

            html += '   <img src="' + doc.data().data + '" alt="image" class="w-full transition group-hover:rotate-6 group-hover:scale-125">'

            html += '  </div>'
            html += '<div>'
            html += ' <span  class="categoria text-white mb-5 inline-block rounded bg-primary py-1 px-4 text-center text-xs font-semibold leading-loose text-white"> ' + doc.data().categoria + '</span><h3>'
            html += '    <h1  class=" text-white mb-4 inline-block text-xl font-semibold text-dark hover:text-primary sm:text-2xl lg:text-xl xl:text-2xl">' + doc.data().titulocurso + '</h1>'
            html += ' </h3>'
            html += ' <p class=" text-white text-base text-body-color">' + descricao.slice(0, 100) + '...</p>'
            html += '  </div>'
            html += '      <button onclick="infocurso()" style="margin-top:10px;background:#7e3af2;color:White;border:0;" type="button"class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">Adquirir</button>'
            html += ' </div>'
            html += '</div>'
            html += '</div>'
            html += '</div>'

            document.getElementById("listcurso").innerHTML += html;
        });

    });

}

function infocurso() {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded',
            cancelButton: 'background-color hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({

        title: 'Deseja Adquirir Este Curso?' + '<br>' + '<span style="font-size:12pt;">' + localStorage.getItem("titulocurso") + '<span style="margin-left:5px;" class="categoria text-white mb-5 inline-block rounded bg-primary py-1 px-4 text-center text-xs font-semibold leading-loose text-white style="display: flex;flex-direction:row;align-items:center;">Por R$' + localStorage.getItem("valor") + '</span><br><br><span style="margin-left:5px;" class="categoria text-white mb-5 inline-block rounded bg-primary py-1 px-4 text-center text-xs font-semibold leading-loose text-white style="display: flex;flex-direction:row;align-items:center;">' + localStorage.getItem("descricaocurso") + '</span></span>',


        icon: 'question',
        showCancelButton: true,
        confirmButtonbackground: '#7e3af2',
        confirmButtonText: 'Adquirir Curso!',
        cancelButtonText: 'Não Quero!',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {

            const Toast = Swal.mixin({
                toast: true,
                position: 'bottom-end',
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
                title: 'Curso Adquirido Com Sucesso'
            })
            adquirircurso()

        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
                'Compra Cancelada',
                '<span style="color:white;">Não Esqueça! Ele Sempre Estará Aqui! :)</span>',
                'error'
            )
        }
    })
}

function adquirircurso() {
    //verificar se num ja tem

    db.collection("cursos" + localStorage.getItem("email")).doc(localStorage.getItem("idcurso")).get().then((doc) => {
        if (doc.exists) {
            Swal.fire(
                'Você Já Tem Este Curso!',
                '',
                'error'
            )
        } else {
            verificarsaldo()
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });



    //verificarsaldo
    function verificarsaldo() {
        db.collection("usuarios").doc(localStorage.getItem("email")).get().then((doc) => {
            localStorage.setItem("totaldecursos", doc.data().TotaldeCursos)
            if (doc.data().saldo < localStorage.getItem("valor")) {
                Swal.fire(
                    'Saldo Insuficiente!',
                    '',
                    'error'
                )
            } else {
                subtrairvalor()

            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }

    //subtrairvalor
    function subtrairvalor() {
        db.collection("usuarios").doc(localStorage.getItem("email")).update({
                saldo: parseInt(localStorage.getItem("meusaldo")) - parseInt(localStorage.getItem("valor")),
                TotaldeCursos: parseInt(localStorage.getItem("totaldecursos")) + parseInt(1),
            })
            .then(() => {
                addcursoconta()
            })
            .catch((error) => {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });
    }

    function addcursoconta() {
        db.collection("cursos").doc(localStorage.getItem("idcurso")).get().then((doc) => {
            if (doc.exists) {
                localStorage.setItem("alunos", doc.data().alunos)
            } else {

                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });


        //addcurso na conta
        db.collection("cursos" + localStorage.getItem("email")).doc(localStorage.getItem("idcurso")).set({
                nome: localStorage.getItem("titulocurso"),
                valor: localStorage.getItem("valor"),
                idcurso: localStorage.getItem("idcurso"),
                horario: firebase.firestore.FieldValue.serverTimestamp(),
                email: localStorage.getItem("email"),
                titulocurso: localStorage.getItem("titulocurso"),
                descricaocurso: localStorage.getItem("descricaocurso"),
                valor: localStorage.getItem("valor"),
                data: localStorage.getItem("data"),
                autor: localStorage.getItem("autor"),
                categoria: localStorage.getItem("categoria"),
                quantasaulascurso: localStorage.getItem("quantasaulascurso"),
                quantosmodulos: localStorage.getItem("quantosmodulos"),


            })
            .then(() => {
                console.log("Curso Adquirido Com Sucesso!");
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });
    }
}