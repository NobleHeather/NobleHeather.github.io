//* IDENTIFICATION

    //* DECO

//* Par défaut, on cache le questionnaire
let transparent = document.getElementById('transparent');
// transparent.style.display = 'none'; //! enlever ensuite

let msgErr = document.getElementById('msgErr');
msgErr.style.display = 'none';

    //* Quand on clique sur un bouton, ça replie la div de l'autre bouton
$('.loginBtn').on('click', function(e) {
    console.log('%c btn connexion ', btn);
    $('#logup').removeClass('show');
})   

$('.logupBtn').on('click', function(e) {
    console.log('%c btn inscription ', btn);
    $('#login').removeClass('show');
})   

    //* ACTION : UTILISATEURS

//* Update affichage progression
function UpdateProgression(progression) {
    console.log('%c UPDATE PROGRESSION ', fct);
    console.log('%cRécupère et affiche la barre de progression', exp)

    //* Si la fonction a été lancée sans argument
    console.log('%cvar progression :', vrb, progression);
    if (!progression) {        
        progression = JSON.parse(localStorage.getItem("progression"));
        console.log('%cvar progression au retour de local storage :', vrb, progression);
    }
    // progression = Math.round(progression * 10 / 7);
    // console.log((progression/7).toFixed(2));
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
    console.log('%c SAY HELLO ', fct);
    console.log('%cRécupère et affiche le pseudo', exp)

    console.log('%cvar pseudo :', vrb, pseudo);
    
    //* Si fonction lancée sans arg
    if (pseudo == undefined) {
        console.log('IF pseudo undefined')
        let pseudo = JSON.parse(localStorage.getItem("pseudo")) || '';
        console.log('%cvar pseudo', vrb, 'au retour de local storage :', pseudo);  
        //* Si il y a pas de pseudo dans local storage (1ère connexion)
        if (!pseudo) {
            console.log('IF pas de pseudo dans local storage');
        //* S'il y a un pseudo dans local storage (reconnexion)
        } else {
        
            console.log('ELSE affiche le pseudo');
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
        console.log('ELSE fonction lancée avec pseudo en arg, affiche le pseudo');
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

// if (JSON.parse(localStorage.getItem("pseudo"))) {
    
//     console.log('IF il y a un pseudo dans local storage');
//     SayHello();
// }

////Save User in local storage
function LocalStoreUser(pseudo) {
    console.log('%c LOCAL STORE USER ', fct);
    console.log('%cstock le pseudo dans local storage', exp)

    console.log('%cvar pseudo :', vrb, pseudo);
    //// On enregistre l'id de l'utilisateur
    // localStorage.setItem("id", JSON.stringify(id));
    localStorage.setItem("pseudo", JSON.stringify(pseudo));
    
    //// Après 1h, efface l'utilisateur de local storage
    setTimeout(function() {
        console.log('SET TIMEOUT efface pseudo de local storage')
        localStorage.setItem("pseudo", JSON.stringify(''));
    }, 60000)

    //* On affiche questionnaire une fois que l'utilisateur est identifié
    transparent.style.display = 'none';
    //* Salutation personnalisées
    SayHello(pseudo);
}

//* Au retour de la base de données, on fait un feedback utilisateur
function verifInfo(e) {
    console.log('%c VERIF INFO ', fct);
    console.log('%cverifie les infos du formulaire d\'inscription/connexion', exp)
    // console.log(e);
    if (e.error == 'Utilisateur non trouvé !') {
        console.log('IF utilisateur non trouvé');
        msgErr.style.display = 'block';
        msgErr.innerHTML = 'Erreur :<br/>Pas d\'utilisateur à ce nom';
        // $(msgErr).addClass('border border-danger');
        return false;
        
    } else if (e.error == 'Mot de passe incorrect !') {
        console.log('ELSE IF mot de passe incorrect')
        msgErr.style.display = 'block';
        msgErr.innerHTML = 'Erreur :<br/>Mot de pass incorrect';
        // $(msgErr).addClass('border border-danger');
        return false;

    // } else if (err 500) { //server
    //* Si tout est ok on vide les champs, on cache la div et on enchaîne
    } else {
        console.log('ELSE infos rentrées ok');
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
    console.log('%c POST LOGIN ', fct);
    console.log('%cenvoie les infos LOGIN utilisateur à la base de données', exp);


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
        console.log('%cRéponse de la DB (connexion): ', DB, json);

        if (verifInfo(json)) {
            LocalStoreUser(json.pseudo);
        }
       
    })
    .catch((e) => {
        console.log(e);
    })
}

//* captation info connexion
$('#WelcomeBack').on('click', function(e) {
    console.log('%c btn valider connexion ', btn);

    e.preventDefault();
    // $('#email').css('opacity', '0');
    // console.log($('#email').val());
    let userInfo = {
        pseudo : $('#pseudoIn').val(),
        password : $('#passwordIn').val()
    }
    console.log('Connexion utilisateur déjà inscrit : ', userInfo);

    //* Par défaut les inputs sont en gris, ils restent en gris si cette fonction tourne plusieurs fois
    let inputs = document.querySelectorAll('#login input');
    Array.from(inputs, input => input.style.border = '1px solid #ced4da');

    //* Si un des champs est vide
    if ($('#pseudoIn').val() == '' || $('#passwordIn').val() == '') {
        console.log('IF input vide');
        //* On l'encadre en rouge
        for (let i = 0; i < inputs.length; i++) {

            if (inputs[i].value == '') {
                inputs[i].style.border = '1px solid red';
            }
        }
    //* Sinon on envoie infos à la DB
    } else {
        console.log('ELSE infos rentrées ok')
        PostLogin(userInfo);
    }
    
});

    //* logup
    
//* Envoie info inscription à DB
const PostNewUser = async function(userInfo) {
    console.log('%c POST NEW USER ', fct);
    console.log('%cenvoie les infos LOGUP utilisateur à la DB', exp)


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
        console.log('%cRéponse de la DB (inscription): ', DB, json);
        LocalStoreUser(json.pseudo); 
 
        //* On renvoie sur fonction login pour connexion automatique après inscription
        PostLogin({password : userInfo.password, pseudo : userInfo.pseudo});
       
    })
    .catch((e) => {
        console.log(e);
    })
} 

