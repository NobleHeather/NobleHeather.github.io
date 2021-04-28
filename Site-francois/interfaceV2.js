// localStorage.clear();

const FetchArticles = async function() {
    // return await fetch('http://localhost:3000/api/article')
    return await fetch('https://site-francois.herokuapp.com/api/article')
    .then(response => response.json())
    .then(json => {
        console.log(json);
        DisplayBlog(json);
    })
    .catch((e) => console.log(e))
}
FetchArticles();

//on récupère la page du blog et on crée une structure vide
let wrapperBlog = document.getElementById("wrapperBlog"); //* ensemble de la page

const DeleteArticle = async function(articleId) {
    console.log('DELETE ARTICLE');

    console.log(articleId);
    // let thisUrl = `http://localhost:3000/api/article/${articleId}`;
    let thisUrl = `https://site-francois.herokuapp.com/api/article/${articleId}`;
    console.log(thisUrl);
    fetch(thisUrl, {
        method: "DELETE"
    })
    .then(response => response.json())
    .then(json => {
        console.log(json);
    })
    .catch((e) => console.log(e))
}

function ModifyArticle(article) {

    console.log('MODIFIER ARTICLE');
    ModifierBrouillon(article);

}

function DisplayBlog(json) {
    console.log(json);

    for (let i = 0; i < json.length; i++) {
        let newArticle = document.createElement("div");

        let date;
        if (json[i].date != null) {
            date = json[i].date.split('T');
            date = date[0];
        } else {
            date = '';
        }

        newArticle.innerHTML = 
        `<h2><span>!</span>${json[i].title}<span>x</span></h2><div><p><strong>Résumé : </strong>${json[i].resume}</p></div><p>${json[i].body}</p><p>${date}</p>`;
        
        let p = newArticle.querySelectorAll('p');
        p[0].setAttribute('class', 'col-8 m-auto text-center mt-2 mb-3');
        p[2].setAttribute('class', 'text-right');

        let h2 = newArticle.querySelector('h2');
        h2.setAttribute('class', 'd-flex justify-content-between align-item-center');
        let spans = newArticle.querySelectorAll('span');
        spans[1].setAttribute('class', 'badge badge--red rounded-pill justify-self-end bg-danger text-white');
        spans[0].setAttribute('class', 'badge rounded-pill justify-self-end bg-primary text-white');

        spans[1].addEventListener('click', function() {
            wrapperBlog.removeChild(newArticle);
            DeleteArticle(json[i]._id);
        });

        spans[0].addEventListener('click', function() {
            wrapperBlog.removeChild(newArticle);
            blogDiv.scrollIntoView();
            ModifyArticle(json[i]);
            DeleteArticle(json[i]._id);
        });

        wrapperBlog.appendChild(newArticle);
    }
}





//dans blog, on récupère les éléments de la structure
let wrapperInterface = document.getElementById('wrapperInterface');
let creation = document.getElementById('creation');
let otherArticle = document.getElementById('otherArticle');

// let titles = newArticle.getElementsByTagName("h2");
// let title = titles[0];
// let paragraphes = newArticle.getElementsByTagName("p");
// let resumeTitre = paragraphes[0]; //? ça sert à rien ça concrètement
// let resume = paragraphes[1];
// let article = paragraphes[2];
// let date = paragraphes[3];

//dans interface, on récupère les éléments à remplir
// let inputs = document.getElementsByTagName("input");
// inputs.style.opacity = 0;
let titleInput = document.getElementById('titreInput');
// titleInput.style.opacity = 0;
let resumeInput = document.getElementById('resumeInput');
// resumeInput.style.opacity = 0;
let dateInput = document.getElementById('dateInput');
//* par défaut on initialise à la date du jour
dateInput.valueAsDate = new Date();
// dateInput.style.opacity = 0;
let articleInput = document.getElementById('articleInput');
// articleInput.style.opacity = 0;

//* Ajoute une balise br quand l'utilisateur appuie sur entrée dans le text area
//! deprecated
// articleInput.addEventListener('keyup', function(e) {
//     if (e.keyCode === 13) {
//         console.log('KEYUP');
//         // let br = document.createElement('<br/>');
//         articleInput.value = `${articleInput.value}<br />`;
//     }

// })


//* boutons
let enregistrerArticle = document.getElementById("enregistrerArticle");
let publierArticle = document.getElementById("publierArticle");
let modifierArticle = document.getElementById('modifierArticle');


let visualisationDiv = document.querySelector('.visualisation');
let blogDiv = document.querySelector('.blog');

publierArticle.style.display = "none";
modifierArticle.style.display = 'none';

