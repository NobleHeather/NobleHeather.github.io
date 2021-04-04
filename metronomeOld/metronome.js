//! PROBLEME : submit 3, le bout d'interval en + n'a pas la bonne durée
//? calculé sur le tempo d'après ? j'ai pourtant mis i-1 dans le calcul

//* Projets :
// Bouton pour clear localStorage

// localStorage.clear();

let interface = document.getElementById('interface');
let metronomeSettings = document.getElementById('metronomeSettings');

let cycle = document.getElementById('cycle');

let submit1 = document.getElementById('submit1');

let submit2 = document.getElementById('submit2');
submit2.style.display = "none";

let submit3 = document.getElementById('submit3');
submit3.style.display = "none";

let inputs;
let inputTempo;
let inputPuls;

let inputsTempoAll = [];
let inputsPulsAll = [];
let inputsAll = [];

let inputsAllTab = []; //* valeurs des inputs

let resume = document.getElementById('resume'); //* pour affichage
let resumeTab = []; 

let liAll = document.getElementsByTagName('li');
// console.log(liAll[0].textContent);

let fasterAll = [];
let slowerAll = [];

//// LOCAL STORAGE

//// cycle qd il revient de local storage (si utilisateur a déjà utilisé la page)
let retCycle = parseInt(localStorage.getItem("cycle"));
console.log("Last cycle :", retCycle);

//// inputsAllTab au retour de local storage (si utilisateur a déjà utilisé la page)
let retInputsAll = JSON.parse(localStorage.getItem("inputsAllTab"));
    // console.log(retInputsAll);
    //* On transforme les valeurs récupérées en chiffres 
    if (retInputsAll != null) {
        for (let i = 0; i < retInputsAll.length; i++) {
            // console.log(retInputsAll[i]);
            retInputsAll[i] = parseInt(retInputsAll[i]);
            // console.log(retInputsAll[i]);
        }
    }
console.log("Last tempo + puls :", retInputsAll);

//// On initialise les inputs avec les dernières valeurs enregistrées (si utilisateur a déjà utilisé la page)
cycle.value = retCycle;
// console.log(retCycle);

//* On crée un élément son
let son = document.createElement("audio");
// son.src = "https://bigsoundbank.com/UPLOAD/ogg/2268.ogg";
son.src = "2268.ogg";
son.volume = 0.1;
son.autoPlay = false;
son.preLoad = true;
son.controls = true;
let sonTab = ["2268.ogg", "2255.ogg", "1825.ogg", "2201.ogg"];
console.log("liste des sons :" , son.src);

//* on crée un event listener pour chaque icone son
for (let y = 0; y < liAll.length; y++) {
    (function(arg) {
        //* Quand on clique sur une icone
        liAll[y].addEventListener('click', function() {
            //* On met le son correspondant
            son.src = sonTab[y];
            console.log("son choisi :" , son.src);
            //* On passe les autres icones en noir
            for (let x = 0; x < liAll.length; x++) {
                liAll[x].style.color = "black";
            }    
            //* On passe l'icone active en coral
            liAll[y].style.color = "coral";           
        }, false);
    })(y);
}

