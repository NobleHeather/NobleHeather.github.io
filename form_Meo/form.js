
//* Pour range

function get_tickmarks() {
    // remplacer .replaceWith avec un équivalent de textContent omg - -"
    $("#choix").replaceWith("<small id='choix'>&nbsp; => Choix : </small>");
    let val = document.getElementById("mimique").value;
    console.log("choix = " + val);
    $("#choix").append(`${val}`);
}

//* Identification
    //* Boutons

$('.loginBtn')on('click', function() {
    $('#logup').
})   

$('.logupBtn')on('click', function() {

})   


//* get all users
const fetchFiche = async function() {
    return await fetch('http://localhost:3000/api/fiche')
    // return await fetch('https://memory-piafs.herokuapp.com/api/fiche')
    .then(response => response.json())
    .then(json => {
        console.log(json);
        return json;
    })
    .catch((e) => {
        console.log(e);
        msgAjout.innerHTML = "<strong>Erreur serveur !</strong> (réessayez ultérieurement<br/> ou plaignez-vous à l'<a href=\"mailto:morgane_felloni@hotmail.fr\" class=\"text-danger text-decoration-underline\"><em>informaticien</em></a>)";
    })
}
//* post 1 user
const postFiche = async function(arg) {

    fetch('http://localhost:3000/api/fiche', {
    // fetch('https://memory-piafs.herokuapp.com/api/fiche', {
        method: "POST",
        headers : {
            'Accept' : 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify(arg)
    })
    .then(response => response.json())
    .then(json => {
        console.log(json);
    })
    .catch((e) => {
        console.log(e);
    })
}

const PostNewUser = async function(userInfo) {
    fetch('http://localhost:3000/api/user', {
        method: "POST",
        headers : {
            'Accept' : 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify(userInfo)
    })
    .then(response => response.json())
    .then(json => {
        console.log(json);
    })
    .catch((e) => {
        console.log(e);
    })
}

$('#WhoAreYou').on('click', function(e) {
    e.preventDefault();
    // $('#email').css('opacity', '0');
    // console.log($('#email').val());
    let userInfo = {
        pseudo : $('#pseudo').val(),
        mail : $('#email').val(),
        password : $('#password').val()
    }
    console.log(userInfo);
    
    PostNewUser(userInfo);
    
});