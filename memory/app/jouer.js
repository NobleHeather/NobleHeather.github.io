// localStorage.clear();

let img = document.querySelector('img');
let h5 = document.querySelector('h5');
let p = document.querySelectorAll('p');
let labels = document.querySelectorAll('label');
// let inputs = document.querySelectorAll('input');
let titles = document.querySelectorAll('h1');
let btns = document.querySelectorAll('button');
let btnValider = document.getElementById('valider');
let btnSuivant = document.getElementById('suivant');
let btnPiaf = btns[4];
let btnPlante = btns[5];
let btnBug = btns[6];
let btnClear = btns[7];
let card = document.querySelector('.card');
let pRatio = document.querySelector('.ratio');

const fetchFiche = async function() {
    // return await fetch('http://localhost:3000/api/fiche')
    return await fetch('https://memory-piafs.herokuapp.com/api/fiche')
    .then(response => response.json())
    .then(json => {
        console.log(json);
        displayQ(json);
    })
    .catch((e) => console.log(e))
}
fetchFiche();

btnSuivant.style.display = 'none';

btnClear.addEventListener('click', function() {
    console.log('BOUTON CLEAR');
    localStorage.clear();
    document.location = 'jouer.html';
});

//// On récupère les stats de l'utilisateur
let retRatio = JSON.parse(localStorage.getItem("retRatio")) || [0, 0, 0]; //*juste, faux, total répondu
console.log(retRatio);
//* On affiche les stats
pRatio.textContent = `${retRatio[0]} réponses justes / ${retRatio[2]} Questions`;

//// On récupère le choix précédent de l'utilisateur
//// Par défaut on affiche piaf
let retState = JSON.parse(localStorage.getItem("state")) || "piaf";
console.log('retState', retState);

function affichePiaf() {
    console.log('AFFICHE_PIAF');
    //* On passe de titre/bouton plante à piaf
    titles[0].style.display = 'block'
    titles[1].style.display = 'none';
    titles[2].style.display = 'none'
    //* et on change couleur de bouton jouer/valider
    btnPlante.style.display = 'inline';
    btnPiaf.style.display = 'none';
    btnBug.style.display = 'inline';
    btnPlante.setAttribute('class', 'btn border-danger m-3');
    btnBug.setAttribute('class', 'btn border-danger m-3');
    btns[0].setAttribute('class', 'btn btn-danger m-3');
    btnValider.setAttribute('class', 'btn btn-danger');
    //* et la bordure de la card
    card.setAttribute('class', 'card border-danger');

    //* On enregistre le choix de l'utilisateur dans local storage
    let state = "piaf";
    localStorage.setItem("state", JSON.stringify(state));
    retState = JSON.parse(localStorage.getItem("state"));

    console.log('retState', retState);
}

function affichePlante() {
    console.log('AFFICHE_PLANTE')
    //* On passe de titre/bouton piaf à plante
    titles[1].style.display = 'block';
    titles[0].style.display = 'none'
    titles[2].style.display = 'none'
    //* et on change couleur de boutons jouer/valider
    btnPlante.style.display = 'none';
    btnPiaf.style.display = 'inline';
    btnBug.style.display = 'inline';
    btnPiaf.setAttribute('class', 'btn border-success m-3');
    btnBug.setAttribute('class', 'btn border-success m-3');
    btns[0].setAttribute('class', 'btn btn-success m-3');
    btnValider.setAttribute('class', 'btn btn-success');
    //* et la bordure de la card
    card.setAttribute('class', 'card border-success');

    //* On enregistre le choix de l'utilisateur dans local storage
    let state = "plante";
    localStorage.setItem("state", JSON.stringify(state));
    retState = JSON.parse(localStorage.getItem("state"));

    console.log('retState', retState);
}

function afficheBug() {
    console.log('AFFICHE_BUG')
    //* On passe de titre/bouton à bug
    titles[0].style.display = 'none'
    titles[1].style.display = 'none';
    titles[2].style.display = 'block'
    //* et on change couleur de boutons jouer/valider
    btnPlante.style.display = 'inline';
    btnPiaf.style.display = 'inline';
    btnBug.style.display = 'none';
    btnPlante.setAttribute('class', 'btn border-primary m-3');
    btnPiaf.setAttribute('class', 'btn border-primary m-3');
    btns[0].setAttribute('class', 'btn btn-primary m-3');
    btnValider.setAttribute('class', 'btn btn-primary');
    //* et la bordure de la card
    card.setAttribute('class', 'card border-primary');

    //* On enregistre le choix de l'utilisateur dans local storage
    let state = "bug";
    localStorage.setItem("state", JSON.stringify(state));
    retState = JSON.parse(localStorage.getItem("state"));

    console.log('retState', retState);
}

