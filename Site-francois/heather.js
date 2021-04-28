//* PASSWORD

let heatherDivPass = document.querySelector('#motDePasse > div > .heather');
let heatherText = document.querySelector('#motDePasse > div > .heather > p');
let heatherSvg = document.querySelector('#motDePasse > div > .heather > svg');

// !! a remettre
heatherDivPass.style.opacity = '0';
// !!

// !! a supprimer
// let blogPage = document.getElementById('wrapper');
// blogPage.style.display = "block";
// !! a supprimer

function heatherPassClear() {
    heatherDivPass.style.opacity = '0';
    heatherText.innerHTML = 'Cliquez-moi pour avoir de l\'aide';
}

let name = `, ${localStorage.getItem('name')}` || '';
console.log(name);
let heatherTab = [
    `Le serveur dit 401${name}, vous avez dû faire une faute de frappe`,
    `Le serveur dit 500, c\'est lui qui a un problème${name}, revenez plus tard`,
    [
        `Il faut entrer l\'année en entier${name} (pas satisfait ? cliquez encore)`,
        `Vous n\'avez pas oublié votre date de naissance${name}, si ? (pas satisfait ? cliquez encore)`,
        `Il ne faut mettre que des chiffres${name}, pas de \\ ou de - ou de . (pas satisfait ? cliquez encore)`,
        'Sur chrome, Vous pouvez faire : ctrl+maj+i (ctrl+maj+j sur firefox) et regarder dans console le numéro de status à 3 chiffres pour le dire à l\'informaticien (sinon cliquez-moi jusqu\'à avoir une autre réponse)'
    ],
    `Vous n\'avez pas entré votre mot de passe${name}`,
    [
        'Pour écrire un mot en gras, encadrez-le avec &lt;strong> & &lt;/strong> :<br/>je suis un mot en &lt;strong><strong>gras</strong>&lt;/strong>',
        'Pour écrire un mot en italique, encadrez-le avec &lt;em> & &lt;/em> :<br/>je suis un mot en &lt;em><em>italique</em>&lt;/em>',
        'Pour écrire un sous-titre, encadrez-le avec &lt;span> & &lt;/span> :<br/>je suis un &lt;h3><span>sous-titre</span>&lt;/h3>',
        'La date est par défaut le jour même mais il est possible de la modifier',
        `Si j\'étais vous${name}, je garderais une sauvegarde word de mes articles, on n\'est jamais à l\'abri des bugs`,
        '&lt;br/> permet de passer à la ligne, c\'est la seule balise qui ne doit pas être écrite en double',
        `Il y a des raccourcis clavier dans la case article${name} :<br/>italique : +/= <br/>gras : ctrl/alt gr<br/>titre : $/*`, 
        `Cliquez-moi pour accéder à la page principale${name}`,
        `Cliquez sur <span class="badge rounded-pill justify-self-end bg-primary text-white text-decoration-none pb-1">!</span> pour modifier un article${name} !`,
        `Pour effacer un article${name}, cliquez sur <span class="badge rounded-pill justify-self-end bg-danger text-white text-decoration-none pb-2">x</span>`,
        `Attention${name} ! Si vous actualisez la page avant d'enregistrer, vous perdez toutes vos données !`,
        `Désolée${name}, on a un bug donc les icônes <span class="badge rounded-pill justify-self-end bg-danger text-white text-decoration-none pb-2">x</span> et <span class="badge rounded-pill justify-self-end bg-primary text-white text-decoration-none pb-1">!</span> n'apparaîssent que quand on actualise la page...<br />Me virez pas${name} ! J'ai un mari et des oisillons à nourrir !`,
    ],
    {
        vide : `Le résumé n\'est pas obligatoire${name}, mais il faut au moins un titre et un contenu !`,
        balise : `Est-ce que vous avez bien refermé toutes vos balises${name} ? chaque < doit avoir son pendant >`

    }
]
function HeatherHelpPass(response) {

    console.log(response);
    console.log(response.status);
    console.log(passInput.value);
    heatherDivPass.style.opacity = '1';

    heatherSvg.addEventListener('click', function() {

        if (passInput.value == '') {
            heatherText.innerHTML = heatherTab[3];
        } else {
            if (response.status == 401) {
                //* unauthorized
                heatherText.innerHTML = heatherTab[0];
            } else if (response.status == 500) {
                //* err serveur
                heatherText.innerHTML = heatherTab[1];
            } else {
                let index = Math.floor(Math.random() * (heatherTab[2].length));
                heatherText.innerHTML = heatherTab[2][index];
                console.log(response.status);
            }
        }
    });

}
//* titre

let heatherDivZero = document.querySelector('.salutations > div');
let heatherTitre = document.querySelector('.salutations > .heather');
let heatherTitreTxt = document.querySelector('.salutations > .heather > p');
let heatherTitreSvg = document.querySelector('.salutations > .heather > svg');

let colorTab = [
    'text-primary',
    'text-warning',
    // 'text-secondary',
    'text-success',
    'text-danger'
    // 'text-dark',
    // 'text-info'
]

let index = Math.floor(Math.random() * (heatherTab[4].length));
heatherTitreTxt.innerHTML = heatherTab[4][index];
// heatherTitreTxt.setAttribute('class', colorTab[colorIndex]);
// heatherTitreSvg.setAttribute('class', colorTab[colorIndex]);
//* Help
// heatherDivZero.style.display = "none";
// heatherDivZero.style.cursor = 'pointer';

