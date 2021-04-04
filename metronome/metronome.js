//! PROBLEME : submit 3, le bout d'interval en + n'a pas la bonne durée
//? calculé sur le tempo d'après ? j'ai pourtant mis i-1 dans le calcul
    //! UPDATE : maintenant c'est le bordel absolu

//! possible de charger le métronome avant de le lancer ? tjs imprécis au début

//! Quand on clique sur clear pour changer nb de cycle,
//! ensuite on ne peut plus ajouter de div faster/slower

// localStorage.clear();

////? AFFICHAGE OPTIONS
let cog = document.querySelector('.options > p');
let UL = document.querySelector('.options > ul');
let closeUL = document.querySelector('.options > ul > span');
let LI = document.querySelectorAll('.options > ul > li');
let trash = LI[0];
let pb = LI[1];
let FAQ = document.querySelector('.faq');
let closeFAQ = document.querySelector('.faq > span');

cog.addEventListener('click', function() {
    cog.style.transform = "translateX(-100px) rotate(-1turn)";
    cog.style.color = "coral";
    setTimeout(function() {
        $(UL).fadeIn("slow");
    }, 600);
});

closeUL.addEventListener('click', function() {
    UL.style.display = "none";
    cog.style.transform = "translateX(0) rotate(0)";
    cog.style.color = "black";
});

let memory;

trash.addEventListener('click', function() { //! fonctionne pas
    localStorage.clear();
    cycle.value = "";
    console.log("clear all values from memory");
    memory = "clear";

    if (inputsAll.length != 0) {
        for (let i = 0; i < inputsAll.length; i++) {
            // console.log(retInputsAll[i]);
            inputsAll[i].value = "";
            console.log(inputsAll[i].value);
        }
    }
});

pb.addEventListener('click', function() {
    $(FAQ).fadeIn("fast");
});

closeFAQ.addEventListener('click', function() {
    FAQ.style.display = "none";
});

////? METRONOME CONTEMPORAIN
let interface = document.getElementById('interface');
let metronomeSettings = document.getElementById('metronomeSettings');

let cycle = document.getElementById('cycle');

let submit1 = document.getElementById('submit1');

let submit2 = document.getElementById('submit2');
submit2.style.display = "none";

let submit3 = document.getElementById('submit3');
submit3.style.display = "none";

let submit7 = document.getElementById('submit7');
submit7.style.display = "none";

let submit8 = document.getElementById('submit8');

let inputs;
let inputTempo;
let inputPuls;

let inputsTempoAll = [];
let inputsPulsAll = [];
let inputsAll = [];

let inputsAllTab = []; //* valeurs des inputs

let resumeDiv = document.getElementById('resumeDiv'); //* pour affichage
resumeDiv.style.display = "none";
let resumeCycle = document.getElementById('resumeCycle'); //* pour affichage
let resume = document.getElementById('resume'); //* pour affichage
let resumeTab = []; 

let liAll = document.querySelectorAll('.sound > .row > li');
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
console.log(liAll);
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