//* quand on clique sur le 1er submit
submit1.addEventListener('click', function(e) {
    //* on empêche le formulaire de s'actualiser
    e.preventDefault();

    //// On enregistre cycle dans local storage
    // console.log(cycle.value);
    localStorage.setItem("cycle", cycle.value);
    retCycle = parseInt(localStorage.getItem("cycle"));
    console.log("nombre de cycle : " , retCycle);
    
    console.log("nombre de cycles : ", retCycle);
    //* en fonction du nombre choisi dans le input cycle 
    for (let i = 0; i < retCycle; i++) {
        //* on crée & affiche des lignes tempo/nb de puls
        let newCycle = document.createElement('div');
        newCycle.innerHTML = "<label>Tempo : </label><input /><label>Nombre de pulsation : </label><input /><button>&#x2197;</button><button>&#x2198;</button>";
       
        let labels = newCycle.querySelectorAll('label');
        let labelTempo = labels[0];
        let labelPuls = labels[1];
        labelTempo.setAttribute("for", `tempo${i}`);
        labelPuls.setAttribute("for", `puls${i}`);

        inputs = newCycle.querySelectorAll('input');
        inputTempo = inputs[0];
        inputPuls = inputs[1];
        inputTempo.setAttribute("type", "number");
        inputTempo.setAttribute("id", `tempo${i}`);
        inputPuls.setAttribute("type", "number");
        inputPuls.setAttribute("id", `puls${i}`);

        //* On crée et affiche aussi des boutons pour accélérer/décélérer
        let buttons = newCycle.querySelectorAll('button');
        fasterAll.push(buttons[0]);
        slowerAll.push(buttons[1]);
        // console.log(fasterAll);
        // console.log(slowerAll);

        //* On fait disparaître la div choix de cycle
        interface.style.display = "none";

        //* on fait apparaitre les lignes et le bouton valider suivant
        metronomeSettings.appendChild(newCycle);
        submit2.style.display = "block";
                
        // console.log(newCycle);    
    }

    //* on stock tous les inputs de metronomeSettings dans un tableau
    inputsAll = metronomeSettings.querySelectorAll('input');
    // console.log(inputsAll.length);
    //// On initialise les inputs avec les dernières valeurs enregistrées
    console.log("dernières valeurs rentrées : " , retInputsAll);
    if (retInputsAll != null) {
        for (let i = 0; i < inputsAll.length; i++) {
            // console.log(retInputsAll[i]);
            inputsAll[i].value = retInputsAll[i];
            // console.log(inputsAll[i].value);
        }
    }
});

//* quand on clique sur le 2e submit
submit2.addEventListener('click', function(e) {
    e.preventDefault();

    console.log("--A partir d'ici c'est moins clair--");
    console.log(resume); //! Pourquoi ici resume pas vide ?
    console.log(resumeTab);
    console.log(inputsAllTab);
    console.log(inputsPulsAll);
    console.log(inputsTempoAll);

    console.log(inputsAll);
    console.log(inputsAll[0].value);
    console.log(inputsAll[1].value);
    
    console.log(retInputsAll);

    // * on récupère les valeurs de tous les inputs
    //* on multiplie retCycle par 2 car 2 inputs/ligne
    for (let i = 0; i < (retCycle * 2); i++) {
        console.log(retCycle * 2);
        console.log(inputsAll[i].value);
        console.log(inputsAllTab);
        inputsAllTab.push(inputsAll[i].value);
        //* en fonction du nombre de puls, on parcourt la boucle
        if (i % 2 != 0) { // impair
            //* On ajoute les puls au tableau de puls
            inputsPulsAll.push(parseInt(inputsAll[i].value));
        } else {
            //* On ajoute les tempos au tableau de tempo
            inputsTempoAll.push(parseInt(inputsAll[i].value));
        }
    } 
    console.log(resumeTab);
    //* On met un peu en forme l'affichage
    for (let i = 0; i < retCycle; i++) {
        resumeTab.push(" [" + inputsTempoAll[i] + "-" + inputsPulsAll[i] + "]");
        // console.log(resumeTab);
    }
    console.log("valeurs pour affichage : " , resumeTab);
    //// On enregistre inputsAll sur local storage
    console.log(inputsAllTab);
    localStorage.setItem("inputsAllTab", JSON.stringify(inputsAllTab));
    retInputsAll = JSON.parse(localStorage.getItem("inputsAllTab"));
    // console.log(retInputsAll);
    //* On transforme les valeurs en nombre
    for (let i = 0; i < retInputsAll.length; i++) {
        // console.log(retInputsAll[i]);
        retInputsAll[i] = parseInt(retInputsAll[i]);
        // console.log("valeurs pour calul : " + retInputsAll[i]);
    }
    console.log("valeurs pour calul : ", retInputsAll);
    // console.log(retInputsAll);

    //* On cache les inputs
    metronomeSettings.style.display = "none";
    submit2.style.display = "none";

    //* On crée une résumé et on le fait apparaître
    let span = document.createElement('span');
    span.innerHTML = `&nbsp; Résumé des valeurs choisies (tempo + puls) :<br />${resumeTab}`;
    let span2 = document.createElement('span');
    span2.innerHTML = "&#x21BA;";
    resume.appendChild(span2);
    resume.appendChild(span);
    
    resume.style.display = "block";

    console.log(resume);
    //* On fait apparaître les boutons 3 & clear
    submit3.style.display = "block";
    
    //* On lance la fonction qui permet d'effacer les inputs
    clear();  
});