function SaveArticle() {
    console.log('SAVE ARTICLE');

    //* on réinitialise Heather
    heatherBlogDiv.style.opacity = '0';
    heatherBlogText.innerHTML = '';

    heatherDivZero.style.opacity = '1';
    let newIndex = Math.floor(Math.random() * (heatherTab[4].length));
    heatherTitreTxt.innerHTML = heatherTab[4][newIndex];

    let article = {
        title : titleInput.value,
        resume : resumeInput.value,
        body : articleInput.value,
        date : dateInput.value,
        idDate : Date.now()
    }
    console.log(article);

    modifierArticle.style.display = 'block';

    localStorage.setItem("article", JSON.stringify(article));
    return article;
}

function AfficheBrouillon(article) {
    console.log('AFFICHE BROUILLON');

    visualisationDiv.innerHTML = '';
    let newArticle = document.createElement("div");

    newArticle.setAttribute('class', 'border border-primary p-5 mt-5');
    newArticle.innerHTML = 
    `<h2>${article.title}</h2><div><p><strong>Résumé : </strong>${article.resume}</p></div><p>${article.body}</p><p>${article.date}</p>`;
    // console.log(newArticle);

    //on ajoute structure à la fin
    visualisationDiv.appendChild(newArticle);

    visualisationDiv.style.display = "block";
    blogDiv.style.display = "none";

    visualisationDiv.scrollIntoView();

    return newArticle;
}

function ModifierBrouillon(x) {

    console.log('MODIFIER BROUILLON');

    wrapperInterface.scrollIntoView();

    blogDiv.style.display = "block";
    visualisationDiv.style.display = "none";
    visualisationDiv.innerHTML = '';
    
    publierArticle.style.display = 'none';
    modifierArticle.style.display = 'none';
    enregistrerArticle.style.display = 'block';

    let inputs = blogDiv.querySelectorAll('input');
    let body = blogDiv.querySelector('textarea');

    let article;
    if (x != null) {
        article = x;
    } else {
        article = JSON.parse(localStorage.getItem("article"));
    }

    inputs[0].setAttribute('value', `${article.title}`);
    inputs[1].setAttribute('value', `${article.resume}`);
    inputs[2].setAttribute('value', `${article.date}`);
    body.setAttribute('value', `${article.body}`);

}

function FormateArticle(articleDiv) {

    console.log('FORMATE ARTICLE');
    
    console.log(articleDiv);
    articleDiv.setAttribute('class', 'mt-3');
    let p = articleDiv.querySelectorAll('p');
    p[0].setAttribute('class', 'col-8 m-auto text-center mt-2 mb-3');
    p[2].setAttribute('class', 'text-right');
}

function DisplayArticle() {

    console.log('DISPLAY ARTICLE');

    let article = JSON.parse(localStorage.getItem("article"));
    console.log(article);
    PostArticle(article);
    
    let articleDiv = AfficheBrouillon(article);
    visualisationDiv.style.display = "none";
    FormateArticle(articleDiv);
    wrapperBlog.appendChild(articleDiv);


}

