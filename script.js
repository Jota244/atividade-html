let registros = JSON.parse(localStorage.getItem("lavajato")) || [];
let editIndex = null;

function salvar(){
    let cliente = document.getElementById("cliente").value;
    let veiculo = document.getElementById("veiculo").value;
    let tipo = document.getElementById("tipo").value;
    let valor = document.getElementById("valor").value;

    if(cliente === "" || veiculo === "" || tipo === "" || valor === ""){
        alert("Preencha todos os campos!");
        return;
    }

    let dados = {cliente, veiculo, tipo, valor};

    if(editIndex === null){
        registros.push(dados);
    } else {
        registros[editIndex] = dados;
        editIndex = null;
    }

    localStorage.setItem("lavajato", JSON.stringify(registros));
    limpar();
    listar();
}

function listar(){
    let tabela = document.getElementById("tabela");
    tabela.innerHTML = "";

    registros.forEach((item, index)=>{
        tabela.innerHTML += `
            <tr>
                <td>${item.cliente}</td>
                <td>${item.veiculo}</td>
                <td>${item.tipo}</td>
                <td>R$ ${item.valor}</td>
                <td class="actions">
                    <button class="btn-edit" onclick="editar(${index})">Editar</button>
                    <button class="btn-delete" onclick="excluir(${index})">Excluir</button>
                </td>
            </tr>
        `;
    });
}

function editar(index){
    let item = registros[index];

    document.getElementById("cliente").value = item.cliente;
    document.getElementById("veiculo").value = item.veiculo;
    document.getElementById("tipo").value = item.tipo;
    document.getElementById("valor").value = item.valor;

    editIndex = index;
}

function excluir(index){
    registros.splice(index,1);
    localStorage.setItem("lavajato", JSON.stringify(registros));
    listar();
}

function limpar(){
    document.getElementById("cliente").value = "";
    document.getElementById("veiculo").value = "";
    document.getElementById("tipo").value = "";
    document.getElementById("valor").value = "";
}

listar();
