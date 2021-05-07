
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
async function DisableAnsweredQuestions() {
    console.log('%c DISABLE ANSWERED QUESTIONS ', fct);
    console.log('%cRécupère numéro des questions répondues dans local storage et les envoie à DISABLE QUESTION', exp);
    // setTimeout(function() {
        await NameQuestion();

        //// On récupère Q déjà répondues dans local storage
        let disableTab = JSON.parse(localStorage.getItem("disableTab")) || [];
    
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