if (retState === "plante") {
    affichePlante();
} else if (retState === "bug") {
    afficheBug();
} else {
    affichePiaf(); //* Par défaut on affiche piaf
}

//* Si on clique pour passer aux plantes
btnPiaf.addEventListener('click', function() {
    affichePiaf();
    //* On actualise la page pour que ça soit pris en compte
    document.location = 'jouer.html';
});

//* Si on clique pour passer aux piafs
btnPlante.addEventListener('click', function() {
    affichePlante();
    //* On actualise la page pour que ça soit pris en compte
    document.location = 'jouer.html';
});

//* Si on clique pour passer aux insectes
btnBug.addEventListener('click', function() {
    afficheBug();
    //* On actualise la page pour que ça soit pris en compte
    document.location = 'jouer.html';
});

//* Sépare les infos de la base de données en fonction de catégorie
function chooseCat(json) {

    console.log(json);
    console.log(retState);
    
    //// Si l'utilisateur a déjà joué, on récupère ses données,
    //// Sinon on initialise à vide
    let piafs = JSON.parse(localStorage.getItem("piafs")) || [];
    let plantes = JSON.parse(localStorage.getItem("plantes")) || [];
    let bugs = JSON.parse(localStorage.getItem("bugs")) || [];
    console.log(piafs, plantes, bugs);
    console.log(piafs.length, plantes.length, bugs.length);
    //* Si les tableaux sont vides, on remplit avec infos de la base de données
    //* Sinon on laisse les infos du localStorage
    //! Que se passe-t-il si on rajoute une carte ? On remet les conteurs à 0 ?
    if (piafs.length == 0 && plantes.length == 0 && bugs.length == 0) {
        for (let i = 0; i < json.length; i++) {
            if (json[i].categorie == 0) {
                piafs.push(json[i]);
            } else if (json[i].categorie == 1) {
                plantes.push(json[i]);
            } else if (json[i].categorie == 2) {
                bugs.push(json[i]);
            } else {
                console.log('err chooseCat');
            } 
        }
        //// On enregistre les tableaux de piafs/plantes dans local storage
        localStorage.setItem("piafs", JSON.stringify(piafs));
        piafs = JSON.parse(localStorage.getItem("piafs"));
        localStorage.setItem("plantes", JSON.stringify(plantes));
        plantes = JSON.parse(localStorage.getItem("plantes"));
        localStorage.setItem("bugs", JSON.stringify(bugs));
        plantes = JSON.parse(localStorage.getItem("bugs"));
    // S'il y a une nouvelle carte, on l'ajoute dans le bon paquet
    // } else if (json.length != (piafs.length + plantes.length + bugs.length)) {
        // console.log('nouvelle(s) carte(s)');
        // On parcout les infos de la base de données
        // let globalCardTab = [];
        // globalCardTab.push(piafs)
        // for (let x = 0; x < json.length; x ++) {
        //     for (let y = 0; y < piafs.length; y++) {
        //         let jsonPiaf = []; 
        //         if (json[x].categorie == 0) {
        //             jsonPiaf.push[json]
        //             if (json[x].nom != piafs[y].nom) {
        //                 console.log(json[x]);
        //             }
        //         }
        //     }
        //     for (let y = 0; y < plantes.length; y++) {
        //         if (json[x].categorie == 1) {
        //             if (json[x].nom != plantes[y].nom) {
        //                 console.log(json[x]);
        //             }
        //         }
        //     }
        //     for (let y = 0; y < bugs.length; y++) {
        //         if (json[x].categorie == 2) {
        //             if (json[x].nom != bugs[y].nom) {
        //                 console.log(json[x]);
        //             }
        //         }
        //     } 
        // }

        // for (let i = 0; i < bobsFollowers.length; i++) {
        //       for (let j = 0; j < tinasFollowers.length; j++) {
        //         if (bobsFollowers[i] === tinasFollowers[j]) {
        //           mutualFollowers.push(tinasFollowers[j]);
        //         }
        //       }
        //     }
    } else {
        console.log('déjà joué (ou ajouté carte juste après remise à zero)');
    }
        
    console.log(piafs, plantes, bugs);
    return([piafs, plantes, bugs])
}

