let btnLoupe = document.getElementById('submit1');
let btnModif = document.getElementById('submit2');
let formDiv = document.querySelector('.hidden');
let inputs = document.querySelectorAll('input');
let catSelect = document.querySelector('#categorie');
let options = document.querySelectorAll('#categorie > option');
let msgModif = document.querySelector('p');

formDiv.style.opacity = '0';
msgModif.style.opacity = '0';

btnLoupe.addEventListener('click', function(e) {
    
    e.preventDefault();
    
    formDiv.style.opacity = '1';

    inputs[1].value = inputs[0].value;

    fetchFiche();
});

const fetchFiche = async function() {
    // return await fetch('http://localhost:3000/api/fiche')
    return await fetch('https://memory-piafs.herokuapp.com/api/fiche')
    .then(response => response.json())
    .then(json => {
        console.log(json);
        findFiche(json);
    })
    .catch((e) => console.log(e))
}

let thisId;
function findFiche(arg) {
    console.log(arg);
    // Par défaut:
    inputs[2].value = 'Est-ce bien la bonne orthographe ?'
    inputs[3].value = 'Avec le bon nombre de majuscule ?'
    options[3].setAttribute('selected', 'selected');

    for (let i = 0; i < arg.length; i++) {
        console.log(arg[i].nom);

        if (arg[i].nom == inputs[1].value) {
            thisId = arg[i]._id;
            inputs[2].value = arg[i].indice;
            inputs[3].value = arg[i].imgUrl;
            for (let y = 0; y < options.length; y++) {
                options[y].removeAttribute('selected', '');

            }
            console.log(arg[i].categorie);
            options[arg[i].categorie].setAttribute('selected', 'selected');
            console.log(options[0]);
            console.log(options[1]);
            console.log(options[2]);
        }
    }
}

let categorie = -1;
catSelect.addEventListener('change', function() {
    categorie = catSelect.selectedIndex;
    console.log(categorie);
});

btnModif.addEventListener('click', function(e) {
    e.preventDefault();

    console.log(categorie);

    // revoir ce truc, censé stocker dans catégorie 
    //la position du select si l'utilisateur ne touche rien
    //! fonctionne que à la 1ère itération
    if (categorie == -1) {
        for (let i = 0; i < options.length; i++) {
            console.log(options.length);
            console.log(options[i].selected);
            if (options[i].selected === true) {
                console.log(options[i].value);
                categorie = parseInt(options[i].value);
                console.log(categorie);
            }
        }
    }

    let fiche = {
        nom: inputs[1].value,
        indice: inputs[2].value,
        categorie: categorie,
        imgUrl: inputs[3].value
    }
    console.log(fiche);

    postFiche(fiche);
    clear();
    afficheMsg();
});

const postFiche = async function(arg) {
    // let thisUrl = `http://localhost:3000/api/fiche/${thisId}`;
    let thisUrl = `https://memory-piafs.herokuapp.com/api/fiche/${thisId}`;
    console.log(thisUrl);

    fetch(thisUrl, {
        method: "PUT",
        headers : {
            'Accept' : 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify(arg)
    })
    .then(response => response.json())
    .then(json => console.log(json));
}

function clear() {
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = '';
    }

    console.log(inputs[0]);

    categorie = -1;

    
    for (let i = 0; i < options.length; i++) {
        options[i].removeAttribute('selected');
    }
    
    options[0].setAttribute('selected', 'selected');

    console.log(options[0]);
    console.log(options[1]);
    console.log(options[2]);
}

function afficheMsg() {
    msgModif.style.opacity = '1';
    
    setTimeout(function() {
        msgModif.style.opacity = '0';
    }, 2000);
}