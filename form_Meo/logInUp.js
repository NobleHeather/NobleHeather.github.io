//* IDENTIFICATION

    //* DECO

    //* Quand on clique sur un bouton, ça replie la div de l'autre bouton
$('.loginBtn').on('click', function() {
    $('#logup').removeClass('show');
})   

$('.logupBtn').on('click', function() {
    $('#login').removeClass('show');
})   

    //* ACTION : UTILISATEURS
    // localStorage.setItem("pseudo", JSON.stringify(''));
let pseudo = JSON.parse(localStorage.getItem("pseudo"))
console.log(pseudo);
// localStorage.removeItem('progression');
//* Update affichage progression
function UpdateProgression(progression) {

    //* Si la fonction a été lancée avec sans argument
    console.log(progression);
    if (!progression) {        
        progression = JSON.parse(localStorage.getItem("progression"));
        console.log(progression);
    }
    // progression = Math.round(progression * 10 / 7);
    console.log((progression/7).toFixed(2));
    //* On divise par le nombre total de Q + toFixed pour choisir nb de chiffre après la virgule
    progression = (progression/7).toFixed(2)

    //* On met à jour la barre
    let barre = document.querySelector('#barre');
    barre.style.transform = `scale(${progression}, 1)`;

    //* On met à jour le texte
    progression = Math.round(progression*100);
    let progParaf = document.querySelectorAll('.perso > p');
    progParaf[1].textContent = `Votre progression : ${progression}%`;
}

function SayHello(pseudo) {

    //* Si la fonction a été lancée sans argument (au chargement de la page)
    //* Si pas de pseudo enregistré, pseudo = ''
    if (!pseudo) {
        let pseudo = JSON.parse(localStorage.getItem("pseudo"));
        console.log(pseudo);
    }

    //* Si la fonction a été lancée avec arg ou que pseudo dans local storage :
    //* On affiche pseudo et progression
    if (pseudo) {
        let persoDiv = document.querySelector('.perso');
        persoDiv.style.opacity = '1';
    
        let persoParaf = persoDiv.querySelectorAll('p');
        persoParaf[0].textContent = `Bienvenue, ${pseudo}`;
        // persoParaf[1].textContent = `Votre progression : ${'110'}%`;
    
        UpdateProgression();
    }  

}
SayHello(pseudo);

////Save User in local storage
function LocalStoreUser(id, pseudo) {

    //// On enregistre l'id de l'utilisateur
    // localStorage.setItem("id", JSON.stringify(id));
    localStorage.setItem("pseudo", JSON.stringify(pseudo));
    
    //// Après 1h, efface l'utilisateur de local storage
    setTimeout(function() {
        localStorage.setItem("pseudo", JSON.stringify(''));
    }, 60000)

    //* Salutation personnalisées
    SayHello(pseudo);
}

    //* login

//* Envoie infos connexion à DB
const PostLogin = async function(userInfo) {

    // fetch(`${thisUrl}/api/user/login`, {
    fetch('http://localhost:3000/api/user/login', {
    // fetch('https://aphantasique-form.herokuapp.com/api/user/login', {
        method: "POST",
        // mode: 'no-cors',
        headers : {
            'Accept' : 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify(userInfo)
    })
    .then(response => response.json())
    .then(json => {
        console.log('Réponse de la DB (connexion): ', json);
        LocalStoreUser(json.userId, json.pseudo);
    })
    .catch((e) => {
        console.log(e);
    })
}

//* captation info connexion
$('#WelcomeBack').on('click', function(e) {
    e.preventDefault();
    // $('#email').css('opacity', '0');
    // console.log($('#email').val());
    let userInfo = {
        pseudo : $('#pseudoIn').val(),
        password : $('#passwordIn').val()
    }
    console.log('Connexion utilisateur déjà inscrit : ', userInfo);
    
    PostLogin(userInfo);
    
});

    //* logup
    
//* Envoie info inscription à DB
const PostNewUser = async function(userInfo) {
    // fetch(`${thisUrl}/api/user/logup`, {
    fetch('http://localhost:3000/api/user/logup', {
    // fetch('https://aphantasique-form.herokuapp.com/api/user/logup', {
        method: "POST",
        // mode: 'no-cors',
        headers : {
            'Accept' : 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify(userInfo)
    })
    .then(response => response.json())
    .then(json => {
        console.log('Réponse de la DB (inscription): ', json);
        //* On renvoie sur fonction login pour connexion automatique après inscription
        PostLogin(json.user);
    })
    .catch((e) => {
        console.log(e);
    })
}

//* captation info inscription
//! réactualise la page ??
$('#WhoAreYou').on('click', function(e) {
    e.preventDefault();
    // $('#email').css('opacity', '0');
    // console.log($('#email').val());
    let userInfo = {
        pseudo : $('#pseudoUp').val(),
        mail : $('#email').val(),
        password : $('#passwordUp').val()
    }

    console.log('Inscription utilisateur : ', userInfo);
    
    PostNewUser(userInfo);  
});