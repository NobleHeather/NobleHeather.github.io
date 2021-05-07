//* IDENTIFICATION

    //* DECO

//* Par défaut, on cache le questionnaire
let transparent = document.getElementById('transparent');
// transparent.style.display = 'none'; //! enlever ensuite

// var styleElem = document.head.appendChild(document.createElement("style"));
// questionnaire.innerHTML = ""
// styleElem.innerHTML = "#SouvenirsVisuels:before {opacity: 0;}";

// questionnaire.style.display = 'none';
    //* Quand on clique sur un bouton, ça replie la div de l'autre bouton
$('.loginBtn').on('click', function() {
    $('#logup').removeClass('show');
})   

$('.logupBtn').on('click', function() {
    $('#login').removeClass('show');
})   

    //* ACTION : UTILISATEURS
// localStorage.clear();
// let pseudo = JSON.parse(localStorage.getItem("pseudo")) || '';
// console.log('pseudo', pseudo);
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

    console.log(pseudo);
    
    //* Si fonction lancée sans arg
    if (pseudo == undefined) {
        let pseudo = JSON.parse(localStorage.getItem("pseudo")) || '';
        console.log('pseudo : ', pseudo);  
        //* Si il y a pas de pseudo dans local storage (1ère connexion)
        if (!pseudo) {
            console.log('pseudo null');
        //* S'il y a un pseudo dans local storage (reconnexion)
        } else {
        
            console.log('allo');
            let persoDiv = document.querySelector('.perso');
            persoDiv.style.opacity = '1';
    
            let persoParaf = persoDiv.querySelectorAll('p');
            persoParaf[0].textContent = `Bienvenue, ${pseudo}`;
            // persoParaf[1].textContent = `Votre progression : ${'110'}%`;
    
            UpdateProgression();
            DisableAnsweredQuestions();
            transparent.style.display = 'none';   
        }
    //* Si fonction lancée avec argument   
    } else {
        console.log('allo');
        let persoDiv = document.querySelector('.perso');
        persoDiv.style.opacity = '1';

        let persoParaf = persoDiv.querySelectorAll('p');
        persoParaf[0].textContent = `Bienvenue, ${pseudo}`;
        // persoParaf[1].textContent = `Votre progression : ${'110'}%`;

        UpdateProgression();
        DisableAnsweredQuestions();
        transparent.style.display = 'none';   
    }
}

// localStorage.clear();
let pseudo = JSON.parse(localStorage.getItem("pseudo"))
console.log(pseudo);
SayHello();
if (JSON.parse(localStorage.getItem("pseudo"))) {
    console.log('allo ?');
    SayHello();
}

////Save User in local storage
function LocalStoreUser(pseudo) {

    console.log(pseudo);
    //// On enregistre l'id de l'utilisateur
    // localStorage.setItem("id", JSON.stringify(id));
    localStorage.setItem("pseudo", JSON.stringify(pseudo));
    
    //// Après 1h, efface l'utilisateur de local storage
    setTimeout(function() {
        localStorage.setItem("pseudo", JSON.stringify(''));
    }, 60000)

    //* On affiche questionnaire une fois que l'utilisateur est identifié
    transparent.style.display = 'none';
    //* Salutation personnalisées
    SayHello(pseudo);
}

let msgErr = document.getElementById('msgErr');
msgErr.style.display = 'none';

//* Au retour de la base de données, on fait un feedback utilisateur
function verifInfo(e) {
    // console.log(e);
    console.log('VERIF INFO');
    if (e.error == 'Utilisateur non trouvé !') {
        console.log('IF');
        msgErr.style.display = 'block';
        msgErr.innerHTML = 'Erreur :<br/>Pas d\'utilisateur à ce nom';
        // $(msgErr).addClass('border border-danger');
        return false;
        
    } else if (e.error == 'Mot de passe incorrect !') {
        msgErr.style.display = 'block';
        msgErr.innerHTML = 'Erreur :<br/>Mot de pass incorrect';
        // $(msgErr).addClass('border border-danger');
        return false;

    // } else if (err 500) { //server
    //* Si tout est ok on vide les champs, on cache la div et on enchaîne
    } else {
        console.log('else');
        msgErr.style.display = 'none';
        msgErr.innerHTML = '';
        $('#pseudoIn').val('')
        $('#passwordIn').val('');
        $('#login').removeClass('show');
        return true;
    }
}

    //* login

//* Envoie infos connexion à DB
const PostLogin = async function(userInfo) {

    // fetch('http://localhost:3000/api/user/login', {
        fetch(`${thisUrl}/api/user/login`, {
        // fetch('https://aphantasique-form.herokuapp.com/api/user/login', {
        method: "POST",
        headers : {
            'Accept' : 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify(userInfo)
    })
    .then(response => response.json())
    .then(json => {
        console.log('Réponse de la DB (connexion): ', json);
        verifInfo(json);
        LocalStoreUser(json.pseudo);
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
    
    // verifInfo(userInfo);
    // $('#login').removeClass('show');
    PostLogin(userInfo);
    
});

    //* logup
    
//* Envoie info inscription à DB
const PostNewUser = async function(userInfo) {
    console.log('allo ??');

    // fetch('http://localhost:3000/api/user/logup', {
        fetch(`${thisUrl}/api/user/logup`, {
        // fetch('https://aphantasique-form.herokuapp.com/api/user/logup', {
        method: "POST",
        headers : {
            'Accept' : 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify(userInfo)
    })
    .then(response => response.json())
    .then(json => {
        console.log('Réponse de la DB (inscription): ', json);
        LocalStoreUser(json.pseudo); 
        // if (response.ok) {
        //     console.log('allo ?');
            //* On renvoie sur fonction login pour connexion automatique après inscription
            PostLogin({password : userInfo.password, pseudo : userInfo.pseudo});
        // }
    })
    .catch((e) => {
        console.log(e);
    })
} 
// let userInfo = {
//     pseudo : 'Test2',
//     password : 'Test2',
//     mail : 'Test2'
// }
// PostNewUser(userInfo);

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
    
    // $('#logup').removeClass('show');
    PostNewUser(userInfo);  
});
