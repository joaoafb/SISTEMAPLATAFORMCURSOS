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


            var html = '<ul style="background:#121317;margin:10px;padding:5px;" class="flex-column shadow-sm  rounded-lg ">';


            html += '<li>';
            html += '<span style="font-size:9pt;padding-left:8px;">Módulo ' + doc.data().modulo + '</span>'
            html += '<span class="inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200">' + doc.data().titulo + '</span>';
            html += '</li>';
            html += '</ul>';


            document.getElementById("listamodulos").innerHTML += html;
            document.getElementById("listamodulosmobile").innerHTML += html;
            var video = '<br>'
            html += '<div style="margin:10px;" class="w-full px-4 md:w-1/2 lg:w-1/3 z-10 py-4 bg-white shadow-md dark:bg-gray-800">'
            video += '<span style="margin-left:10px;padding-left:10px;" class="w-full pl-8 pr-2 text-sm text-gray-700 placeholder-gray-600 bg-gray-100 border-0 rounded-md dark:placeholder-gray-500 dark:focus:shadow-outline-gray dark:focus:placeholder-gray-600 dark:bg-gray-700 dark:text-gray-200 focus:placeholder-gray-500 focus:bg-white focus:border-purple-300 focus:outline-none focus:shadow-outline-purple form-input">' + doc.data().titulo + ' Módulo: ' + doc.data().modulo + '</span>'

            video += '<video style="padding:20px;border-radius:10px;" poster="https://i.ytimg.com/vi/uSnNUJ6_kxE/maxresdefault.jpg" style="width:100%;margin:10px auto;" oncontextmenu="return false;" controlsList="nodownload"  frameborder="0" quality="auto" controls src="' + doc.data().link + '"></video>'

            video += '<span style="margin-left:20px;color:white;font-size:9pt;"  ">  Descrição: ' + doc.data().descricao + '<br><br><br></span>'
            video += '</div>'
            document.getElementById("divvideo").innerHTML += video


        });
    });


    //CRIAR MODULOS




}