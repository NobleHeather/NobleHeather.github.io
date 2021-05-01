//! PROBLEMES :
//! bug dans l'affichage de Lenny & Carl et Garfunkel au niveau img et description
//! Quand on actualise, ça vide local storage, car choixNounoursTab initialisé comme tableau vide

// localStorage.clear();

////PANIER
//? Comment faire + DRY ?

//* NAVIGUER D'UNE PELUCHE A L'AUTRE

let btnAutrePeluche = document.getElementById('autrePeluche');
let DivImgNavPeluche = document.getElementById('imgNavPeluche');

DivImgNavPeluche.style.display = 'none'; //!mettre ça dans sass
// DivImgNavPeluche.style.border = '1px solid black';

btnAutrePeluche.addEventListener('click', function() {
    DivImgNavPeluche.style.display = 'block'; //!mettre une transition
});

//* ici on capture les emplacements, pour navigation voir au début de setTimeout
let imgNavPeluche = document.querySelectorAll('#imgNavPeluche > img');
//! mettre les bonnes peluches avec les bonnes images
let imgGustav = imgNavPeluche[0];
let imgArnold = imgNavPeluche[1];
let imgLennyCarl = imgNavPeluche[2];
let imgNorbert = imgNavPeluche[3]; 
let imgGarfunkel = imgNavPeluche[4];

imgGustav.style.border = "1px solid black"

//* NAVIGUER DANS LA CARTE

let cardPerso = document.getElementById('cardPerso');
let cardBio = document.getElementById('cardBio');
let cardDetail = document.getElementById('cardDetail');

let contenuCard = document.querySelectorAll(".card-body > div");
let personnaliser = contenuCard[0];
let bio = contenuCard[1];
let detail = contenuCard[2];

// personnaliser.style.border = "1px solid green";
// bio.style.border = "1px solid blue";
// detail.style.border = "1px solid red";

//* quand on clique sur les onglets, afficher contenu onglet et masquer les autres
//* + passer onglet en active
cardPerso.addEventListener('click', function() {
    // personnaliser.style.opacity = "1";
    // bio.style.opacity = "0";
    // detail.style.opacity = "0";
    personnaliser.style.display = "block";
    bio.style.display = "none";
    detail.style.display = "none";
    cardPerso.setAttribute('class', 'nav-link active');
    cardBio.setAttribute('class', 'nav-link');
    cardDetail.setAttribute('class', 'nav-link');
});
cardBio.addEventListener('click', function() {
    // personnaliser.style.opacity = "0";
    // bio.style.opacity = "1";
    // detail.style.opacity = "0";
    personnaliser.style.display = "none";
    bio.style.display = "block";
    detail.style.display = "none";
    cardBio.setAttribute('class', 'nav-link active');
    cardPerso.setAttribute('class', 'nav-link');
    cardDetail.setAttribute('class', 'nav-link');
});
cardDetail.addEventListener('click', function() {
    // personnaliser.style.opacity = "0";
    // bio.style.opacity = "0";
    // detail.style.opacity = "1";
    personnaliser.style.display = "none";
    bio.style.display = "none";
    detail.style.display = "block";
    cardDetail.setAttribute('class', 'nav-link active');
    cardPerso.setAttribute('class', 'nav-link');
    cardBio.setAttribute('class', 'nav-link');
});

//* AJOUTER AU PANIER

//* choix de quantité
let quantiteSelect = document.getElementById('quantiteSelect');
let quantite = 0;

quantiteSelect.addEventListener('change', function() {
    quantite = quantiteSelect.selectedIndex + 1; //* pour que index = quantite
    console.log(quantite);
    if (quantite == 4) {
        alert("Vous allez acheter 10 nounours : 9 + 1 gratuit !");
    }
});

//* choix de couleur
let couleurSelect = document.getElementById('couleurSelect');
let couleur = 0; //* pour choix par défaut dans le select

couleurSelect.addEventListener('change', function() {
    couleur = couleurSelect.selectedIndex;
    console.log(couleur);
});
    //* on capture le contenu des option pour remplacer par les couleurs du tableau de couleur (récupéré dans GETinfosNounours.js)
let options = document.querySelectorAll('#couleurSelect > option');
let option1 = options[0];
let option2 = options[1];
let option3 = options[2];
let option4 = options[3];
// console.log(option1);

//* Récupérer autres infos dans la card
let nom = document.querySelector('h3');
let details = document.querySelectorAll('.detail > p');
let codeProduitTag = details[1];
let prixTag = details[2];
let descriptionTag = details[3];
//* récupérer image
let imgPeluche = document.getElementById('imgPeluche');

