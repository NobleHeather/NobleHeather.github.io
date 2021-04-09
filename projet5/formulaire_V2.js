// localStorage.clear();

//// RESUME COMMANDE

//!clear local storage une fois que tout est fait

let choixNounoursTab = JSON.parse(localStorage.getItem("choixNounoursTab"));
console.log(choixNounoursTab);

//* calcul de la quantité totale pour page de confirmation
let quantiteTotale = 0;
for (let i = 0; i < choixNounoursTab.length; i++) {
    quantiteTotale += parseInt(choixNounoursTab[i][1]);
    console.log(quantiteTotale);
}

//* On remet le badge sur le panier
let badge = document.querySelector('.badge');
if (quantiteTotale == 0) {
    console.log("quantité totale = 0");
} else {
    badge.innerHTML = `${quantiteTotale}`;
}

//* Un petit calcul pour éviter au navigateur de repasser sur GETinfosNounours
let prixUniteTab = [];
//* On parcourt le tableau avec les nounours
for (let i = 0; i < choixNounoursTab.length; i++) {
    //* On récupère le prix, la quantité de chaque nounours
    console.log(i);
    let prix = choixNounoursTab[i][4];
    console.log(prix);
    let quantite = choixNounoursTab[i][1];
    console.log(quantite);
    //* On calcule le prix unitaire de chaque nounours et on le stock dans prixUniteTab
    let prixUnite = parseInt(prix) / parseInt(quantite);
    console.log(prixUnite);
    prixUniteTab.push(prixUnite);
    console.log(prixUniteTab);
}
console.log(prixUniteTab);

let commandeTab = []; //pour delete qd click bin

let commandeAll = document.getElementById('commandeAll');
//* On ajoute des lignes de commandes en fonction du nombre de nounours
for (let i = 0; i < choixNounoursTab.length; i++) {
    //* nouvelle ligne de commande
    let newCommande = document.createElement("div");
    newCommande.innerHTML = "<div><img /></div><div>nom</div><div>prix</div><div>couleur</div><div>supr</div>";
    newCommande.setAttribute("class", "commande row border-bottom border-primary")
    
    //* On sélectionne tous les éléments de la ligne et on remplit un par un
    let newCommandeDiv = newCommande.querySelectorAll('div');
    
    //* img
    let newCommandeImgDiv = newCommandeDiv[0];
    newCommandeImgDiv.setAttribute("class", "col-2");
    let newCommandeImg = newCommandeImgDiv.querySelector("img");
    // console.log(newCommandeImg);
    newCommandeImg.setAttribute("src", choixNounoursTab[i][6]);
    newCommandeImg.setAttribute("class", "imgCommande");
    console.log(newCommandeImgDiv);
    
    //* nom
    let newCommandeNom = newCommandeDiv[1];
    newCommandeNom.setAttribute("class", "col-3 d-flex align-items-center");
    newCommandeNom.innerHTML = `<strong>Nom : &nbsp;</strong>${choixNounoursTab[i][3]}`;
    console.log(newCommandeNom);
    
    //* prix
    console.log(prixUniteTab);
    let newCommandePrix = newCommandeDiv[2];
    newCommandePrix.setAttribute("class", "col-3 d-flex align-items-center");
    newCommandePrix.innerHTML = `<strong>Prix : &nbsp;</strong>${choixNounoursTab[i][1]} x ${prixUniteTab[i]}€ = ${choixNounoursTab[i][4]}`;
    console.log(newCommandePrix);
   
    //* couleur
    let newCommandeCouleur = newCommandeDiv[3];
    newCommandeCouleur.setAttribute("class", "col-3 d-flex align-items-center");
    newCommandeCouleur.innerHTML = `<strong>Couleur : &nbsp;</strong>${choixNounoursTab[i][0]}`;
    console.log(newCommandeCouleur);
   
    //* icone poubelle
    let newCommandeIcon = newCommandeDiv[4];
    newCommandeIcon.setAttribute("class", "col-1 d-flex align-items-center bin");
    newCommandeIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16"><path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/></svg>`;
    
    commandeAll.appendChild(newCommande);

    commandeTab.push(newCommande); // pour bin
}
console.log(commandeTab);

