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

    //* login

//* Envoie infos connexion à DB
const PostLogin = async function(userInfo) {

    fetch(`${thisUrl}/api/user/login`, {
    // fetch('http://localhost:3000/api/user/login', {
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
    fetch(`${thisUrl}/api/user/logup`, {
    // fetch('http://localhost:3000/api/user/logup', {
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