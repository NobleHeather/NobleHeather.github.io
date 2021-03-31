//* MDP
//  localStorage.removeItem('pass');

// create needed constants
const titrePass = document.getElementById('titrePass');
const formMDP = document.getElementById('MotDePasse');

const choisir = document.querySelector('.choisir');
const passInput = document.querySelector('#enterpass');

const choisirMail = document.querySelector('.choisirmail');
const mailInput = document.querySelector('#entermail');

const submit = document.querySelector('#submit');

// const afficheMail = document.getElementById('afficheMail');
// const reinitialiser = document.querySelector('.reinitialiser');
// const forgetPass = document.querySelector('#forgetpass');
// const titreInterface = document.getElementById('titreInterface');
// const personalGreeting = document.querySelector('.personal-greeting');

////Déco :
//!fonctionne pas bien : ça met le message custom mais aussi le message par défaut
mailInput.addEventListener("keyup", function (event) {
  if(mailInput.validity.typeMismatch) {
    mailInput.setCustomValidity("Si tu veux pas de spams tu peux aussi mettre le mien");
  } else {
    mailInput.setCustomValidity("");
  }
});
//!fonctionne pas
passInput.addEventListener("keyup", function (event) {
    if(passInput.validity.typeMismatch) {
      passInput.setCustomValidity("C'est pas la peine de mettre 115 symboles compliqués");
    } else {
      passInput.setCustomValidity("");
    }
  });

////Fonctions qui font réellement quelque chose :
// Stop the form from submitting when a button is pressed
formMDP.addEventListener('submit', function(e) {
    e.preventDefault();
});

// run function when the 'choisir' button is clicked
submit.addEventListener('click', function() {
    // store the entered name in web storage
    localStorage.setItem('pass', passInput.value);
    localStorage.setItem('mail', mailInput.value);
    // run nameDisplayCheck() to sort out displaying the personalised greetings and updating the form display
    DisplayCheck();
    //   mailDisplayCheck();
});

console.log('pass : ' +localStorage.getItem('pass'));
console.log('mail : ' + localStorage.getItem('mail'));


// define the nameDisplayCheck() function
function DisplayCheck() {
  // check whether the 'name' data item is stored in web Storage
  if(localStorage.getItem('pass') && localStorage.getItem('mail')) {
    // If it is, display personalized greeting
    let pass = localStorage.getItem('pass');
    titrePass.textContent = 'Mot de passe choisi, ne l\'oubliez pas !';
    let mail = localStorage.getItem('mail');
    // afficheMail.textContent = mail;
    // personalGreeting.textContent = 'Prêt à commencer, ' + name + '?';
    // hide the 'remember' part of the form and show the 'forget' part
    // reinitialiser.style.display = 'block';
    choisir.style.display = 'none';
    choisirMail.style.display = 'none';
    //! bloquer vers reset
    // resetMDP.style.display = 'block';
    // changePass.style.display = 'block';
    console.log('pass : ' + passInput.value);
    console.log('mail : ' + mailInput.value);
    // console.log(mail);
} else {
    // if not, display generic greeting
    titrePass.textContent = 'Bienvenue sur la page d\'accès à l\'interface, veuillez définir votre mot de passe';
    // personalGreeting.textContent = 'Prêt à commencer, illustre inconnu·e ?';
    // hide the 'forget' part of the form and show the 'remember' part
    // reinitialiser.style.display = 'none';
    choisir.style.display = 'block';
    choisirMail.style.display = 'block';
    // resetMDP.style.display = 'none';
    // changePass.style.display = 'none';
  }
}

//! TOUTE CETTE PARTIE NE FONCTIONNE PAS
// mailPass.addEventListener('click', function() {

//si on clique sur renvoyer un mail, renvoie un mail via plateforme mandrillapp
//! fonctionne pas
// $('#mailPass').click(function() {
//     $.ajax({
//         type: "POST",
//         url: "https://mandrillapp.com/api/1.0/messages/send.json",
//         data: {
//           'key': '9e04fc730c7f4ddef3a94877dbf009b2-us1',
//           'message': {
//             'from_email': 'morgane_felloni@hotmail.fr',
//             'to': [
//                 {
//                   'email': mailInput,                 //‘RECIPIENT_NO_1@EMAIL.HERE’,
//                   'name': 'nameInput', //! pas défini dans ce script
//                   'type': 'to'
//                 }
//               ],
//             'autotext': 'true',
//             'subject': 'Mot de passe oublié',
//             'html': '<h1>Votre mot de passe est : </h1>' + passInput
//           }
//         }
//        }).done(function(response) {
//          console.log(response); // if you're into that sorta thing
//        });
//     console.log('cliqué');
// });
//!JUSQUE ICI

// run nameDisplayCheck() when the DOM first loads to check wether a personal name was previously
// set, and if so display the personalized greeting. If not, show the generic greeting
document.body.onload = DisplayCheck;