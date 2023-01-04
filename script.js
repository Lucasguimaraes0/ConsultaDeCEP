function buscarCEP(){
    let cep = document.getElementById('cep').value;
    let validacao = /^[0-9]+$/;
    if(validacao.test(cep) && cep.length === 8){
        consultarCEP(cep);
    } else {
        alert('Formato de CEP inválido! Insira apenas 8 números!');
    }
}

async function consultarCEP(cep){
    let url = `https://viacep.com.br/ws/${cep}/json/`;
    const response = await fetch(url);
    let endereco = await response.json();

    if (endereco.hasOwnProperty('erro')){
        alert('CEP não encontrado. Insira outro CEP.')
    } else {
        adicionarElementoHTML(endereco);
    }

}

function adicionarElementoHTML(endereco){
    let tabela = document.getElementById("tbody");    
    let row = document.createElement("tr");
    let tdCep = document.createElement("td");
    let tdRua = document.createElement("td");
    let tdCidade = document.createElement("td");
    let tdEstado = document.createElement("td");
    let tdBairro = document.createElement("td");
    let tdAcao = document.createElement("td");
    
    tdCep.innerHTML = endereco.cep;
    tdRua.innerHTML = endereco.logradouro;
    tdCidade.innerHTML = endereco.localidade;
    tdEstado.innerHTML = endereco.uf;
    tdBairro.innerHTML = endereco.bairro;
    tdAcao.innerHTML = "<span class=\"apagar\"><ion-icon name=\"trash-outline\"></ion-icon></span>";
  
    row.appendChild(tdCep);
    row.appendChild(tdRua);
    row.appendChild(tdCidade);
    row.appendChild(tdEstado);
    row.appendChild(tdBairro);
    row.appendChild(tdAcao);

    tabela.appendChild(row);

    return row;
}

var apagaLinha = document.getElementById("tabela");
apagaLinha.addEventListener("click", function(event){
    let elemento = event.target;
    let tdElemento = elemento.parentElement;
    let trElemento = tdElemento.parentElement;
    if (tdElemento.classList.contains("apagar")){
        confirm("Você deseja apagar esse registro?");
        trElemento.parentElement.remove();
    }
});