//* On calcule le prix
let totalDiv = document.getElementById('total');
let total = 0;
//* on parcourt le tableau de nounours pour récup prix / quantité de chaque nounours
for (let i = 0; i < choixNounoursTab.length; i++) {
    let prix = choixNounoursTab[i][4];
    console.log(prix);
    // let quantite = choixNounoursTab[i][1];
    // console.log(quantite);
    //* on multiplie et on ajoute à chaque tour
    total += parseInt(prix);
    console.log(total);
}
console.log(total);
//* Et on affiche pour utilisateur
totalDiv.innerHTML = `<strong>Total : </strong>${total}€`;

//* On retarde cette partie jusqu'à ce que les lignes de commande existent
setTimeout(() => {
    //* On repère les bins dans html
    let binAll = document.querySelectorAll(".bin")
    // let bin = [];
    console.log(binAll);
    //* On parcourt les lignes de commandes (1 commande / case du tableau choixNounoursTab)
    for (let i = 0; i < choixNounoursTab.length; i++) {
        //* on capture toutes les bins dans un tableau
        // bin.push(newCommandeIconAll[i]); 
        // console.log(bin[i]);
        console.log(binAll[i]);
        // console.log(total);
        // console.log(prixUniteTab);
        //* Pour chaque bin, on efface la ligne qui lui correspond au click
        binAll[i].addEventListener('click', function() {
            console.log(binAll[i]);
            console.log(commandeTab[i]);
            commandeTab[i].remove();
            //* On ajuste le calcul du total et on l'affiche à l'utilisateur
            let prix = choixNounoursTab[i][4];
            console.log(parseInt(prix));
            total -= parseInt(prix);
            totalDiv.innerHTML = `<strong>Total : </strong>${total}€`; //wow, ça fonctionne, ce truc de ouf
        });
    }
    // console.log(bin);
}, 1000);

//// FORMULAIRE DE CONTACT
/**
 * !Expects request to contain:
 * contact: {
 *   firstName: string,
 *   lastName: string,
 *   address: string,
 *   city: string,
 *   email: string
 * }
 * products: [string] <-- array of product _id
 */

//* annuler comportement par défaut pour que la page se recharge pas
$("#valider").click(function(e) { 
    e.preventDefault();
    // creation.style.border = '1px solid #000';
});

//* ajouter tableau avec données utilisateur
let lastNameInput = document.getElementById('lastName');
let firstNameInput = document.getElementById('firstName');
let addressInput = document.getElementById('address');
let cityInput = document.getElementById('city');
let emailInput = document.getElementById('email');
//* bouton
let valider = document.getElementById('valider');
//* form
let formUser = document.getElementById('formUser');
// let contact = new FormData();
//? si je fais new FormData(formUser) ça ne capture pas le contenu des input

let contact = {}; 
let commande;

