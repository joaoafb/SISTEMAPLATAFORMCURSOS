document.getElementById("btnassistir").innerHTML = '<i class="fa-solid fa-circle-play"></i>Assistir'
function meuscursos() {
    db.collection("cursos" + localStorage.getItem("email")).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {

            localStorage.setItem("idcurso", doc.id)


            db.collection("cursos" + localStorage.getItem("email")).get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {

                    console.log("Curso:", doc.data());
                    localStorage.setItem("idcurso", doc.id)
                    localStorage.setItem("titulocurso", doc.data().titulocurso)
                    localStorage.setItem("descricaocurso", doc.data().descricaocurso)
                    localStorage.setItem("valor", doc.data().valor)
                    var html = '<div';
                    html += '<div  class="-mx-4 flex flex-wrap ">';
                    html += '<div style="margin:10px;" class="w-full px-4 md:w-1/2 lg:w-1/3 z-10 py-4 bg-white shadow-md dark:bg-gray-800">'
                    html += '<div class="wow fadeInUp group mb-10" data-wow-delay=".1s" style="visibility: visible; animation-delay: 0.1s;">'
                    html += ' <div class="mb-8 overflow-hidden rounded">'

                    html += '   <img src="' + doc.data().data + '" alt="image" class="w-full transition group-hover:rotate-6 group-hover:scale-125">'

                    html += '  </div>'
                    html += '<div>'
                    html += '<h3>'
                    html += '    <h1  class=" text-white mb-4 inline-block text-xl font-semibold text-dark hover:text-primary sm:text-2xl lg:text-xl xl:text-2xl">' + doc.data().titulocurso + '</h1>'
                    html += ' </h3>'
                   
                    html += '  </div>'
                    html += '<div id="btn"></div>'
                    html += ' </div>'
                    html += '</div>'
                    html += '</div>'
                    html += '</div>'

                    document.getElementById("listcursos").innerHTML += html;

                    var button = document.createElement("button");
                    var txt = document.createTextNode("Assistir");
                    button.style.background = '#7e3af2'
                    button.style.color = "white"
                    button.style.border = '0'
                    button.id = "btnassistir"
                    button.className = 'btn bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow'
                    button.appendChild(txt);
                    button.onclick = function assistir() {
                        localStorage.setItem("assistir", doc.data().idcurso)
                        location.href = "./assistir.html"
                    }

                    document.getElementById("btn").appendChild(button);


                });
            });



        });

    });

}