let heatherBlogDiv = document.querySelector('.blog > .heather');
heatherBlogDiv.style.opacity = '0';

let heatherBlogSvg = document.querySelector('.blog > .heather > svg');
let heatherBlogText = document.querySelector('.blog > .heather > p');
// heatherDiv.style.display = "none";

function verifForm () {
    console.log('VERIF FORM');
    // console.log(titleInput.value);
    let colorIndex = Math.floor(Math.random() * (colorTab.length));
    heatherBlogText.setAttribute('class', colorTab[colorIndex]);
    heatherBlogSvg.setAttribute('class', colorTab[colorIndex]);
    //* S'il n'y a pas de titre ou pas de contenu
    if (titleInput.value == '' || articleInput.value == '') {
        heatherBlogDiv.style.opacity = '1';
        heatherDivZero.style.opacity = '0';
        heatherBlogText.innerHTML = heatherTab[5].vide;
        return false;
    } else if (!verifBalises(articleInput.value)) {
        // let article = articleInput.value;
        // verifBalises(article);
        heatherBlogDiv.style.opacity = '1';
        heatherDivZero.style.opacity = '0';
        heatherBlogText.innerHTML = heatherTab[5].balise;
        return false;
    } else {
        return true;
    }
}

function verifBalises(article) {
    //! faire un cas : si < n'est pas suivi de s ou e
    console.log('VERIF BALISES');
    // let article = articleInput.value;
    console.log(article);
    // let article = articleInput.value;
    //* S'il n'y a pas le même nombre de balises < et >
    function nbBalise(balise, article)
    {
        x = article.split(balise);
        occurence = x.length-1;
        return occurence;
    }
    // console.log(nbBalise('<',article));
    // console.log(nbBalise('>',article));
    let open = nbBalise('<',article);
    let close = nbBalise('>',article)
    if (open != close) {
        return false;
    } else {
        return true;
    }
    //* S'il y a le même nombre de < et > mais que c'est pas dans le bon ordre
    //! A FAIRE
}

heatherDivZero.addEventListener('click', function() {

    // alert('Vous vous redirigez vers la page principale, tout travail non sauvegardé sera perdu !');
    // let redir = confirm('Vous vous redirigez vers la page principale, tout travail non sauvegardé sera perdu !');
    if (confirm('Vous vous redirigez vers la page principale, tout travail non sauvegardé sera perdu !')) {
        document.location = 'https://nobleheather.github.io/Site-francois/Index.html';
    } else {
        console.log('on reste');
    }

});


    // let OpenBalise = article.lastIndexOf('<');
    // let CloseBalise = article.lastIndexOf('>');
    // console.log(OpenBalise, CloseBalise);
    // //* Si la dernière balise < n'est pas suivie de >
    // //! mais c'est pas uniquement ça qu'on veut
    // if (CloseBalise < OpenBalise) {
    //     return false
    // } else {
    //     // return true;
    // }
    // for (let i = 0; i < article.length; i++) {
        // console.log('<', article.indexOf('<', i), '>', article.indexOf('>', i));
        // console.log('>', article.indexOf('>', i));
        // console.log('next <', article.indexOf('<', (article.indexOf('<', i))));
        // i = article.indexOf('<', i);
    // }

    
    // return 'stop';
    // let LastBOpen = article.lastIndexOf('<');
    // let LastBCLose = article.lastIndexOf('>');
    // // let OpenB = article.indexOf('<');
    // // let CloseB = article.indexOf('>');
    // let CloseB2 = article.indexOf('>', (article.indexOf('>') + 1));
    // let OpenB2 = article.indexOf('<', (article.indexOf('<') + 1));
    // // console.log(OpenB);
    // console.log(OpenB2);
    // console.log(LastBCLose);
    // console.log(CloseB2);
    // // console.log(article.includes('<'))
    // if (article.includes('<')) {
    //     console.log('il y a une balise ouvrante');
    //     for (let i = 0; i < article.length; i++) {
    //         console.log(i);
    //         // console.log(article.indexOf('<'));
    //         let firstB = article.indexOf('<');
    //         console.log(firstB);
    //         // console.log('il y a une balise ouvrante');
    //         //* à partir de i jusqu'à < suivant
    //         let nextOpenB = article.indexOf('<', (firstB+1));
    //         let nextCloseB = article.indexOf('>', (firstB+1));
    //         console.log(nextOpenB);
    //         console.log(nextCloseB);
    //         if (nextOpenB < nextCloseB) {
    //             console.log('pas de > avant next <');
    //             return false;
    //         } else {
    //             console.log('ok');
    //         }
    //         // for (let y = i; y < article.indexOf('<', (i+1)); y++) {
    //             // if (article.includes('>', article.indexOf('<', (i+1)))) {
    //             //     console.log('il y a une balise fermante');
    //             // }
    //         // }
    //     }
    // }
    // if (article.includes('>')) {
    //     console.log('il y a une balise fermante');
    // }
    // for (let i = 0; i < LastBCLose; i++) {
    //     if (CloseB2 < 0 || OpenB2 < 0) {
    //         console.log('pas de balise');
    //         if (CloseB2 < OpenB2) {
    //             console.log('balise > avant <');
    //         } else {
    //             console.log('ok');
    //         }
    //     }
    // }
    // console.log(OpenBalise);
// }
// verifBalises();
// console.log(heatherDiv);
//* Si on affiche Heather, passer le h2 en col-3 & cacher heatherDivZero

