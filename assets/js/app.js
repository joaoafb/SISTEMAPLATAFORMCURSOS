function deslogar(){
    Swal.fire({
        title: 'Deseja Mesmo Sair?',
        text: "",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#7e3af2',
        cancelButtonText: 'Não, Quero Ficar',
        confirmButtonText: 'Sim, Quero Sair!'
      }).then((result) => {
        if (result.isConfirmed) {
            
          Swal.fire(
            'Deslogado!',
            '',
            'success'
          )
         localStorage.clear()
         
         localStorage.setItem("Deslogado", "sim")
         location.reload()
        }
       
      })
}


