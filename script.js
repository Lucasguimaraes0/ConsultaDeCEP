function adicionaElementoHTML(enderecoJSON){ 
    let linha = document.createElement("tr");
    let tdCep = document.createElement("td");
    let tdRua = document.createElement("td");
    let tdCidade = document.createElement("td");
    let tdEstado = document.createElement("td");
    let tdBairro = document.createElement("td");
    let tdAcao = document.createElement("td");
    
    tdCep.innerHTML = enderecoJSON.cep;
    tdRua.innerHTML = enderecoJSON.logradouro;
    tdCidade.innerHTML = enderecoJSON.localidade;
    tdEstado.innerHTML = enderecoJSON.uf;
    tdBairro.innerHTML = enderecoJSON.bairro;
    tdAcao.innerHTML = "<span class=\"apagar\"><ion-icon name=\"trash-outline\"></ion-icon></span>";
  
    linha.appendChild(tdCep);
    linha.appendChild(tdRua);
    linha.appendChild(tdCidade);
    linha.appendChild(tdEstado);
    linha.appendChild(tdBairro);
    linha.appendChild(tdAcao);

    return linha;
}

async function consumoApi(){
    let cep = document.getElementById('cep').value;
    let validacao = /^[0-9]+$/; //expressão regular para percorrer do início ao fim buscando números
    if (validacao.test(cep)){ //verifica se o formato do cep contém caracteres inválidos
        let url = `https://viacep.com.br/ws/${cep}/json/`;
        let endereco = await fetch(url);
        let enderecoJSON = await endereco.json();
        console.log(enderecoJSON);
        
        if (enderecoJSON.hasOwnProperty('erro')){ //cep não existe
            alert ('CEP não encontrado. Insira outro CEP.')
        } else {
        let linha = await adicionaElementoHTML(enderecoJSON);
        let tabela = document.getElementById("tbody");    
        tabela.appendChild(linha);
        }
    } else {
        alert ("Formato de CEP inválido! Insira apenas 8 números!")
    }   
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