valider.addEventListener('click', function() {

    //! faire une boucle ici ?
    // contact.append('firstName', firstNameInput.value);
    // contact.append('lastName', lastNameInput.value);
    // contact.append('address', addressInput.value);
    // contact.append('city', cityInput.value);
    // contact.append('email', emailInput.value);

    // element.id = id;
    contact.firstName = firstNameInput.value;
    contact.lastName = lastNameInput.value;
    contact.address = addressInput.value;
    contact.city = cityInput.value;
    contact.email = emailInput.value;
    console.log(contact.firstName);
    console.log(contact);
    
    //* parcourt l'objet
    // for (let pair of contact.entries()) {
    //     console.log(pair[0] + ' : ' + pair[1]);
    // }

    console.log(choixNounoursTab);
    // [i][3]
    let products = [];
    for (let i = 0; i < choixNounoursTab.length; i++) {
        products.push(choixNounoursTab[i][2]);
        console.log(products);
    }

    // let products = [choixNounoursTab, total];
    console.log(products);
    // console.log(JSON.stringify(products));

    commande = {contact, products};
    console.log(commande);

    // POST
    const PostNounours = async function() {
        // fetch('http://localhost:3000/api/teddies/order', {
        fetch('https://projet-oc-5.herokuapp.com/api/teddies/order', {
            method: "POST",
            headers : {
                'Accept' : 'application/json',
                'Content-type': 'application/json'
            },
            // body: JSON.stringify(commande) //* => 500 : internal server error
            // body: JSON.stringify(contact, products) //* => 400 : bad request
            // body: JSON.stringify({contact: contact, products: products}) //* => 500 : internal server error
            // body: JSON.stringify({contact: contact, products: products}) //* OK 
            body: JSON.stringify(commande) //* OK 
        })
        .then(response => response.json())
        // .then(json => console.log(json));
        .then(function (response) {
            console.log(response.orderId);
            console.log(response.contact);
            console.log(response.products);

            //* infos nécessaires pour la page de confirmation
            //! A faire passer via JS si possible
            let infosConfirmation = [];
            infosConfirmation.push(quantiteTotale, total, response.orderId, response.contact);
            console.log(infosConfirmation);
            localStorage.setItem("infosConfirmation", JSON.stringify(infosConfirmation));
        
            //* On envoie vers la page de confirmation
            setTimeout(function() {
                document.location.href="confirmation.html"; 
            }, 300);
        });
    }
    PostNounours();   

});





    
    //! J'ai essayé d'envoyer contact et procucts dans un objet, dans un array, 
    //! dans un objet lui-même dans un array et inversement, 
    //! que du texte, du texte et un objet, du texte et un array, 
    //! du texte dans un objet ou un array 
    //! WHAT THE FUCK TU ME LAISSES L'ACHETER CE NOUNOURS OU BIEN ??

    //poster une commande : XML request (tentative 1)
    // let requestPOST = new XMLHttpRequest();
    // requestPOST.open("POST", "http://localhost:3000/api/teddies/order");
    // requestPOST.setRequestHeader("Content-Type", "application/json");
    // requestPOST.send(contact, products);
    
    //poster une commande : fetch (tentative 2)
    // fetch('http://localhost:3000/api/teddies/order', {
    // method: "POST",
    // headers : {
    //     'Accept' : 'application/json',
    //     'Content-type': 'application/json'
    // },
    // //du coup c'est un tableau, qu'est-ce qu'on doit envoyer exactement ?
    // //la consigne dit : "Requête JSON contenant un objet de contact et un tableau de produits"
    // //donc on le met dans quoi ? un {} ? un [] ??
    // body: JSON.stringify({contact: {contact}, products: [products]})
    // })
    // .then(response => response.json())
    // .then(json => console.log(json));

    ////dans les deux cas, message d'erreur : 400 bad request

    //poster une commande : fetch (tentative 3)
    //! erreur de syntaxe quelque part, console dit : Invalid destructuring assignment target 218
    // const PostCommande = async function(data) {
    //     let response = await fetch('http://localhost:3000/api/teddies/order'), {
    //         method: "POST",
    //         headers : {
    //         'Content-type': 'application/json'
    //         },
    //         body : JSON.stringify(data)
    //     })
    //     if (response.ok) {
    //         let data = await response.json();
    //         console.log(data);
    //     } else {
    //         console.error('response serveur', response.status);
    //     }
    // }
    // PostCommande(contact, products);



















//! BROUILLONS

// //* si on a besoin de rajouter des div
// let commande = document.querySelector('.commande');
// // document.createElement()
// // commande.appendChild

// //* On capture toutes les cases de la commande
// let img = document.querySelector('.commande > div > img');
// let commandeDiv = document.querySelectorAll('.commande > div');
// let commandeNom = commandeDiv[1];
// let commandePrix = commandeDiv[2];
// //! si utilisateur choisis plusieurs fois le même nounours
// // let commandeQuantite = commandeDiv[3];
// let commandeCouleur = commandeDiv[3];
// let commandeTotal = commandeDiv[4]



// //* On remplit avec les infos nounours
// commandeNom.innerHTML = `<strong>Nom : </strong>${retrievedChoixNounours[3]}`;
// commandePrix.innerHTML = `<strong>Prix : </strong>${retrievedChoixNounours[1]} x ${prixUnite}€ = ${retrievedChoixNounours[4]}`;
// commandeCouleur.innerHTML = `<strong>Couleur : </strong>${retrievedChoixNounours[0]}`;

//! Si plusieurs nounours, ajouter des lignes de commandes en fonction du nombre de nounours
//! remplir ici commandeQuantite & CommandeTotal
// let quantite = 1; //* temporaire : initialisé à un en attendant d'ajouter la fonctionnalité à panier_V2.js
// commandeQuantite.innerHTML = `<strong>Nombre de commande : </strong>${quantite}`;
// commandeTotal.innerHTML = `<strong>Total : </strong>${parseInt(quantite) * parseInt(retrievedChoixNounours[4])}€`;

