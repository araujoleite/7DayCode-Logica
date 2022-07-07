// const lista = {};

// lista.frutas = ['maçã', 'abóbora'];
// lista.frutas.push('banana');
// lista.carne = ['patinho', 'maminha'];

// console.log(lista);


//-----------------------------------------------


// Elementos do DOM
const addBtn = document.querySelector('#adiciona');
const itemInput = document.getElementById('produto');
const itemCategory = document.getElementsByName('tipo');
const emptyListAlert = document.querySelector(`[data-vazio]`);
const clearBtn = document.querySelector('#limpa')
const saveLocal = window.localStorage;


// Lista de categorias
let frutas = [];
let laticinios = [];
let congelados = [];
let doces = [];



function loadList() {
    if (saveLocal.getItem('frutas') != null) {
        frutas = JSON.parse(saveLocal.getItem('frutas'));
    }

    if (saveLocal.getItem('laticinios') != null) {
        laticinios = JSON.parse(saveLocal.getItem('laticinios'));
    }

    if (saveLocal.getItem('congelados') != null) {
        congelados = JSON.parse(saveLocal.getItem('congelados'));
    }

    if (saveLocal.getItem('doces') != null) {
        doces = JSON.parse(saveLocal.getItem('doces'));
    }

    console.log(frutas)

    createList('fruta', frutas);
    createList('laticinio', laticinios);
    createList('congelado', congelados);
    createList('doce', doces);
    
    let emptyListCheck = frutas.length + laticinios.length + congelados.length + doces.length;

    if (emptyListCheck != 0) {
        emptyListAlert.classList.add('hide');
    } else {
        emptyListAlert.classList.remove('hide');
    }
}


function createList (category, list) {
    document.getElementById(category).innerHTML = "";
    if (list.length !== 0) {
        document.querySelector(`[data-${category}]`).classList.remove('hide');
    
        for (item = 0; item < list.length; item++) {
            let addElement = document.getElementById(category);
            let newElement = document.createElement('li');
            newElement.innerHTML = `<div>${list[item]}</div>
                                    <button class="delete" onclick="deleteItem('${category}',${item})">X</button>`;

            addElement.appendChild(newElement);
        }
    } else { document.querySelector(`[data-${category}]`).classList.add('hide') }
}


function addItem() {    
    if (itemInput.value == ""){ return alert("Insira algum produto.") }
    
    let categorySelected = ""
    
    for(i = 0; i < itemCategory.length; i++) {
        if(itemCategory[i].checked) {
            categorySelected = itemCategory[i].value;
        }
    }

    let item = itemInput.value;

    switch (categorySelected) {
        case 'fruta':
            frutas.push(item);
            saveLocal.setItem('frutas', JSON.stringify(frutas));
            break;
        case 'laticinio':
            laticinios.push(item);
            saveLocal.setItem('laticinios', JSON.stringify(laticinios));
            break;
        case 'congelado':
            congelados.push(item);
            saveLocal.setItem('congelados', JSON.stringify(congelados));
            break;
        case 'doce':
            doces.push(item);
            saveLocal.setItem('doces', JSON.stringify(doces));
            break;
        default:
            alert('nadaaa')
    }

    loadList();

    itemInput.value = "";
    itemInput.focus();
}


function deleteItem (category, item) {
    switch (category) {
        case 'fruta':
            frutas.splice(item,1);
            saveLocal.setItem('frutas', JSON.stringify(frutas));
            break;
        case 'laticinio':
            laticinios.splice(item,1);
            saveLocal.setItem('laticinios', JSON.stringify(laticinios));
            break;
        case 'congelado':
            congelados.splice(item,1);
            saveLocal.setItem('congelados', JSON.stringify(congelados));
            break;
        case 'doce':
            doces.splice(item,1);
            saveLocal.setItem('doces', JSON.stringify(doces));
            break;
        default:
            alert("Não pegou nada");
            break;
    }

    loadList();
}

function clearList(){
    window.localStorage.clear();
    frutas = [];
    laticinios = [];
    congelados = [];
    doces = [];
    loadList()
}


document.body.onload = loadList();
addBtn.addEventListener('click', addItem);
itemInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') { addItem()} });
clearBtn.addEventListener('click', clearList);