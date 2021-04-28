let passDiv = document.getElementById('motDePasse');
let passInput = document.getElementById('enterpass');
let btnInput = document.getElementById('submitpass');

let blogPage = document.getElementById('wrapper');

//* Si on valide le mot de passe avec entrer
passInput.addEventListener('keydown', function(e) {
    // e.preventDefault();
    if (e.key == 'Enter') {
        console.log('KEYUP PASS');
        let pass = passInput.value;
        console.log(pass);

        // PostPass(pass);
        ComparePass(pass);
    }
});

//! deprecated
// passInput.addEventListener('keyup', function(e) {
//     e.preventDefault();
//     heatherPassClear();

//     if (e.keyCode === 13) {
//         console.log('KEYUP PASS');
//         let pass = passInput.value;
//         console.log(pass);

//         // PostPass(pass);
//         ComparePass(pass);
//     }
// });

//* Si on valide le mot de passe en cliquant sur le bouton
btnInput.addEventListener('click', function(e) {
    e.preventDefault();
    heatherPassClear();

    let pass = passInput.value;
    console.log(pass);

    // PostPass(pass);
    ComparePass(pass);
});

//? A faire une fois pour enregistrer MDP puis désactiver
const PostPass = async function(pass) {

    let req = {
        name: 'Usertemp',
        password: pass
    };

    // fetch('http://localhost:3000/api/pass', {
    fetch('https://site-francois.herokuapp.com/api/pass', {
        method: "POST",
        headers : {
            'Accept' : 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify(req)
    })
    .then(response => response.json())
    .then(json => {
        console.log(json);

    })
    .catch((e) => {
        console.log(e);
    })
}

//* Vérifie le mot de passe
const ComparePass = async function(pass) {

    let req = {
        // name: 'Dad', //! a remettre ensuite !
        name : 'Usertemp',
        password: pass
    };

    //* ce truc ok, renvoie 'token'
    // fetch('http://localhost:3000/api/pass/checkpass', {
    fetch('https://site-francois.herokuapp.com/api/pass/checkpass', {
        method: "POST",
        headers : {
            'Accept' : 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify(req)
    })
    .then(response => {
        response.json();
        if(response.ok) {
            EnterBlog();
        } else {
            console.log('response not ok');
            HeatherHelpPass(response);
        }
    })
    .catch((e) => {
        console.log(e);
    })
}

function EnterBlog() {
    passDiv.style.display = "none";
    blogPage.style.display = "block";
}

//! TEMPORAIRE
// function StoragePass(x) {
//     let pass = 31031951;
//     localStorage.setItem("pass", JSON.stringify(x));
// }
// let pass = JSON.parse(localStorage.getItem("pass"));

// //? impossible d'effacer ces putains de mots de pass, que se passe-t-il ???
// //! temporaire
// const fetchFiche = async function() {
//     return await fetch('http://localhost:3000/api/pass')
//     .then(response => response.json())
//     .then(json => {
//         console.log(json);
//         // console.log(json[2]._id);
//         // let x = json[2]._id;
//         // deleteFiche(x);
//     })
//     .catch((e) => console.log(e))
// }
// fetchFiche();

// function deleteArticle() {
//     // let x = 6086ffc1bc7b7b149cbe8153;
//     let thisUrl = `http://localhost:3000/api/pass/6087c1364a9ea33370522be7`;
//     console.log(thisUrl);
//     fetch(thisUrl, {
//         method: "DELETE"
//     })
//     .then(response => response.json())
//     .then(json => console.log(json));
// }
// deleteArticle();

//!