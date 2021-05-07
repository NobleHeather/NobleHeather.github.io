let inputs = document.querySelectorAll('input');
let catSelect = document.querySelector('#categorie');
let options = document.querySelectorAll('#categorie > option');
let btnSubmit = document.getElementById('submit'); 
let msgAjout = document.querySelector('p');

msgAjout.style.opacity = '0';

//* Quand l'utilisateur clique dans les inputs
inputs[0].addEventListener('focus', function() {
    //* Si c'est la valeur par défaut on supprime
    if(inputs[0].value == 'Oiseau') {
        inputs[0].value = '';
    }
    //* On modifie le style pour bien différencier de valeur par défaut
    inputs[0].style.fontStyle = 'normal';
    inputs[0].style.fontWeight = 'bold';
});
//? Pourquoi t'as pas fait 3 fois la même chose ? No idea. C'est compliqué dans ma tête ok ?
inputs[1].addEventListener('focus', function() {
    inputs[1].placeholder = 'max 160 caractères, pour écrire un roman c\'est pas ici';
    inputs[1].style.fontStyle = 'normal';
    inputs[1].style.fontWeight = 'bold';
});
inputs[2].addEventListener('focus', function() {
    if (inputs[2].value == 'oiseau.jpg') {
        inputs[2].value = '';
    }
    inputs[2].style.fontStyle = 'normal';
    inputs[2].style.fontWeight = 'bold';
});

//* Ici on récupère toutes les fiches
const fetchFiche = async function() {
    // return await fetch('http://localhost:3000/api/fiche')
    return await fetch('https://memory-version-publique.herokuapp.com/api/fiche')
    .then(response => response.json())
    .then(json => {
        console.log(json);
        return json;
    })
    .catch((e) => {
        console.log(e);
        msgAjout.innerHTML = "<strong>Erreur serveur !</strong> (réessayez ultérieurement<br/> ou plaignez-vous à l'<a href=\"mailto:morgane_felloni@hotmail.fr\" class=\"text-danger text-decoration-underline\"><em>informaticien</em></a>)";
    })
}

//! montrer les smalls d'explications si input invalid
// if (inputs[0].style.border == ' 2px solid red' || inputs[2].style.border == ' 2px solid red') {
//     console.log('invalid');
//     let smalls = document.querySelectorAll('small');
//     smalls[1].style.opacity = 1;
//     smalls[4].style.opacity = 1;
// }
//!

let categorie = 0; //* par défaut : oiseau
//* ici on capte le choix du select
catSelect.addEventListener('change', function() {
    categorie = catSelect.selectedIndex;
    console.log(categorie);
});

//* Quand l'utilisateur envoie le formulaire
btnSubmit.addEventListener('click', function(e) {
    e.preventDefault();

    //* On crée un objet fiche
    let fiche = {
        nom: inputs[0].value,
        indice: inputs[1].value,
        categorie: categorie,
        imgUrl: `./images/${inputs[2].value}`
    }
    console.log(fiche);

    msgAjout.innerHTML = "<strong>Vérification du formulaire en cours...</strong>";
    msgAjout.style.opacity = '1';
    verifForm(fiche);

    console.log(verifForm(fiche));
    if (verifForm(fiche) == false) {
        msgAjout.innerHTML = "<strong>Vous n'avez pas correctement rempli le formulaire</strong>";
    } else {
        msgAjout.innerHTML = "<strong>Vérification de la base de donnée en cours...</strong>";
        msgAjout.style.opacity = '1';
        verifDoublon(fiche);
    }

    // console.log(verifDoublon(fiche));
});

