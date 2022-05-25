function addaula() {
    //receber quantidade de  modulos

    db.collection(document.getElementById("idcurso").value).doc("aula" + document.getElementById("aula").value + document.getElementById("modulo").value).set({
            link: document.getElementById("link").value,
            modulo: document.getElementById("modulo").value,
            titulo: document.getElementById("tituloaula").value,
            descricao: document.getElementById("descricao").value,
            curso: document.getElementById("idcurso").value,
            sequencia: document.getElementById("aula").value
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