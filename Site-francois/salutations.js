//* Mot de passe

// const passInput = document.querySelector('#enterpass');
// const submitPass = document.querySelector('#submitpass');
// const divMDP = document.getElementById('motDePasse');

// submitPass.addEventListener('submit', function(e) {
//     e.preventDefault();
//   });

// submitPass.addEventListener('onclick', function(e) {
//     if (passInput.value == paquito) {
//         divMDP.style.opacity = 0;
//     }
// });

////--------------------------------------------------------------------

//* Salutations personnalisées
// create needed constants
const rememberDiv = document.querySelector('.remember');
const forgetDiv = document.querySelector('.forget');
const form = document.getElementById('greetings');
const nameInput = document.querySelector('#entername');
const submitBtn = document.querySelector('#submitname');
const forgetBtn = document.querySelector('#forgetname');
// const h1 = document.querySelector('h1');
const titreInterface = document.getElementById('titreInterface');
const personalGreeting = document.querySelector('.personal-greeting');

// Stop the form from submitting when a button is pressed
form.addEventListener('submit', function(e) {
  e.preventDefault();
});

// run function when the 'choisir' button is clicked
submitBtn.addEventListener('click', function() {
  // store the entered name in web storage
  localStorage.setItem('name', nameInput.value);
  // run nameDisplayCheck() to sort out displaying the personalised greetings and updating the form display
  nameDisplayCheck();
  personalGreeting.style.opacity = 1;
});

// run function when the 'changer' button is clicked
forgetBtn.addEventListener('click', function() {
  // Remove the stored name from web storage
  localStorage.removeItem('name');
  // run nameDisplayCheck() to sort out displaying the generic greeting again and updating the form display
  nameDisplayCheck();
  personalGreeting.style.opacity = 0;
});

// define the nameDisplayCheck() function
function nameDisplayCheck() {
  // check whether the 'name' data item is stored in web Storage
  if(localStorage.getItem('name')) {
    // If it is, display personalized greeting
    let name = localStorage.getItem('name');
    titreInterface.textContent = 'Bienvenue dans l\'interface, ' + name;
    personalGreeting.textContent = 'Prêt à publier un nouvel article, ' + name + '?';
    // hide the 'remember' part of the form and show the 'forget' part
    forgetDiv.style.display = 'block';
    rememberDiv.style.display = 'none';
} else {
    // if not, display generic greeting
    titreInterface.textContent = 'Bienvenue dans l\'interface, je m\'appelle Heather';
    // personalGreeting.textContent = 'Prêt à commencer, illustre inconnu·e ?';
    // hide the 'forget' part of the form and show the 'remember' part
    forgetDiv.style.display = 'none';
    rememberDiv.style.display = 'block';
    personalGreeting.display = 'none';
  }
}

// run nameDisplayCheck() when the DOM first loads to check wether a personal name was previously
// set, and if so display the personalized greeting. If not, show the generic greeting
document.body.onload = nameDisplayCheck;