const postFiche = async function(arg) {

    // fetch('http://localhost:3000/api/fiche', {
    fetch('https://memory-version-publique.herokuapp.com/api/fiche', {
        method: "POST",
        headers : {
            'Accept' : 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify(arg)
    })
    .then(response => response.json())
    .then(json => {
        console.log(json);
        afficheMsg(json);
        addCard(json);
    })
    .catch((e) => {
        console.log(e);
        msgAjout.innerHTML = "<strong>Erreur serveur</strong> (réessayez ultérieurement<br/> ou plaignez-vous à l'<a href=\"mailto:morgane_felloni@hotmail.fr\" class=\"text-danger text-decoration-underline\"><em>informaticien</em></a>)";
    })
}

//* Du coup maintenant ça il y en a un peu partout...
function afficheMsg(json) {

    console.log(json);
    console.log(json.message);

    //* En fonction de la réponse de la base de donnée,
    //* on change le contenu du message
    if (json.message === 'Fiche enregistrée !') {
        msgAjout.innerHTML = "<strong>Carte ajoutée !</strong>"
        clear();
    } else {
        msgAjout.innerHTML = "<strong>Avez-vous bien rempli le formulaire ?</strong>"
    }

    //* On affiche le message une seconde (avec fadeIn/fadeOut ça serait mieux mais j'ai la flemme d'ajouter JQuery juste pour ça)
    setTimeout(function() { 
        msgAjout.style.opacity = '0';
    }, 2000);
}

//* On ajoute la nouvelle carte au tableau de jeu
function addCard(json) {
    // console.log(newCard);
    
    console.log(json);
    console.log(json.fiche);

    //// On récupère les paquets que l'utilisateur utilise actuellement
    let piafs = JSON.parse(localStorage.getItem("piafs")) || [];
    let plantes = JSON.parse(localStorage.getItem("plantes")) || [];
    let bugs = JSON.parse(localStorage.getItem("bugs")) || [];

    //* On ajoute la nouvelle carte dans le bon paquet
    if (json.fiche.categorie == 0) {
        piafs.push(json.fiche);
    } else if (json.fiche.categorie == 1) {
        plantes.push(json.fiche);
    } else if (json.fiche.categorie == 2) {
        bugs.push(json.fiche);
    }

    ////On renvoie les paquets dans le storage
    localStorage.setItem("piafs", JSON.stringify(piafs));
    localStorage.setItem("plantes", JSON.stringify(plantes));
    localStorage.setItem("bugs", JSON.stringify(bugs));
}


//* On réinitialise le formulaire
function clear() {

    for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = '';
    }

    console.log(inputs[0]);

    categorie = 0;

    for (let i = 0; i < options.length; i++) {
        options[i].removeAttribute('selected');
    }
    
    options[0].setAttribute('selected', 'selected');

    console.log(options[0]);
    console.log(options[1]);
    console.log(options[2]);

    inputs[0].value = 'Oiseau';
    inputs[2].value = 'oiseau.png';

    inputs[0].style.fontStyle = 'italic';
    inputs[2].style.fontStyle = 'italic';
    inputs[0].style.fontWeight = 'normal';
    inputs[1].style.fontWeight = 'normal';
    inputs[2].style.fontWeight = 'normal';

}

//* On compare le nom de la fiche ajoutée avec tous les noms de la base de données
async function verifDoublon(fiche) {

    let data = await fetchFiche(); //* On attend d'avoir les fiches
    console.log(data.length);
    console.log(data[0]);
    console.log(data[0].nom);
    console.log(data[1].nom);

    console.log(fiche.nom);

    let i = 0;
    //* Bon ça c'est assez clair non ? 
    while (i < data.length) {
        if (fiche.nom == data[i].nom) {
            console.log('doublon');
            msgAjout.innerHTML = "<strong>Vous avez déjà enregistré une fiche à ce nom !</strong>";
            i = data.length;
        } else if (fiche.nom != data[i].nom && i == data.length -1) {
            console.log('pas de doublon');
            console.log(i);
            msgAjout.innerHTML = "<strong>Validation en cours...</strong>";
            postFiche(fiche);
            i++;
        } else if (fiche.nom != data[i].nom) {
            console.log('pas de doublon');
            i++;
        } else {
            console.log('err verifDoublon');
            i = data.length;
        }
    }
    // for (let i = 0; i < data.length; i++) {
    //     console.log(data[i].nom);
    //     if (fiche.nom == data[i].nom) {
    //         console.log('doublon');
    //         msgAjout.innerHTML = "<strong>Vous avez déjà enregistré une fiche à ce nom !</strong>";
    //         return 'doublon';
    //     } else {
    //         console.log('pas de doublon');
    //         console.log(i);
    //         msgAjout.innerHTML = "<strong>Validation en cours...</strong>";
    //         postFiche(fiche);
    //     }
    // } 
}

function verifForm(fiche){
    // nom: inputs[0].value,
//     indice: inputs[1].value,
//     categorie: categorie,
//     imgUrl: `./images/${inputs[2].value}`

    console.log(fiche);
    //* S'il y a un champ vide
    if (fiche.nom == '' || fiche.imgUrl == './images/') {
        console.log('input vide');
        return false;
    } else {
        console.log('form ok');
    }

    //! finir ici la validation du form en JS
}