//* Fonction pour effacer les valeurs choisies (en cas d'erreur)
function clear() {

    let btnClear = resume.querySelector('span');
    console.log(btnClear);
    // console.log(resume);

    btnClear.addEventListener('click', function() {
        console.log("clear a été cliqué");
        
        //* On vide tout
        console.log("--ici on vide tout--");

        console.log("resume : " , resume); //! pourquoi déjà vide ??
        if (resume != null) {
            let delet = resume.lastChild
            delet.remove();
            let delet2 = resume.lastChild
            delet2.remove();
            console.log("resume : " , resume);
        }

        console.log("resumeTab : " , resumeTab);
        let length = resumeTab.length
        for (let i = 0; i < length; i++) {
            resumeTab.pop();
            console.log("resumeTab : " , resumeTab);
        }

        console.log("inputsAllTab : " , inputsAllTab);
        length = inputsAllTab.length
        for (let i = 0; i < length; i++) {
            // console.log(inputsAllTab.length);
        inputsAllTab.pop();
        console.log("inputsAllTab : " , inputsAllTab);
    }

        console.log("inputsPulsAll : " , inputsPulsAll);
        length = inputsPulsAll.length
        for (let i = 0; i < length; i++) {
        // console.log(inputsPulsAll.length);
        inputsPulsAll.pop();
        console.log("inputsPulsAll : " , inputsPulsAll);
        }

        console.log("inputsTempoAll : " , inputsTempoAll);
        length = inputsTempoAll.length
        for (let i = 0; i < length; i++) {
        // console.log(inputsTempoAll.length);
        inputsTempoAll.pop();
        console.log("inputsTempoAll : " , inputsTempoAll);
        }
        
        console.log("---trucs vides---");
        console.log("resume : " , resume);
        console.log("resumeTab : " , resumeTab);
        console.log("inputsAllTab : " , inputsAllTab);
        console.log("inputsPulsAll : " , inputsPulsAll);
        console.log("inputsTempoAll : " , inputsTempoAll);

        //* On conserver les anciennes valeurs de inputsAll pour remplissage auto des inputs
        console.log("anciennes valeurs pour remplissage auto : ", inputsAll);
        console.log(inputsAll[1].value);

        console.log("anciennes valeurs tjs dans local storage : ", retInputsAll);
        
        metronomeSettings.style.display = "block";
        submit2.style.display = "block";
        resume.style.display = "none";
        submit3.style.display = "none";
        btnClear.style.display = "none";
    });

}