// localStorage.getItem




// let products = ["id", "name", "25€", "description", "img"];

// truc à poster

//?ici j'ai un objet avec les infos utilisateurs, ensuite je fais quoi ???
// let requestPOST = new XMLHttpRequest();
// requestPOST.open("POST", "http://localhost:3000/api/teddies/formulaire.html");
// requestPOST.setRequestHeader("Content-Type", "application/json");
// requestPOST.send(JSON.stringify(formData, products));


// var formData = new FormData();
// formData.append('key1', 'value1');
// formData.append('key2', 'value2');

// // Display the key/value pairs
// for (var pair of formData.entries()) {
//     console.log(pair[0]+ ', ' + pair[1]); 
// }




// ANCIENNE VERSION
// let utilisateur = [];
// let tabUtilisateurs = [];

// //? POST tableau vide
// //! Est-ce que ça va pas écraser les données ?
// let requestPOST = new XMLHttpRequest();
// requestPOST.open("POST", "http://localhost:3000/api/teddies/formulaire.html");
// requestPOST.setRequestHeader("Content-Type", "application/json");
// requestPOST.send(JSON.stringify(tabUtilisateurs));

// function setUtilisateur() {
//     // concaténation des # parties du mail
    // mailEntier = `//${mail1.value}@${mail2.value}`;
//     console.log(mailEntier);
//     //! verif pattern mail ou set pattern dans form (mieux)
    
//     // Les infos rentrées dans input sont ajoutées à [utilisateur]
//     utilisateur.push(nomInput.value, prenomInput.value, adresseInput.value,
//         adresse2Input.value, villeInput.value, codePostalInput.value);

//     // capturer valeur du select pays et pusher dans le tableau
//     inputPays.addEventListener('change', function() {
//         index = inputPays.selectedIndex;
//         console.log(index);
//         switch (index) {
//             case 0 :
//                 utilisateur.push('France');
//                 break;
//             case 1 :
//                 utilisateur.push('Allemagne');
//                 break;
//             case 2 :
//                 utilisateur.push('Belgique');
//                 break;
//             case 3 :
//                 utilisateur.push('Italie');
//                 break;
//             case 4 :
//                 utilisateur.push('Espagne');
//                 break;
//             default:
//                 console.log("erreur");
//                 break;
//         }
//     });
    
//     if (index == -1) { // utilisateur pas rentré dans la boucle
//         utilisateur.push('France, par défaut');
//     }

//     // ajouter infos restantes 
//     utilisateur.push(mailEntier, mdpInput.value, enregistrerIDInput.value);
//     console.log('utilisateur : ' + utilisateur);
// }

// // Quand on clique sur valider
// valider.addEventListener("click", function() {
//     //? GET tableau utilisateurs 
//     let requestGET = new XMLHttpRequest();
//     requestGET.onreadystatechange = function() {
//         if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
//             let response = JSON.parse(this.responseText);
//         console.log(response.current_condition.condition);
//         }
//     };
//     requestGET.open("GET", "http://localhost:3000/api/teddies/users");
//     requestGET.send(JSON.parse(tabUtilisateurs));
//     console.log(tabUtilisateurs);

//     // tester tableau des utilisateurs pour voir si l'utilisateur existe déjà
//     if (tabUtilisateurs.includes(nomInput.value) || tabUtilisateurs.includes(mailEntier.value)) { //tester avec nom & mail
//         alert('vous avez déjà un compte n\ Merci de vous connecter avec vos identifiants');
//     } else {
//         setUtilisateur();
//         console.log(utilisateur);
//         tabUtilisateurs.unshift(utilisateur); //comme ça on se fait pas chier à parcourir tout le tableau
//         console.log(tabUtilisateurs)
//         // classer tabUtilisateurs par order alpha par 1ère valeur qui est nom ?
//     }

//     //? POST tabUtilisateurs
//     let requestPOST = new XMLHttpRequest();
//     requestPOST.open("POST", "http://localhost:3000/api/teddies/users");
//     requestPOST.setRequestHeader("Content-Type", "application/json");
//     requestPOST.send(JSON.stringify(tabUtilisateurs));

// });





