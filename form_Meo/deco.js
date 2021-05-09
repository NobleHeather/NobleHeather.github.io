//* Dans la section 0 souvenirs visuels, en fonction du nombre de fieldset
function NameQuestion() {
    console.log('%c NAME QUESTION ', fct);
    console.log('%cAttribue des id à tous les éléments du form', exp)

    for (let x = 0; x < $('#SouvenirsVisuels fieldset').length; x++) {
    
        //* On nomme chaque fieldset avec un numéro de question, idem pour button & canvas
        //todo NB : c'est une class et pas un id car on a des id "hidden" pour les toggle btn //Du coup j'ai mis les truc toggle dans des div
        $(`#SouvenirsVisuels fieldset:eq(${x})`).attr('id', `question${x}`);
        $(`#SouvenirsVisuels fieldset:eq(${x}) button`).attr('id', `validerQ${x}`);
        $(`#SouvenirsVisuels fieldset:eq(${x}) button + a`).attr('href', `#collapse${x}`);
        $(`#SouvenirsVisuels fieldset:eq(${x}) + .graph .collapse`).attr('id', `collapse${x}`);
        $(`#SouvenirsVisuels fieldset:eq(${x}) + .graph canvas`).attr('id', `canevas${x}`);
    
        //* On nomme les inputs et les labels de ce fieldset en fonction du numéro de question
        for (let i = 0; i < $(`#question${x} input`).length; i++) {
            $(`#question${x} input:eq(${i})`).attr('id', `q${x}_${i}`);
            $(`#question${x} input:eq(${i})`).attr('name', `q${x}`);
            $(`#question${x} input:eq(${i}) + label`).attr('for', `q${x}.${i}`);
        }
    }
}
NameQuestion();

//* Pour range : affiche la valeur choisie à côté
function get_tickmarks() {
    // remplacer .replaceWith avec un équivalent de textContent omg - -"
    if (!document.querySelector('.form-range').disabled) {

        $("#choix").replaceWith("<small id='choix'>&nbsp; => Choix : </small>");
    
        // console.log(document.getElementById(""));
        // console.log(document.querySelector('.form-range').value);
    
        let val = document.querySelector('.form-range').value;
        console.log("%cvar val (range)", vrb, val);
        $("#choix").append(`${val}`);

    }
}

//* Désactive la question
function DisableQuestion(inputs) {

    console.log('%c FONCTION DISABLE QUESTION', fct);
    console.log('%cDésactive les labels', exp)
    
    Array.from(inputs, item => {
        item.setAttribute('disabled', 'disabled')
            // console.log(inputs);
    });

}

// localStorage.removeItem('disableTab');
async function DisableAnsweredQuestions(disableTab) {
    console.log('%c DISABLE ANSWERED QUESTIONS ', fct);
    console.log('%cRécupère numéro des questions répondues dans local storage et les envoie à DISABLE QUESTION', exp);
    // setTimeout(function() {
        await NameQuestion();

        //// On récupère Q déjà répondues dans local storage
        // let disableTab = JSON.parse(localStorage.getItem("disableTab")) || [];
    
        console.log('%cQ à désactiver :', vrb, disableTab);
    
        //* Récupère les inputs dans le html
        //* et désactive en fonction de Q récup dans local storage
        Array.from(disableTab, Q => {
            
            // console.log(Q)
            // console.log(document.querySelector(`#question4`));
            // console.log(document.querySelector(`#question${Q}`));
            let inputs = document.querySelectorAll(`#question${Q} input`)
            // console.log(inputs);
            DisableQuestion(inputs);
        })
    // }, 1000);

}
// DisableAnsweredQuestions();

