// Obtém a data/hora atual
var data = new Date();

// Guarda cada pedaço em uma variável
var dia = data.getDate(); // 1-31
var dia_sem = data.getDay(); // 0-6 (zero=domingo)
var mes = data.getMonth(); // 0-11 (zero=janeiro)
var ano2 = data.getYear(); // 2 dígitos
var ano4 = data.getFullYear(); // 4 dígitos
var hora = data.getHours(); // 0-23
var min = data.getMinutes(); // 0-59
var seg = data.getSeconds(); // 0-59
var mseg = data.getMilliseconds(); // 0-999
var tz = data.getTimezoneOffset(); // em minutos

// Formata a data e a hora (note o mês + 1)
var str_data = dia + '/' + (mes + 1) + '/' + ano4;
var str_hora = hora + ':' + min + ':' + seg;






function load() {
    //posts






    firebase.database().ref("posts").on("child_added", function(snapshot) {

        var posts = '<div style="padding:10px;" class="">'
        posts += '  <div id="post" style="width: 80%;"  class=" m-auto ">'
        posts += ' <div style="border-radius:10px;" class=" card lg:card-side bg-white shadow-xl">'


        posts += ' <div class="col-span-3 row-span-1">'
        posts += ' <div class="flex align-bottom flex-col leading-none p-2 md:p-4">'
        posts += '  <div class="flex flex-row justify-between items-center">'
        posts += '<a class="flex items-center no-underline hover:underline text-black" href="#">'
        posts += ' <img alt="Placeholder" class="w-10 h-10 block rounded-full"src="' + snapshot.val().perfil + '"/>'
        posts += '  <span class="ml-2 text-sm">' + snapshot.val().usuario + '</span>'
        posts += '</a>'
        posts += ' </div>'
        posts += ' </div>'
        posts += ' </div>'

        posts += '<div class="col-span-3 row-span-1">'
        posts += '<header class="flex items-center justify-between leading-tight p-2 md:p-4">'
        posts += '   <h1 class="text-lg">'
        posts += ' <a class="no-underline hover:underline text-black" href="#">' + snapshot.val().msg + '</a>'
        posts += '  </h1>'
        posts += ' <p class="text-gray-darker text-sm">' + snapshot.val().data + '</p>'
        posts += ' </header>'
        posts += ' </div>'

        posts += ' <div class="col-span-3 row-span-1">'
        posts += ' <ul class="flex flex-row pl-2 text-gray-600 overflow-x-scroll hide-scroll-bar">'
        posts += ' <li class="py-1">'
        posts += ' <div class="transition duration-300 ease-in-out rounded-2xl mr-1 px-2 py-1 hover:bg-blue-200 text-gray-500 hover:text-gray-800">'

        posts += ' </div>'
        posts += ' </li>'


        posts += '</ul>'
        posts += ' </div>'
        posts += '</div>'
        posts += ' </div>'
        posts += ' </div>'



        document.getElementById("posts").innerHTML += posts
    });


}

var reversals = function(string) {
    result.innerHTML = string.split("").reverse().join("");
}

function postar() {

    if (document.getElementById("msg").value > "") {
        firebase.database().ref("posts").push().set({
            msg: document.getElementById("msg").value,
            usuario: localStorage.getItem("nome"),
            likes: "",
            perfil: localStorage.getItem("urlimg"),
            cargo: localStorage.getItem("cargo"),
            data: str_data + ' às ' + str_hora,

        });


    }
    document.getElementById("msg").value = ""
    scroll(0, 10000)

}