//* fonction qui crée des div avec des inputs pour accélérer décélérer
function FasterSlower() {

    console.log(fasterAll.length);
    console.log(slowerAll.length);
    console.log(slowerAll[0]);
    console.log(slowerAll[0].value);

    //* on crée un event listener pour chaque bouton faster/slower
    for (let y = 0; y < fasterAll.length; y++) {
        
        let closeF;
        let closeFTab = [];
        let closeS;
        let closeSTab = [];
        (function(arg) {
            //* pour fermer les div faster/slower
            //* Quand on clique sur une icone
            fasterAll[y].addEventListener('click', function() {
                fasterAll[y].style.backgroundColor = "white";
                fasterAll[y].style.color = "coral";
                fasterAll[y].style.transform = "scale(1.1)";

                let newFaster = document.createElement('div');

                newFaster.innerHTML = '<button>x</button><span>&#x2197;</span><label>De puls : </label><input /><label>A puls : </label><input /><label>De tempo : </label><input /><label>A tempo : </label><input />'
                newFaster.setAttribute("class", "row faster");

                closeF = newFaster.querySelector('button'); 
                closeFTab.push(closeF);
                console.log(closeFTab);
                console.log(closeFTab.length);

                //* Pour chaque bouton close, on crée un eventlistener
                for (let y = 0; y < closeFTab.length; y++) {
                    (function(arg) {
                        //* Quand on clique le btn close
                        closeFTab[y].addEventListener('click', function() {
                            //* on fait disparaître la div newFaster
                            newFaster.style.display = "none";   
                        }, false);
                    })(y);
                }

                let labelsF = newFaster.querySelectorAll('label');
                labelsF[0].setAttribute("for", `pulsDebutF${y}`);
                labelsF[1].setAttribute("for", `pulsFinF${y}`);
                labelsF[2].setAttribute("for", `tempoDebutF${y}`);
                labelsF[3].setAttribute("for", `tempoFinF${y}`);
                
                let inputsF = newFaster.querySelectorAll('label');
                inputsF[0].setAttribute("for", `pulsDebutF${y}`);
                inputsF[1].setAttribute("for", `pulsFinF${y}`);
                inputsF[2].setAttribute("for", `tempoDebutF${y}`);
                inputsF[3].setAttribute("for", `tempoFinF${y}`);
                
                let newCycleDiv = metronomeSettings.querySelectorAll('.newCycle');
                newCycleDiv[y].appendChild(newFaster);

            }, false);

            slowerAll[y].addEventListener('click', function() {
                slowerAll[y].style.backgroundColor = "white";
                slowerAll[y].style.color = "coral";
                slowerAll[y].style.transform = "scale(1.1)";

                let newSlower = document.createElement('div');
                newSlower.innerHTML = '<button>x</button><span>&#x2198;</span><label>De puls : </label><input /><label>A puls : </label><input /><label>De tempo : </label><input /><label>A tempo : </label><input />'
                newSlower.setAttribute("class", "row slower");

                closeS = newSlower.querySelector('button'); 
                closeSTab.push(closeS);
                console.log(closeSTab);
                console.log(closeSTab.length);

                //* Pour chaque bouton close, on crée un eventlistener
                for (let y = 0; y < closeSTab.length; y++) {
                    (function(arg) {
                        //* Quand on clique le btn close
                        closeSTab[y].addEventListener('click', function() {
                            //* on fait disparaître la div newSlower
                            newSlower.style.display = "none";   
                        }, false);
                    })(y);
                }
                
                let labelsF = newSlower.querySelectorAll('label');
                labelsF[0].setAttribute("for", `pulsDebutS${y}`);
                labelsF[1].setAttribute("for", `pulsFinS${y}`);
                labelsF[2].setAttribute("for", `tempoDebutS${y}`);
                labelsF[3].setAttribute("for", `tempoFinS${y}`);
                
                let inputsF = newSlower.querySelectorAll('label');
                inputsF[0].setAttribute("for", `pulsDebutS${y}`);
                inputsF[1].setAttribute("for", `pulsFinS${y}`);
                inputsF[2].setAttribute("for", `tempoDebutS${y}`);
                inputsF[3].setAttribute("for", `tempoFinS${y}`);
                
                let newCycleDiv = metronomeSettings.querySelectorAll('.newCycle');
                newCycleDiv[y].appendChild(newSlower);

            }, false);
            
        })(y);

    }
    
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

    //* On affiche le nombre de cycle choisi
    resumeDiv.style.display = "block";
    resumeCycle.innerHTML = `&nbsp; Nombre de cycles : ${retCycle}`;
    //* et un bouton pour revenir en arrière et changer le nb de cycles
    //* Quand on clique sur le bouton, on change l'affichage et on vide l'input cycle
    submit8.addEventListener('click', function() {
        interface.style.display = "block";
        metronomeSettings.innerHTML = "";
        resumeDiv.style.display = "none";
        submit2.style.display = "none";
        cycle.value = "";
    });
    
    console.log("nombre de cycles : ", retCycle);
    //* en fonction du nombre choisi dans le input cycle 
    for (let i = 0; i < retCycle; i++) {
        //* on crée & affiche des lignes tempo/nb de puls
        let newCycle = document.createElement('div');
        newCycle.innerHTML = "<div><label>Tempo : </label><input /><label>Nombre de pulsation : </label><input /><button>&#x2197;</button><button>&#x2198;</button></div>";
        newCycle.setAttribute("class", "newCycle");

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
        console.log(buttons);
        console.log(fasterAll);
        console.log(slowerAll);

        //* Quand on a créé toutes les lignes, on lance la fonction pour accélérer/décélérer

        if (i == (retCycle - 1)) {
            console.log(i);
            FasterSlower();
        }

        //* On fait disparaître la div choix de cycle
        interface.style.display = "none";

        //* on fait apparaitre les lignes, le bouton valider suivant
      
        metronomeSettings.appendChild(newCycle);
        submit2.style.display = "block";
                
        // console.log(newCycle);    
    }

    //* on stock tous les inputs de metronomeSettings dans un tableau
    inputsAll = metronomeSettings.querySelectorAll('input');
    console.log(inputsAll);
    //// On initialise les inputs avec les dernières valeurs enregistrées
    console.log("dernières valeurs rentrées : " , retInputsAll);
    if (retInputsAll != null) {
        if (memory == "clear") {
            for (let i = 0; i < inputsAll.length; i++) {
                // console.log(retInputsAll[i]);
                inputsAll[i].value = "";
                console.log(inputsAll[i].value);
            }
        } else {
            for (let i = 0; i < inputsAll.length; i++) {
                // console.log(retInputsAll[i]);
                inputsAll[i].value = retInputsAll[i];
                // console.log(inputsAll[i].value);
            }
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
    resumeDiv.style.display = "none";
    submit2.style.display = "none";
    submit8.style.display = "none";

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
        submit3.style.display = "none";
        btnClear.style.display = "none";
        resumeDiv.style.display = "block";
        submit8.style.display = "block";
    });

}

