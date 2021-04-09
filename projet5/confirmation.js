//? comment passer les variables ici depuis formulaires_V2.js ?

let infosConfirmation = JSON.parse(localStorage.getItem("infosConfirmation"));
console.log(infosConfirmation);

//* TEMPORAIRE
// let total = infosConfirmation[1];
// let nombre = infosConfirmation[0];
let response_contact = infosConfirmation[3];
console.log(infosConfirmation[3].firstName);
console.log(response_contact);
console.log(response_contact.firstName);
// response_contact.firstName = "Jeanne";
// response_contact.lastName = "Doe";
// response_contact.address = "-25 rue de l'au-delà";
// response_contact.city = "Ailleurs"
let response_orderId = infosConfirmation[2]
//* TEMPORAIRE FIN


let messageDiv = document.getElementById('message');

let p = messageDiv.querySelectorAll('p');
let resume = p[1];
let prix = p[2];
let adresse = p[4];

let span = messageDiv.querySelectorAll('span');
let nom = span[0];
let numCommande = span[1];

// let NumNom = [];
// for (let i = 0; i < choixNounoursTab.length; i++) {
//     NumNom.push(' ' + choixNounoursTab[i][1] + ' ' + choixNounoursTab[i][3]); // 1 Garfunkel
// }
if (infosConfirmation[1] > 1) {
    resume.innerHTML = `${infosConfirmation[0]} nounours feront bientôt partie de votre famille !`; 
} else {
    resume.innerHTML = `${infosConfirmation[0]} fera bientôt partie de votre famille !`;
}

prix.innerHTML = `Pour seulement ${infosConfirmation[1]}€ !`;

nom.innerHTML = `Cher/Chère client·e ${infosConfirmation[3].firstName} ${infosConfirmation[3].lastName}`;
numCommande.innerHTML = `${infosConfirmation[2]}`; 
adresse.innerHTML = `${infosConfirmation[3].address}, ${infosConfirmation[3].city}`;

localStorage.clear();


