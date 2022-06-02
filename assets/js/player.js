var v = document.getElementById("video")


function exibiraulas() {
    //RECEBER QUANTOS MODULOS
    db.collection("cursos").doc(localStorage.getItem("assistir")).get().then((doc) => {
        if (doc.exists) {
            document.title = doc.data().titulocurso
            localStorage.setItem("quantosmodulos", doc.data().quantosmodulos)
        } else {

            Swal.fire(
                'Esse Curso Não Existe!',
                '!',
                'error'
            )
            location.href = "./meuscursos.html"
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });



    db.collection(localStorage.getItem("assistir")).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {



            document.querySelector("video").style.borderRadius = '10px'

            const titulo = document.createElement("li");

            const title = document.createElement('span')
            title.innerHTML = doc.data().titulo
            const modulo = document.createElement("span")
            modulo.innerHTML = 'Módulo' + doc.data().sequencia + '<br>'
            title.className = 'btn btn-lg sm:btn-sm md:btn-md lg:btn-lg'
            title.style.fontSize = '9pt'
            modulo.className = 'flex-auto text-sm font-semibold text-gray-500'
            titulo.style.fontSize = '9pt'
            titulo.id = 'titulo'
            titulo.style.backgroundColor = '#121317'
            titulo.style.margin = '5px'
            titulo.style.padding = '10px'
            titulo.appendChild(modulo)
            titulo.appendChild(title)
            

            titulo.onclick = function() {

                console.log(doc.data().titulo)
                document.querySelector("#video").poster = './assets/img/loading.png'
                document.getElementById("title").innerText = doc.data().titulo
                document.querySelector("#descricao").innerHTML = doc.data().descricao;
                document.querySelector("#video").src = doc.data().link;

            }

            document.getElementById("listamodulos").appendChild(titulo);





            document.getElementById("baixararquivo").onclick = function() { location.href = doc.data().arquivo }

            const titulom = document.createElement("li");
            const texttitulom = document.createTextNode(doc.data().titulo);
            titulom.className = 'inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200'
            titulom.style.fontSize = '9pt'
            titulom.style.backgroundColor = '#121317'
            titulom.style.margin = '5px'
            titulom.style.padding = '10px'
            titulom.onclick = function() {
                document.querySelector("#descricao").innerHTML = doc.data().descricao
                document.querySelector("#video").src = doc.data().link
            }
            titulom.appendChild(texttitulom);

            document.getElementById("listamodulosmobile").appendChild(titulom);





        });
    });


    //CRIAR MODULOS




}