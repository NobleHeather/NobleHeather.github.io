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
    // if (progression == '' || progression == undefined) {        
    //     // progression = JSON.parse(localStorage.getItem("progression"));
    //     // progression = userInfo.progression
    //     // console.log('%cvar progression au retour de local storage :', vrb, progression);
    //     console.log('%c var progression manquante ', pbLog);
    // }
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

function SayHello(userInfo) {
    console.log('%c SAY HELLO ', fct);
    console.log('%cAffiche le pseudo et la barre de progression', exp)

    console.log('%cvar userInfo :', vrb, userInfo);
    
    
    // //* Si fonction lancée sans arg
    // if (pseudo == undefined) {
    //     console.log('IF pseudo undefined')
    //     let pseudo = JSON.parse(localStorage.getItem("pseudo")) || '';
    //     console.log('%cvar pseudo', vrb, 'au retour de local storage :', pseudo);  
    //     //* Si il y a pas de pseudo dans local storage (1ère connexion)
    //     if (!pseudo) {
    //         console.log('IF pas de pseudo dans local storage');
    //     //* S'il y a un pseudo dans local storage (reconnexion)
    //     } else {
        
    //         console.log('ELSE affiche le pseudo');
    //         let persoDiv = document.querySelector('.perso');
    //         persoDiv.style.opacity = '1';
    
    //         let persoParaf = persoDiv.querySelectorAll('p');
    //         persoParaf[0].textContent = `Bienvenue, ${pseudo}`;
    //         // persoParaf[1].textContent = `Votre progression : ${'110'}%`;
    
    //         let QInfoTab = SetUserObj(pseudo);
    //         console.log(QInfoTab);
    //         UpdateProgression(QInfoTab.progression);
    //         DisableAnsweredQuestions(QInfoTab.disableTab);
    //         transparent.style.display = 'none';   
    //     }
    // //* Si fonction lancée avec argument   
    // } else {
        // console.log('fonction lancée avec pseudo en arg, affiche le pseudo');
        let persoDiv = document.querySelector('.perso');
        let persoParaf = persoDiv.querySelectorAll('p');

    if (userInfo != 'logout') {
        console.log('IF != logout : on affiche')

        // if (userInfo == '') { //? dans quel cas ?
        //     console.log('IF userInfo vide');
        //     persoDiv.style.opacity = '0';
        //     transparent.style.display = 'block';   
        // } else {
        persoDiv.style.opacity = '1';
        persoParaf[0].textContent = `Bienvenue, ${userInfo.pseudo}`;
        // persoParaf[1].textContent = `Votre progression : ${'110'}%`;

        // let QInfoTab = SetUserObj(pseudo);
        UpdateProgression(userInfo.progression);
        DisableAnsweredQuestions(userInfo.disableTab);
        transparent.style.display = 'none';   

    } else {
        console.log('ELSE logout');
        persoDiv.style.opacity = '0';
        transparent.style.display = 'block';
        document.location = 'form.html'

        // let logDiv = document.querySelector('.log');
        // logDiv.style.display = 'flex';
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

    let logDiv = document.querySelector('.log');
    logDiv.setAttribute('class', 'log row align-items-end mt-3 mb-4')
    logDiv.style.display = 'none';

    let userInfo = SetUserObj(pseudo);
    setTimeout(function() {

        console.log('%cvar userInfo', vrb);
        localStorage.setItem("userInfoLog", JSON.stringify(userInfo));

        SayHello(userInfo);
        

    }, 300);
    //// On enregistre l'id de l'utilisateur
    // localStorage.setItem("id", JSON.stringify(id));
    
    //// Après 1h, efface l'utilisateur de local storage
    //? ça fonctionne ça ? voir plutôt token
    setTimeout(function() {
        console.log('SET TIMEOUT efface pseudo de local storage')
        localStorage.setItem("pseudo", JSON.stringify(''));
    }, 3600000)

    // //* On affiche questionnaire une fois que l'utilisateur est identifié
    // transparent.style.display = 'none';
    //* Salutation personnalisées
    
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

    //* Si on vient de PostNewUser, on replie div inscription
    $('#logup').removeClass('show');

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

//* logout
let logout = document.querySelector('.perso > a');
logout.addEventListener('click', function() {
    console.log('%c btn logout', btn);
    console.log('%cVide le local storage du pseudo', exp);

    localStorage.removeItem('userInfoLog');
    SayHello('logout');
    // let persoDiv = document.querySelector('.perso');
    // persoDiv.style.opacity = '0';
    // transparent.style.display = 'block';

    // console.log(pseudo);

});


// setTimeout(function() {
    // let tab = [{pseudo : 'x', questionTab : [1, 2, 3], prog : 'progression', disableTab : [4, 5, 6]}, {pseudo : 'y', tab : [4, 5, 6]}];
    // console.log('%cICI', test, tab);
    // let pseudoTest = tab.filter(tab => {return tab.pseudo == 'x'})
    // console.log(pseudoTest);
    // console.log(pseudoTest[0].questionTab);
    // // let tab2 = []
    // // console.log(tab2);
    // // let intermTab = pseudoTest.questionTab;
    // // intermTab.push(4);
    // pseudoTest[0].questionTab.push(4);
    // // pseudoTest.questionTab = intermTab;
    // console.log(pseudoTest);
    
// }, 3000)

//* Récupère le tableau de questions répondues de l'utilisateur
//* parmi les tableaux de questions répondues de tous les utilisateurs du même local storage
function SetUserObj(pseudo) {
    // let userInfo;

    // si au démarrage, si reconnexion, si update
    console.log('%c SET USER OBJ ', fctw);
    console.log('%cRécupère userInfo dans storage : questions répondues de l\'utilisateur, progression', exp);

    console.log('%cvar pseudo', vrb, pseudo);

    //* fonction lancée sans arg
    if (!pseudo) {
        console.log('IF pas de pseudo')
        //* On vérifie si il y a déjà des utilisateurs dans la table de tous les utilisateurs de cet ordi
        let userObjAll = JSON.parse(localStorage.getItem("userObjAll")) || [];
        console.log('%cvar userObjAll', vrb, userObjAll);
        //* Si quelqu'un s'est déjà connecté sur cet ordi (il y a qqchose dans la table des utilisateurs locaux)
        if (userObjAll.length != 0) {
            console.log('IF userObjAll n\'est pas vide');
            //* On vérifie si c'est notre utilisateur
            let userInfo = userObjAll.filter(obj => {return obj.pseudo == pseudo});
            console.log('%cvar userInfo', vrb, userInfo);
            //* Si oui, on le retourne
            if (userInfo) {
                console.log('IF l\'utilisateur est dans le tableau des utilisateurs locaux');
                return userInfo;
            //* Si non, on arrête là en attendant qu'il s'inscrive
            } else {
                console.log('ELSE pas ce pseudo dans le tableau des utilisateurs locaux');
                // userInfo = {pseudo : 'pseudo', questionTab : [], progression : 0, disableTab : []};
            }
        //* Si il n'y a pas de userInfo dans le tableau de tous les utilisateurs de cet ordi
        } else {
            console.log('ELSE le tableau des utilisateurs locaux est vide');
        }
    //* Si fonction lancée avec pseudo
    } else {
        console.log('ELSE on a un pseudo')
        //* On vérifie s'il y a des utilisateurs est dans la table des utilisateur locaux
        let userObjAll = JSON.parse(localStorage.getItem("userObjAll")) || [];
        console.log('%cvar userObjAll', vrb, userObjAll);
        //* S'il y a des utilisateurs, on vérifie s'il y a l'utilisateur courant
        if (userObjAll.length != 0) {
            console.log('IF tableau des utilisateur locaux n\'est pas vide')
            //* Si oui, on récup ses infos, si non on initialise à vide
            let userInfo = userObjAll.filter(obj => {return obj.pseudo == pseudo})
            console.log(userInfo);
            if (userInfo.length == 0) {
                console.log('IF utilisateur pas dans le tableau');
                userInfo = {pseudo : pseudo, questionTab : [], progression : 0, disableTab : []};
                return userInfo;
            } else {
                console.log('ELSE utilisateur dans le tableau')
                console.log('%cvar userInfo', vrb, userInfo);
                return userInfo[0];
            }
        //* S'il n'y a pas d'utilisateur locaux, on initialise à vide
        } else {
            console.log('ELSE : pas d\'utilisateurs locaux, userInfo initialisé vide, avec pseudo');
            let userInfo = {pseudo : pseudo, questionTab : [], progression : 0, disableTab : []};
            console.log('%cvar userInfo', vrb, userInfo);
            return userInfo;
        }
    }
}

//* En dernier car si local storage vide, erreur parse anonymous
console.warn('Si pas de pseudo dans local storage, err [parse anonymous]')
// let userInfo = JSON.parse(localStorage.getItem("pseudo"))
let userInfo = JSON.parse(localStorage.getItem("UserInfoLog"))
// let userInfo = SetUserObj(UserInfoLog);
setTimeout(() => {
    console.log('Au lancement de la page ' + '%cuserInfo :', vrb, UserInfo);
    
    if (userInfo) {
        SayHello(userInfo);
    }

}, 300);
// let userInfo = SetQuestionTab(pseudo);
// console.log(userInfo);