// BROUILLON

    // // On envoie [utilisateur] sur la base de données
    // localStorage.setItem("utilisateur", JSON.stringify(utilisateur));
    // let retrivedUtilisateur = localStorage.getItem("utilisateur");
    // console.log("retrievedUtilisateur: ", retrivedUtilisateur);

    //// Si on veut mettre des index aux utilisateur
    //// On parcourt le tableau des utilisateurs
    // for (let i = 0; i < tabUtilisateurs.length; i++) {
    //     // Si la case est remplie, on avance dans le tableau
    //     if (tabUtilisateurs[i] != null) {
    //         i++;
    //     // A la fin du tableau, on ajoute une case avec l'index directement supérieur
    //     // et on la remplie avec le nouvel utilisateur
    //     } else {
    //         i++;
    //         tabUtilisateurs.push([i, utilisateur]);
    //     }
    // }

    // //On envoie [tabUtilisateurs] sur la base de données
    // localStorage.setItem("tabUtilisateurs", JSON.stringify(tabUtilisateurs));
    // let retrivedTabUtilisateurs = localStorage.getItem("tabUtilisateurs");
    // console.log("retrievedTabUtilisateurs" + retrivedTabUtilisateurs);

    // console.log('tabUtilisateurs' + tabUtilisateurs);
    



// AjouteContenu(num, titleInput.value);


// function AjouteUtilisateur(key, texte) {
//     // console.log("clé=" + key + " ,titre=" + title);
//     //ajoute un objet avec titre + index dans le tableau des titres
//     let obj = {};
//     obj[key] = texte;
//     tabContenu.unshift(obj); //*anciennement push
//     // stock l'objet dans local storage
//     localStorage.setItem("newObject", JSON.stringify(tabContenu));
//     // récupère l'objet depuis local storage
//     let retrievedObject = localStorage.getItem("newObject");
//     console.log("retrievedObject: ", retrievedObject);
//         //affiche tous les titres et leur index
//         for (let [key, value] of Object.entries(obj)) {
//             // console.log(`${key}: ${value}`);
//             //cible juste l'index
//             let justKey = `${key}`;
//             // let justValue = `${value}`;
//             // console.log(justKey);
//             //numérote le nouveau titre avec l'index disponible directement supérieur
//             num = parseInt(justKey) + 1;
//         }
//         //ici on a tabContenu qui contient (index + input) * 4  
//         console.log('index + input :' + retrievedObject); //= tabContenu dans storage
//     }

    // Ex de request POST :
    // var request = new XMLHttpRequest();
    // request.open("POST", "http://url-service-web.com/api/users");
    // request.setRequestHeader("Content-Type", "application/json");
    // request.send(JSON.stringify(jsonBody));
    
    // N'oubliez pas d'annuler le comportement par défaut de la soumission du formulaire, sinon votre page va se recharger

//     //? ne fonctionne pas au 2e click, si on clique d'abord sur bio puis détails
// $("#albertCardBio").click(function() {
//     //changer d'onglet
//     $('#albertCardPerso').attr('class', 'nav-link');
//     $('#albertCardBio').attr('class', 'nav-link active');
//     $('#albertCardDetail').attr('class', 'nav-link');
//     //changer le contenu de l'onglet
//     $('#albertCardTitre').replaceWith("<p><strong>Biographie : </strong></p>");
//     $('#albertCardText').replaceWith("<p>Je suis un texte biographique</p>");  
// });

// $("#albertCardPerso").click(function() {
//     $('#albertCardPerso').attr('class', 'nav-link active');
//     $('#albertCardBio').attr('class', 'nav-link');
//     $('#albertCardDetail').attr('class', 'nav-link');
//      //changer le contenu de l'onglet
//      $('#albertCardTitre').replaceWith("<p><strong>Biographie : </strong></p>");
//      $('#albertCardText').replaceWith("<p>Comment revenir au truc de base ?</p>");
// });
// $("#albertCardDetail").click(function() {
//     // $('albertCardPerso').replaceWith("<div id='choix'>Durée choisie : </div>")
//     $('#albertCardPerso').attr('class', 'nav-link');
//     $('#albertCardBio').attr('class', 'nav-link');
//     $('#albertCardDetail').attr('class', 'nav-link active');
//      //changer le contenu de l'onglet
//      $('#albertCardTitre').replaceWith("<p><strong>Détails : </strong></p>");
//      $('#albertCardText').replaceWith("<p>Je suis un texte de détails produits</p>");
// });

