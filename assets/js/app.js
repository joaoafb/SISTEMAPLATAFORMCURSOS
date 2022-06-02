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


function codigo(){
  Swal.fire(
    'Código De Referência',
    'Caso Outra Pessoa Utilize Seu Código Na Momento De Cadastro, Você Recebera R$1 e ele R$2',
    ''
  )
}


function saldo(){
  Swal.fire(
    'Seu Saldo',
    'Com Este Saldo Você Poderá Adquirir Novos Cursos Na Plataforma, Para Recarregar Só Abrir o Menu / Mais Opções / Adicionar Crédito',
    ''
  )
}