const PostArticle = async function(article) {

    // fetch('http://localhost:3000/api/article', {
    fetch('https://site-francois.herokuapp.com/api/article', {
        method: "POST",
        headers : {
            'Accept' : 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify(article)
    })
    .then(response => response.json())
    .then(json => {
        console.log(json);

    })
    .catch((e) => {
        console.log(e);
    })
}

function ClearForm() {
    titleInput.value = '';
    resumeInput.value = '';
    articleInput.value = '';

    enregistrerArticle.style.display = 'block';
    publierArticle.style.display = 'none';
    modifierArticle.style.display = 'none';

    heatherBlogText.innerHTML = `C'est publié${name} ! On en fait un autre ? `;
    heatherBlogDiv.style.opacity = '1';

    heatherDivZero.style.opacity = '0';

    wrapperInterface.scrollIntoView();
}
//! deprecated
// articleInput.addEventListener('keyup', function(e) {
//     e.preventDefault();
//     // heatherPassClear();

//     if (e.keyCode === 13) {
//         console.log('KEYUP BOLD');
//         let pass = passInput.value;
//         console.log(pass);

//         // PostPass(pass);
//         // ComparePass(pass);
//     }
// });
// window.addEventListener("keydown", function(event) {
//     const p = document.createElement("p");
//     p.textContent = `KeyboardEvent: key='${event.key}' | code='${event.code}'`;
//     document.getElementById("output").appendChild(p);
//   }, true);
//   KeyboardEvent: key='*' | code='Backslash'
//   KeyboardEvent: key='Enter' | code='Enter'

articleInput.addEventListener('keydown', function(e) {

    if (e.key == 'Enter') {
        articleInput.value = `${articleInput.value}<br/>`
    } else if (e.key == '+') {
        articleInput.value = `${articleInput.value}<em>`
    } else if (e.key == '=') {
        articleInput.value = `${articleInput.value}</em>`
    } else if (e.key == 'Control') {
        articleInput.value = `${articleInput.value}<strong>`
    } else if (e.key == 'Alt') {
        articleInput.value = `${articleInput.value}</strong>`
    } else if (e.key == '$') {
        articleInput.value = `${articleInput.value}<span>`
    } else if (e.key == '*') {
        articleInput.value = `${articleInput.value}</span>`
    }
})

enregistrerArticle.addEventListener('click', function(e) {
    e.preventDefault();
    //* cf heather.js pour verifForm()
    if (verifForm()) {
        console.log('verif form true');
        //* On échange les boutons
        publierArticle.style.display = "block";
        enregistrerArticle.style.display = "none";

        const article = SaveArticle();
        AfficheBrouillon(article);
    } else {
        console.log(`verif form false`);
    }
});

modifierArticle.addEventListener('click', function(e) {
    e.preventDefault();

    ModifierBrouillon();
});

publierArticle.addEventListener('click', function(e) {
    e.preventDefault();

    DisplayArticle();
    ClearForm();
})







creation.addEventListener('submit', function(e) { //? ça fait quoi ça en fait ?
    e.preventDefault();
    // creation.style.border = '1px solid #000';
});

//cacher le bouton "ajouter un nouvel article"
otherArticle.style.display = 'none';

//*AJOUTER UN NOUVEAU CONTENU DANS LOCAL STORAGE
let tabContenu = []; //tableau avec tous les titres + leurs numéro
let num = 0; //numéro du titre
// let justKey = " ";
//fonction pour ajouter un nouveau titre dans le tableau des titres
function AjouteContenu(key, texte) {
// console.log("clé=" + key + " ,titre=" + title);
//ajoute un objet avec titre + index dans le tableau des titres
let obj = {};
obj[key] = texte;
tabContenu.unshift(obj); //*anciennement push
// stock l'objet dans local storage
localStorage.setItem("newObject", JSON.stringify(tabContenu));
// récupère l'objet depuis local storage
let retrievedObject = localStorage.getItem("newObject");
console.log("retrievedObject: ", retrievedObject);
    //affiche tous les titres et leur index
    for (let [key, value] of Object.entries(obj)) {
        // console.log(`${key}: ${value}`);
        //cible juste l'index
        let justKey = `${key}`;
        // let justValue = `${value}`;
        // console.log(justKey);
        //numérote le nouveau titre avec l'index disponible directement supérieur
        num = parseInt(justKey) + 1;
    }
    //ici on a tabContenu qui contient (index + input) * 4  
    console.log('index + input :' + retrievedObject); //= tabContenu dans storage
}
//!ajouter au début du tableau, mettre dans publication les 4 premiers éléments
let publication = []; //tab pour stocker les articles
// let retrievedPublication = localStorage.getItem("newPublication");
// console.log(retrievedPublication);
let livre = []

localStorage.setItem("publication", JSON.stringify(publication));
var test = JSON.parse(localStorage.getItem("publication"));
// console.log("publication avant boucle" + test);

//quand on clique sur bouton publier un article, fonction se lance
publierArticle.addEventListener('click', function() {
    // let i = 0;
    for (let i = -1; i < publication.length; i++)
    if (publication[i] != null) {//case remplie
        //on avance
        i++;
        console.log('if :' + i);
    } else { //on rempli la case
        let newObject = JSON.parse(localStorage.getItem("newObject"));
        console.log(newObject);
        //! récup tableau, push new Object, renvoie tab
        publication = JSON.parse(localStorage.getItem("publication"));
        console.log(publication);
        for (let [key, value] of Object.entries(newObject)) { //!order not garanteed !
            console.log(`${key}: ${value}`);
            // publication.push()
          }
        console.log(newObject[0]);
        console.log(newObject[1]);
        console.log(newObject[2]);
        console.log(newObject[3]);
        // console.log(ninja.adresse.ville); //récupérer objet dans objet
        // console.log(ninja['adresse']['ville']);//récupérer info (2e version)
        //mettre ici les 4 premiers newObject
        publication.unshift(newObject[0], newObject[1], newObject[2], newObject[3]); 
        console.log(publication);
        //!il faut capter la clé de livre et l'incrémenter avant de renvoyer livre sur local storage
        //!existe un équivalent de push ?
        localStorage.setItem("livre", JSON.stringify(livre)); 
        livre = JSON.parse(localStorage.getItem("livre"));
        livre.push([i, publication]); //* livre contient index + article en entier
        console.log(livre);
        // localStorage.getItem("publication");
        // console.log("i" + i + "publication" + publication);
        i++;
    }


    // AjoutePublication(k, newObject) // '?' doit être l'article. newObject ?

});

// let k = 0;
// function AjoutePublication(index, tab) {

    // console.log('index + input :' + newObject); //= tabContenu dans storage

    // for (k = 0; k < publication.length; k++) {
    //     console.log(k);
    //     if (publication[k] != null) { //case remplie
    //         console.log('if :' + publication);
    //         k++;
    //     } else { //remplir case
    //         //met le tableau contenant l'article en entier dans une case du tableau publication
    //         publication.push(newObject);
    //         console.log(publication);
    //         //! stocker dans storage de manière à avoir :
    //         //! publication[article, article, article]
    //         publication = JSON.stringify(publication); //formater pour storage
    //         localStorage.setItem(k, publication); //dans tableau publications il y a plusieurs publication
    //         publication[k] = JSON.parse(localStorage.getItem(k));
    //         let storedPublications = JSON.parse(localStorage.getItem("publications"));
    //         console.log(storedPublications);
    //         k++;
            
            // var storedNames = JSON.parse(localStorage.getItem("names"));
            // var val = JSON.stringify(data);
            // window.localStorage.setItem(key, val);
            // value = JSON.parse(window.localStorage.getItem(key));
//         }
//     }
    
// }


// AjouteContenu (num, "yo"); 
// AjouteContenu (num, "yoo"); 
//* JUSQUE ICI

////Donc on peut mettre un tableau dans un tableau dans localStorage
let tabTest = ["case1", ["case inception"], "case2"];
localStorage.setItem("tabTest", JSON.stringify(tabTest));
let retTabTest = localStorage.getItem("tabTest");
// console.log(retTabTest);
////fin du test "flemme-de-lire-la-doc"

enregistrerArticle.addEventListener("click", function() {

    //*FONCTIONNE
    // //faire disparaître interface de création
    // wrapperInterface.style.display = 'none'; //?why fonctionne pas ?
    // //changer contenu de paragraphe personnal greeting
    // let name = localStorage.getItem('name');
    // personalGreeting.textContent = 'Un autre article, ' + name + ' ?';
    // //faire apparaitre bouton
    // otherArticle.style.display = 'block';
    //*JUSQUE ICI

    // if (localStorage.getItem('title')) {

    // } else {
    //     console.log('erreur');
    // }

    // let tabPublication = []; //tableau avec tous les titres + leurs numéro
    // let i = 0; //numéro du titre

    //fonction pour ajouter un nouveau titre dans le tableau des titres
    // function AjoutePublication(index, tableau) {
    // // console.log("clé=" + key + " ,titre=" + title);
    // //ajoute un objet avec titre + index dans le tableau des titres
    //     let obj = {};
    //     obj[index] = tableau;
    //     tabPublication.push(obj);
    //     // stock l'objet dans local storage
    //     localStorage.setItem("newTableau", JSON.stringify(tabPublication));
    //     // récupère l'objet depuis local storage
    //     let returnedObject = localStorage.getItem("newTableau");
    //     for (let [key, value] of Object.entries(obj)) {
    //         console.log(`${key}: ${value}`);
    //         //cible juste l'index
    //         let justKey = `${key}`;
    //         i = parseInt(justKey) + 1;
    //     }
    // }

    // AjouteContenu("num", "titleInput.value");
    // AjoutePublication(i, AjouteContenu(num, titleInput.value));

    // let Publication = [];
    // AjouteContenu(num, titleInput.value);
    // let PublicationTitre = 
    // Publication.push[PublicationTitre];

    AjouteContenu(num, titleInput.value);
    AjouteContenu(num, resumeInput.value);
    AjouteContenu(num, articleInput.value);
    AjouteContenu(num, dateInput.value);
    // let thisTitle = AjouteContenu(num, titleInput.value);
    // let thisResume = AjouteContenu(num, resumeInput.value);
    // let thisArticle = AjouteContenu(num, articleInput.value);
    // let thisDate = AjouteContenu(num, dateInput.value);
    // let thisPublication = [];
    // thisPublication.push(thisTitle);
    // thisPublication.push(thisResume);
    // thisPublication.push(thisArticle);
    // thisPublication.push(thisDate);
    // console.log(thisPublication);
    
    // console.log(publication);


    // title.textContent = 
    // AjouteContenu ("2", "yooo"); 


});

otherArticle.addEventListener('click', function() {
    //faire réapparaître interface de création et disparaître bouton
    wrapperInterface.style.display = 'block';
    otherArticle.style.display = 'none';
});



// function updateTexte(textInput, text) {

//     textInput
//     text.textContent
// }
// titleInput.addEventListener ('change', function() {
    
// });

// title.up
// const name = document.getElementById("name");
// const repname = document.getElementById("repname");

// name.addEventListener("change", updateValue);

// function updateValue(e) {
// 	repname.textContent = e.target.value;
// }