//* footer carte et icones du footer carte pour interaction utilisateur (eventListener)
let iconesPanier = document.querySelectorAll("#footerPeluche > svg");
let iconeLight = iconesPanier[0];
let iconeDark = iconesPanier[1]

let footerPeluche = document.getElementById('footerPeluche');

//* variables qui vont être remplacée par infos peluches
//* quand utilisateur clique sur les img de peluches dans bouton voir autre peluche
let pelucheColorTab;
let pelucheID;
let pelucheName;
let peluchePrice;
let pelucheImg;
let pelucheDescription;
//* Si l'utilisateur achète plusieurs nounours
let choixNounoursTab = [];
localStorage.setItem("choixNounoursTab", JSON.stringify(choixNounoursTab));
// console.log(JSON.parse(localStorage.getItem("choixNounoursTab")));

setTimeout(() => { //! Bon ça c'est toujours pas idéal
    if (requestGetAll.readyState == XMLHttpRequest.DONE && requestGetAll.status == 200) {
        
        // localStorage.clear();
        //* AFFICHAGE

        //* Par défaut, on affiche Norbert :
        pelucheColorTab = norbertColorTab;
        pelucheID = norbertID;
        pelucheName = norbertName;
        peluchePrice = norbertPrice;
        pelucheImg = norbertImg;
        pelucheDescription = norbertDescription;
        //* On initialise ça ici pour s'en servir dans affichage() et panier()
        let couleur1 = pelucheColorTab[0];
        let couleur2 = pelucheColorTab[1];
        let couleur3 = pelucheColorTab[2];
        let couleur4 = pelucheColorTab[3];
        console.log(pelucheColorTab);
        console.log(couleur1);
        affichage();
        // Et on donne la possibilité de l'ajouter au panier :
        panier();

        //* si l'utilisateur clique sur une autre peluche, on l'affiche
        imgNorbert.addEventListener('click', function() {
            pelucheColorTab = norbertColorTab;
            pelucheID = norbertID;
            pelucheName = norbertName;
            peluchePrice = norbertPrice;
            pelucheImg = norbertImg;
            pelucheDescription = norbertDescription;
            affichage();
            // panier();
        });
        imgArnold.addEventListener('click', function() {
            pelucheColorTab = arnoldColorTab;
            pelucheID = arnoldID;
            pelucheName = arnoldName;
            peluchePrice = arnoldPrice;
            pelucheImg = arnoldImg;
            pelucheDescription = arnoldDescription;
            affichage();
            // panier();
        });
        imgLennyCarl.addEventListener('click', function() {
            pelucheColorTab = lennyCarlColorTab;
            pelucheID = lennyCarlID;
            pelucheName = lennyCarlName;
            peluchePrice = lennyCarlPrice;
            pelucheImg = lennyCarlImg;
            pelucheDescription = lennyCarlDescription;
            // console.log(lennyCarlImg);
            // console.log(lennyCarlDescription);
            affichage();
            // panier();
        });
        imgGarfunkel.addEventListener('click', function() {
            pelucheColorTab = garfunkelColorTab;
            pelucheID = garfunkelID;
            pelucheName = garfunkelName;
            peluchePrice = garfunkelPrice;
            pelucheImg = garfunkelImg;
            pelucheDescription = garfunkelDescription;
            affichage();
            // panier();
        });
        imgGustav.addEventListener('click', function() {
            pelucheColorTab = gustavColorTab;
            pelucheID = gustavID;
            pelucheName = gustavName;
            peluchePrice = gustavPrice;
            pelucheImg = gustavImg;
            pelucheDescription = gustavDescription;
            affichage();
            // panier();
            // console.log(pelucheName);
        });

        function affichage() {

            //* On remplace les infos par défaut avec infos de la peluche
            imgPeluche.src = pelucheImg;
            nom.innerHTML = pelucheName;
            codeProduitTag.innerHTML = `<p><em>Code produit : </em>${pelucheID}</p>`;
            descriptionTag.innerHTML = `<p><em>Description : </em>${pelucheDescription}</p>`;
    
            //* On affiche le prix sans les 00 et avec €
            peluchePrice = (peluchePrice / 100) + '€';
            console.log(peluchePrice);
            prixTag.innerHTML = `<p><em>Prix : </em>${peluchePrice}</p>`;

            //* options de couleur
            //! prévoir une boucle for pour le cas où pas 4 couleurs
            //* on récupère les couleurs dans le tableau de couleur
            couleur1 = pelucheColorTab[0];
            couleur2 = pelucheColorTab[1];
            couleur3 = pelucheColorTab[2];
            couleur4 = pelucheColorTab[3];
            console.log(pelucheColorTab);

            //*On modifie les options du select avec les couleurs de la peluche actuelle
            //! faire une boucle pour supprimer/griser les undefined
            option1.innerHTML = `<option value="${couleur1}" selected>${couleur1}</option>`;
            option2.innerHTML = `<option value="${couleur2}">${couleur2}</option>`;
            option3.innerHTML = `<option value="${couleur3}">${couleur3}</option>`;
            option4.innerHTML = `<option value="${couleur4}">${couleur4}</option>`;
            console.log(option2.innerHTML);
        }

        function panier() {     
            // localStorage.clear();

            //* Quand on clique sur le footer de la carte
            //? iconeLight.addEventListener('click', function() { //? pourquoi fonctionne pas ici ? //on s'en fout, ça fonctionne globalement
            footerPeluche.addEventListener('click', function() {
                //* on passe de icone light à icone dark
                iconeDark.style.opacity = '1';
                //* on ajoute le choix de l'utilisateur au panier :
                //* couleur
                let choixNounours = [];
                console.log(couleur);
                switch (couleur) {
                    case 0:
                        choixNounours.push(`${couleur1}`); //choix par défaut
                        break;
                    case 1:
                        choixNounours.push(`${couleur2}`);
                        break;
                    case 2:
                        choixNounours.push(`${couleur3}`);
                        break;
                    case 3:
                        choixNounours.push(`${couleur4}`);
                        break;
                    default:
                        console.log('error couleur')
                        break;
                    }
                console.log('couleur : ' + choixNounours);
                
                switch (quantite) { //*quantite = index du select + 1
                    case 0:
                        choixNounours.push('1'); //* quantité par défaut
                        quantite = 1;
                        break;
                    case 1:
                        choixNounours.push('1');
                        break;
                    case 2:
                        choixNounours.push('2');
                        break;
                    case 3:
                        choixNounours.push('3');
                        break;
                    case 4:
                        choixNounours.push('10'); 
                        quantite = 9; //*car 1 gratuit
                        break;
                    default:
                        console.log('error quantite')
                        break;
                }

                console.log('couleur + quantite :' + choixNounours);

                //* on convertit quantité en number pour faire des calculs et on calcul prix
                quantite = parseInt(quantite);
                console.log(quantite);

                //* trouver une solution moins barbare
                console.log(prixTag.innerHTML);
                let prix = JSON.stringify(prixTag.innerHTML);
                prix = prix.replace(/<\/?[^>]+(>|$)/g, "");
                prix = prix.split(': ');
                prix = prix[1][0] + prix[1][1];
                prix = parseInt(prix);
                console.log(prix);
                
                total = prix * quantite + "€";
                console.log(total);

                //* on ajoute les autres infos
                choixNounours.push(pelucheID, pelucheName, total, pelucheDescription, pelucheImg);
                console.log(choixNounours);

                // //* On envoie/récupère les infos nounours sur local storage
                // localStorage.setItem("choixNounours", JSON.stringify(choixNounours));
                // let retrievedChoixNounours= JSON.parse(localStorage.getItem("choixNounours"));
                // console.log(retrievedChoixNounours); // tes variables sont un peu longues, Alice // Au moins c'est parlant quoi

                //* Si l'utilisateur achète plusieurs nounours d'un coup
                console.log(JSON.parse(localStorage.getItem("choixNounoursTab")));
                //* on récupère tableau vide de commande
                choixNounoursTab = JSON.parse(localStorage.getItem("choixNounoursTab"));
                console.log(choixNounoursTab);
                // retrievedChoixNounoursTab.unshift('un nounours test');
                // console.log(retrievedChoixNounoursTab);
                //* on ajoute choixNounours
                choixNounoursTab.unshift(choixNounours);
                console.log(choixNounoursTab);
                // retrievedChoixNounoursTab.unshift('un 2e nounours test');
                //* On envoie le tableau de commande sur local storage qui contient un nouveau nounours
                //* A chaque tour, on ajoute un nounours
                localStorage.setItem("choixNounoursTab", JSON.stringify(choixNounoursTab));
                choixNounoursTab = JSON.parse(localStorage.getItem("choixNounoursTab"));
                console.log(choixNounoursTab);
            });
            
        }




    }
}, 1500);

// localStorage.clear();