//* Quand on clique sur le 3e bouton
submit3.addEventListener('click', function(e) {
    //* on empêche le formulaire de s'actualiser
    e.preventDefault();

    //* On remplace le bouton start par un bouton stop
    submit3.style.display = "none";
    submit7.style.display = "block";

    let state = "playing";
    let play;

    //* Le bouton stop permet de stopper le métronome avant la fin de tous les cycles
    submit7.addEventListener('click', function(e) {
        e.preventDefault();
        
        //* Qui permet de stopper le métronome
        clearInterval(play);
        state = "stopped all";
        console.log("btn stop");
        // console.log("stopped all");

        //* et de faire réapparaître bouton start
        submit3.style.display = "block";
        submit7.style.display = "none"; 
    });

    console.log("Tous les nombres de puls : ", inputsPulsAll);
    console.log("Tous les tempos : ", inputsTempoAll);
    
    //* on tourne dans le for en fonction du nombre de cycle choisi au tout début
    //* On calcul le tempo en ms (interval = 1000/(tempo/60))
    let delayTab = [0];
    // console.log("Tous les délais : ", delayTab);
    // console.log(delayTab[0]);
 
    //! pb de chevauchement entre les cycles
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
            delayTab.push(delayTab[i] + (1000/(inputsTempoAll[i]/60)) * (inputsPulsAll[i]) + /*interval*/ 1000/(inputsTempoAll[(i-1)]/60)); //((1000/(inputsTempoAll[(i-1)]/60))*(0.5/8)))
            // console.log("allo, allo ?");
        }
        // delayTab.push(delayTab[i] + (1000/(inputsTempoAll[i]/60)) * (inputsPulsAll[i]) + ((1000/(inputsTempoAll[(i)]/60))*(0.5/8))); //NaN au 1er tour
        console.log("Tous les délais : ", delayTab);
        // console.log(delayTab[i]);
        
        //* si on n'a pas appuyé sur bouton stop, on rentre dans la boucle
        
            //* On retarde l'exécution du cycle suivant de la durée du cycle précédent
        setTimeout(function() {
            // chiffres pour 6 puls à 60
            if (state == "playing") {
                
                console.log(`-----cycle${(i+1)}-----`);
                console.log("state :", state);
                console.log("délai de", delayTab[i], "ms avant cycle");
                console.log(inputsPulsAll[i] + " puls à " + inputsTempoAll[i]);
                // console.log("nb puls : ", inputsPulsAll[i]); //6
                // console.log("tempo : ", inputsTempoAll[i]); //60
                console.log("interval entre puls :", interval, "ms"); //1000
                console.log("pendant", duree, "ms");
                
                //* On play un son tous les interval
                play = setInterval (function() {
                    son.play();
                    console.log("I\'m playing : " + inputsPulsAll[i] + " puls à " + inputsTempoAll[i]);
                }, interval); //1000
                
                //* On stop la fonction précédente après duree
                setTimeout(function(){
                    clearInterval(play);
                    console.log('I\'m stopping : ' + inputsPulsAll[i] + " puls à " + inputsTempoAll[i]);
                }, duree); //6000

            //* Si on a appuyé sur bouton stop
            } else if (state == "stopped all") {
                console.log("state :", state);
            } else {
                console.log("error");
            }

        }, delayTab[i]); //0
    }
});
//! fin ici


////? METRONOME CLASSIQUE

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