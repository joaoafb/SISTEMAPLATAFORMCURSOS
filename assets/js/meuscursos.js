function meuscursos() {

            db.collection("cursos" + localStorage.getItem("email")).get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {

                    console.log("Curso:", doc.data());
                    localStorage.setItem("idcurso", doc.id)
                    localStorage.setItem("titulocurso", doc.data().titulocurso)
                    localStorage.setItem("descricaocurso", doc.data().descricaocurso)
                    localStorage.setItem("valor", doc.data().valor)

                    const div = document.createElement("div");
                    const a = document.createElement("a")
                    const img = document.createElement("img")
                    const div2 = document.createElement("div")
                    const div3 = document.createElement("div")
                    const h5 = document.createElement("h5")
                    const Texth5 = document.createTextNode(doc.data().titulocurso)
                    const p = document.createElement("p")
         
                    const Textp = document.createTextNode(doc.data().descricaocurso)
 
                    div.className = " m-10 p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
                    a.className = 'block overflow-hidden rounded-lg shadow-sm'
                    img.className =' object-cover w-full h-56'
                    img.src = doc.data().data
                    div2.className = 'p-6'
                    h5.className = 'text-xl text-white font-bold'
                    p.className = "mt-2 text-sm text-gray-500"
                   
                   div.onclick = function assistir() {
                    localStorage.setItem("assistir", doc.data().idcurso)
                    location.href = "./assistir.html"
                }
                    
                   p.appendChild(Textp)
                    h5.appendChild(Texth5)
                    a.appendChild(h5)
                    a.appendChild(p)
                    
                    a.appendChild(div2)
                    a.appendChild(img);
                    div.appendChild(a);
                   
                    a.appendChild(div3);
                    document.getElementById("listcursos").appendChild(div);
                    

                    


                });
            });





 

}