//* Affiche img/indice au hasard
function displayQ(json) {

    console.log('DISPLAY_Q');

    //* Si ce n'est pas le 1er tour, on remet toutes les bordures à none
    // let labels = document.querySelectorAll('label');
    for (let i = 0; i < labels.length; i++) {
        labels[i].setAttribute('class', 'list-group-item mx-4');
    }


    let tabCat = chooseCat(json);
    console.log(tabCat);
    console.log(retState);

    //* en fonction de state, 
    //* on affecte à json le tableau de piafs ou plantes
    if (retState == 'piaf') {
        json = tabCat[0];
    } else if (retState == 'plante') {
        json = tabCat[1];
    } else if (retState == 'bug') {
        json = tabCat[2];
    } else {
        console.log('err displayQ');
    }

    console.log('tab utilisée', json);
    //* On choisit une carte au hasard
    //* en prenant en compte le nombre total de carte
    //? Random fois TotalCard = Numcard
    let numCard = 0;
    let totalCard = json.length;
    console.log('totalCard', totalCard);
    
    numCard = Math.floor(Math.random() * (totalCard));
    console.log('numCard', numCard);

    //* On affiche l'img et l'indice de cette carte
    img.src = json[numCard].imgUrl;
    // h5.textContent = json[numCard].nom;
    p[1].textContent = json[numCard].indice

    displayOptions(numCard, json);
}


//* Affiche des options au hasard
//* dans la liste des noms entrés dans la base de données
//* NB : ici déjà séparé en plantes/piafs
function displayOptions(numCard, json) {

    console.log('DISPLAY_OPTIONS');

    console.log(numCard);
    console.log(json);

    let i = 0;

    //* Si il n'y a plus assez de cartes pour remplir tous les inputs
    if (json.length < 5) {
        console.log('plus assez de cartes disponibles !');
        alert(`Plus assez de cartes disponibles !\nAjoutez des cartes dans le paquet ou remettez les stats à 0`);

        img.src = 'notAllowed.png';
        p[1].textContent = '';

        // let inputs = document.querySelectorAll('input');
        // console.log(inputs);
        console.log(labels[0]);
        //* Pour chaque label, on passe l'input en disabled et on vide le texte
        for (let x = 0; x < labels.length; x++) {
            console.log(labels.length);
            labels[x].innerHTML = `<input class="form-check-input me-1" type="radio" name="choix" id="optionDis" disabled>...`;
        }
        i = 5;
    }

    let boucle = 0
    //* On tourne dans cette boucle tant que tous les labels sont pas remplis
    while (i < labels.length) {
        console.log('BOUCLE WHILE', boucle);
        boucle++;

        //* On choisi un nombre au hasard
        let random = Math.floor(Math.random() * json.length);
        console.log(random);
        console.log(json[random].nom);

        //* On remplit chaque label avec un des noms
        //* Si le nom est différent, on remplit
        if (json[random].nom != labels[0].textContent
            && json[random].nom != labels[1].textContent
            && json[random].nom != labels[2].textContent
            && json[random].nom != labels[3].textContent
            && json[random].nom != json[numCard].nom) {
   
            console.log('IF');

            labels[i].innerHTML = `<input class="form-check-input me-1" type="radio" name="choix" id="option${i}">${json[random].nom}`;
            labels[i].setAttribute('for', `option${i}`);

            //* On enlève la réponse barrée
            labels[i].style.textDecoration = 'none';

            console.log(labels[i]);

            i++;
        //* Pour éviter une boucle infinie on met ça au cas où
        } else if (boucle > 100) {
            // localStorage.clear();
            console.log('boucle infiniiiie !');
            alert(`Il n'y a presque plus de cartes disponibles ! \n Ajoutez-en ou remettez les stats à 0`);
            i = 5;
        //* Si on tombe sur un nom déjà affiché, on relance random
        } else {
            console.log('go again');
        }

    }
    //! met des options en double
    // for(let i = 0; i < labels.length; i++) {
    //     let random = Math.floor(Math.random() * json.length);
    //     console.log(random);

    //     labels[i].innerHTML = `<input class="form-check-input me-1" type="radio" name="choix" id="option${i}"> ${json[random].nom}`;
    //     labels[i].setAttribute('for', `option${i}`);
    // }
    //!
    
    //* afficher la réponse dans une des options en réécrivant par dessus
    //* S'il reste assez de cartes dans le paquet pour tout remplir
    if (json.length >= 5) {
        let random = Math.floor(Math.random() * 4);
        console.log('random', random);
        console.log('numCard', numCard);
        labels[random].innerHTML = `<input class="form-check-input me-1" type="radio" name="choix" id="optionRand">${json[numCard].nom}`;
        labels[random].setAttribute('for', `optionRand`);
    }
}