//! avec boucle, pb de chevauchement
//* Quand on clique sur le 3e bouton
submit3.addEventListener('click', function(e) {
    //* on empêche le formulaire de s'actualiser
    e.preventDefault();

    console.log("Tous les nombres de puls : ", inputsPulsAll);
    console.log("Tous les tempos : ", inputsTempoAll);
    
    //* on tourne dans le for en fonction du nombre de cycle choisi au tout début
    //* On calcul le tempo en ms (interval = 1000/(tempo/60))
    let delayTab = [0];
    console.log("Tous les délais : ", delayTab);
    // console.log(delayTab[0]);
    for (let i = 0; i < retCycle; i++) {
        console.log("nombre de cycles : ", retCycle);
        // chiffres pour 6 puls tempo 60
        let interval = 1000/(inputsTempoAll[i]/60); //1000
        let duree = interval * inputsPulsAll[i]; //1000 * 6

        //* delay = delays précédents + duree du tour précédent 
        //!+ une fraction de interval (truc de barbare à recalculer)
        if (isNaN(inputsTempoAll[(i-1)])) { //* si interval = NaN, on ajoute pas
            delayTab.push(delayTab[i] + (1000/(inputsTempoAll[i]/60)) * (inputsPulsAll[i])); //NaN au 1er tour
            // console.log("allo ?");
        } else { //* si interval != NaN on ajoute un bout
            delayTab.push(delayTab[i] + (1000/(inputsTempoAll[i]/60)) * (inputsPulsAll[i]) + ((1000/(inputsTempoAll[(i-1)]/60))*(0.5/8))); //NaN au 1er tour
            // console.log("allo, allo ?");
        }
        // delayTab.push(delayTab[i] + (1000/(inputsTempoAll[i]/60)) * (inputsPulsAll[i]) + ((1000/(inputsTempoAll[(i)]/60))*(0.5/8))); //NaN au 1er tour
        console.log("Tous les délais : ", delayTab);
        // console.log(delayTab[i]);
        
        //* On retarde l'exécution du cycle suivant de la durée du cycle précédent
        setTimeout(function() {
            // chiffres pour 6 puls à 60
            // console.log("debut boucle " + delayTab);
            console.log(`-----cycle${i}-----`);
            console.log("délai de", delayTab[i], "ms avant cycle");
            console.log(inputsPulsAll[i] + " puls à " + inputsTempoAll[i]);
            // console.log("nb puls : ", inputsPulsAll[i]); //6
            // console.log("tempo : ", inputsTempoAll[i]); //60
            console.log("interval entre puls :", interval, "ms"); //1000
            console.log("pendant", duree, "ms");
            
            //* On play un son tous les interval
            let play = setInterval (function() {
                son.play();
                console.log("I\'m playing : " + inputsPulsAll[i] + " puls à " + inputsTempoAll[i]);
            }, interval); //1000
            
            //* On stop la fonction précédente après duree
            setTimeout(function(){
                clearInterval(play);
                console.log('I\'m stopping : ' + inputsPulsAll[i] + " puls à " + inputsTempoAll[i]);
            }, duree); //6000

        }, delayTab[i]); //0
    }
});
//! fin ici


//// TRUC TEST

let submit6 = document.getElementById('submit6');
let MetClassique = document.getElementById('MetClassique');
MetClassique.style.display = "none";

//* Quand on clique sur le bouton, on fait apparaitre la section
submit6.addEventListener('click', function() {
    MetClassique.style.display = "block";
});

let tempoInput = document.getElementById('classique');
let interval2 = 0;
//* Capte le contenu de l'input
tempoInput.addEventListener('change', function() {
    //* On calcul le tempo en ms (interval = 1000/(tempo/60))
    console.log("tempo choisi :", tempoInput.value);
    interval2 = 1000/(tempoInput.value/60);
    console.log("Un toc toutes les", interval2, "ms");
});

let submit4 = document.getElementById('submit4');
let submit5 = document.getElementById('submit5');
submit4.style.display = "block";
submit5.style.display = "none";

//* Quand on clique sur le bouton start
submit4.addEventListener('click', function(e) {
    e.preventDefault();

    submit5.style.display = "block";
    submit4.style.display = "none";

    //* On lance le métronome
    let play = setInterval (function() {
        son.play();
        console.log("playing at", tempoInput.value, "every", interval2, "ms");
    }, interval2);

    // setTimeout(function(){
    //     clearInterval(play);
    // }, 5000);
    //* On fait apparaître un bouton stop à la place du start
    submit5.addEventListener('click', function(e) {
        e.preventDefault();
        
        //* Qui permet de stopper le métronome
        clearInterval(play);
        console.log("stopped");

        submit5.style.display = "none";
        submit4.style.display = "block"; 
    
    });

});

//TRUC INUTILE

function ok() {
    console.log("OK !");
    console.log("Je suis une fonction qui dit 'ok !'");
    console.log("C'est moi la fonction la plus inutile du monde !");
    console.log("OK ?");
    console.log("OK ! ! !");
}