function verifInput(userInfo) { // arg pas utilisé pour l'instant
    console.log('%c VERIF INPUT ', fct);
    console.log('%cverifie les infos d\'inscription', exp);

    //* Par défaut les inputs sont en gris, ils restent en gris si cette fonction tourne plusieurs fois
    let inputs = document.querySelectorAll('#logup input');
    Array.from(inputs, input => input.style.border = '1px solid #ced4da')

    //* Si un des champs est vide
    if ($('#pseudoUp').val() == '' || $('#email').val() == '' || $('#passwordUp').val() == '') {
        console.log('IF input vide');
        //* On l'encadre en rouge
        for (let i = 0; i < inputs.length; i++) {

            if (inputs[i].value == '') {
                inputs[i].style.border = '1px solid red';
            }
        }
        return false;
    } else {
        return true;
    }
}

//* captation info inscription
$('#WhoAreYou').on('click', function(e) {
    console.log('%c btn valider inscription ', btn);
    e.preventDefault();

    let userInfo = {
        pseudo : $('#pseudoUp').val(),
        mail : $('#email').val(),
        password : $('#passwordUp').val()
    }

    console.log('Inscription utilisateur : ', userInfo);
    
    // console.log(verifInput(userInfo));
    if (verifInput(userInfo)) {
        console.log('IF verif info == true, on envoie infos à la DB')
        PostNewUser(userInfo);  
    }
});

//* En dernier car si local storage vide, erreur parse anonymous
console.warn('Si pas de pseudo dans local storage, err [parse anonymous]')
let pseudo = JSON.parse(localStorage.getItem("pseudo"))
console.log('Au lancement de la page ' + '%cpseudo :', vrb, pseudo);
SayHello();