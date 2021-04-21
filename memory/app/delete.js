let cardDiv = document.querySelector('.hidden');
let card = document.querySelector('.card');
let btnLoupe = document.getElementById('submit1');
let btnDelete = document.getElementById('submit2');
let nom = document.querySelector('h5');
let p = document.querySelectorAll('p')
let msgDelete = p[0];
let indice = p[1];
let img = document.querySelector('img');
let input = document.querySelector('input');

cardDiv.style.opacity = '0';
msgDelete.style.opacity = '0';

btnLoupe.addEventListener('click', function(e) {
    e.preventDefault();
    
    console.log(input.value);
    fetchFiche();

});

const fetchFiche = async function() {
    // return await fetch('http://localhost:3000/api/fiche')
    return await fetch('https://memory-piafs.herokuapp.com/api/fiche')
    .then(response => response.json())
    .then(json => {
        console.log(json);
        findAndDisplay(json);
    })
    .catch((e) => console.log(e))
}

let thisId;
function findAndDisplay(arg) {
    console.log(arg);
    for (let i = 0; i < arg.length; i++) {
        if (arg[i].nom == input.value) {
            thisId = arg[i]._id;
            console.log(thisId);
            nom.textContent = arg[i].nom;
            indice.textContent = arg[i].indice;
            img.src = arg[i].imgUrl;
            if (arg[i].categorie == 0) {
                card.setAttribute('class', 'card border-danger mt-1');
            } else if (arg[i].categorie == 1) {
                card.setAttribute('class', 'card border-success mt-1');
            } else if (arg[i].categorie == 2) {
                card.setAttribute('class', 'card border-primary mt-1');
            }
        }
    }
    cardDiv.style.opacity = '1';
    console.log(nom);
    console.log(indice);
    console.log(img);
}


const deleteFiche = async function() {
    // let thisUrl = `http://localhost:3000/api/fiche/${thisId}`;
    let thisUrl = `https://memory-piafs.herokuapp.com/api/fiche/${thisId}`;
    fetch(thisUrl, {
        method: "DELETE"
    })
    .then(response => response.json())
    .then(json => console.log(json));
}

function afficheMsg() {
    msgDelete.style.opacity = '1';
    
    setTimeout(function() {
        msgDelete.style.opacity = '0';
    }, 2000);
}

btnDelete.addEventListener('click', function(e) {
    e.preventDefault();

    deleteFiche();
    afficheMsg();

    cardDiv.style.opacity = '0';

    nom.textContent = 'Cette carte n\'est pas dans la base de données';
    indice.textContent = 'Est-ce bien la bonne orthographe ? Avec le bon nombre de majuscule ?';
    img.src = 'notAllowed.png';
});