function removeCard(card) {
    console.log(card);
    console.log(retState);

    //* en fonction de la série de carte qu'on joue, on parcourt les cartes
    if (retState == 'piaf') {
        //* On récupère le tableau des piafs et on le parcourt
        let piafs = JSON.parse(localStorage.getItem("piafs"));
        for (let i = 0; i < piafs.length; i++) {
            //* Quand on a trouvé la carte == la carte qui vient d'être jouée
            if (card == piafs[i].nom) {
                // console.log(piafs.indexOf(piafs[i]));
                // console.log(piafs.indexOf(piafs[i]) + 1);
                //* On supprime la carte du tableau
                piafs.splice(piafs.indexOf(piafs[i]), 1); //? splice : index, how many
                console.log(piafs);
                //* Et on renvoit dans le storage le tableau mis à jour
                localStorage.setItem("piafs", JSON.stringify(piafs));
            }
        }
    //* idem pour le tableau des plantes
    } else if (retState == 'plante') {
        let plantes = JSON.parse(localStorage.getItem("plantes"));
        for (let i = 0; i < plantes.length; i++) {
            if (card == plantes[i].nom) {
                plantes.splice(plantes.indexOf(plantes[i]), ( (plantes.indexOf(plantes[i])) + 1) );
                console.log(plantes);

                localStorage.setItem("plantes", JSON.stringify(plantes));
            }
        }
    } else if (retState == 'bug') {
        let bugs = JSON.parse(localStorage.getItem("bugs"));
        for (let i = 0; i < bugs.length; i++) {
            if (card == bugs[i].nom) {
                bugs.splice(bugs.indexOf(bugs[i]), ( (bugs.indexOf(bugs[i])) + 1) );
                console.log(bugs);

                localStorage.setItem("bugs", JSON.stringify(bugs));
            }
        }
    } else {
        console.log('err removeCard');
    }
    //* Ensuite on actualise la page
    // document.location = 'jouer.html';
}

//* Quand l'utilisateur valide sa réponse
btnValider.addEventListener('click', function(e) {
    
    e.preventDefault();
    console.log('BTN VALIDER');

    //* On déclare inputs ici et pas globalement pour que le checked soit prit en compte
    let inputs = document.querySelectorAll('input');

    //* On affiche le bouton suivant
    btnSuivant.style.display = 'inline';

    // console.log(inputs.length);

    //* On parcourt tous les inputs
    for (let i = 0; i < inputs.length; i++) {
        // console.log('FOR');
        console.log(inputs[i]);

        //* si le radio est coché
        if (inputs[i].checked === true) {
            // console.log('IF');
            //* si l'id est celui qu'on a attribué à la bonne réponse
            if (inputs[i].id === "optionRand") {
                console.log('bonne réponse');
                //* On met une bordure verte
                labels[i].setAttribute('class', 'list-group-item mx-4 border border-success borderThick');
                btnSuivant.style.display = 'inline';

                //* On cache le bouton valider pour éviter que l'utilisateur enregistre 15f une bonne réponse
                btnValider.style.display = 'none';

                //* On parcourt tous les inputs et on les désactive
                for (let i = 0; i < inputs.length; i++) {
                    inputs[i].setAttribute('disabled', 'disabled');
                }

                removeCard(labels[i].textContent);

                //* On met les stats à jour
                retRatio[0] += 1;
                retRatio[2] += 1;
                pRatio.textContent = `${retRatio[0]} réponses justes / ${retRatio[2]} Questions`;
                //* on sauvegarde stats dans storage
                localStorage.setItem("retRatio", JSON.stringify(retRatio));
                
                //* si l'id est # de celui qu'on a attribué à la bonne réponse
            } else {
                console.log('mauvaise réponse');
                //* On barre la mauvaise réponse
                labels[i].style.textDecoration =  'line-through red';
                //* On met les stats à jour
                retRatio[1] += 1;
                retRatio[2] += 1;
                pRatio.textContent = `${retRatio[0]} réponses justes / ${retRatio[2]} Questions`;
                //* on sauvegarde stats dans storage
                localStorage.setItem("retRatio", JSON.stringify(retRatio));

                showRep(inputs, labels);
            }
        } else {
            console.log('input false');
        }
    }
});

//* Montre la réponse
function showRep(inputs, labels) {

    console.log('SHOW_REP');
    console.log(inputs);
    console.log(labels);

    //* On cache le bouton valider pour éviter que l'utilisateur enregistre 15f une mauvaise réponse
    btnValider.style.display = 'none';

    //* On parcourt tous les inputs
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].setAttribute('disabled', 'disabled');
        //* Si l'input a l'id attribué à la bonne réponse
        if (inputs[i].id === "optionRand") {
            // <label class="list-group-item active mx-2"></label>
            //* On passe le <li> en active
            labels[i].setAttribute('class', 'list-group-item active mx-4');
            btnSuivant.style.display = 'inline';
        }
    }
}

btnSuivant.addEventListener('click', function() {

    //* envoyer à la question suivante    
    displayQ();

    //* cacher le bouton
    btnSuivant.style.display = 'none';

    //* On affiche le bouton valider qui est caché en cas de mauvaise réponse
    btnValider.style.display = 'inline';

    // document.location = 'jouer.html';

});