function loadingcomponet() {


    enviarcurso()
}


function enviarcurso() {
    var titulocurso = document.getElementById("inputtitulocurso").value
    var descricaocurso = document.getElementById("inputdescricaocurso").value
    var valor = document.getElementById("inputvalor").value
    var data = document.getElementById("datahoje").value
    var autor = document.getElementById("inputautor").value
    var categoria = document.getElementById("inputcategoria").value
    var quantasaulascurso = document.getElementById("inputquantasaulascurso").value
    var quantosmodulos = document.getElementById("quantosmodulos").value



    db.collection("cursos").add({
            titulocurso: titulocurso,
            descricaocurso: descricaocurso,
            valor: valor,
            data: data,
            autor: autor,
            categoria: categoria,
            quantasaulascurso: quantasaulascurso,
            quantosmodulos: quantosmodulos,



        })
        .then(() => {
            console.log("CURSO REGISTRADO");
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });



}