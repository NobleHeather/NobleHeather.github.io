//* Pour range : affiche la valeur choisie à côté
function get_tickmarks() {
    // remplacer .replaceWith avec un équivalent de textContent omg - -"
    if (!document.querySelector('.form-range').disabled) {

        $("#choix").replaceWith("<small id='choix'>&nbsp; => Choix : </small>");
    
        // console.log(document.getElementById(""));
        console.log(document.querySelector('.form-range').value);
    
        let val = document.querySelector('.form-range').value;
        console.log("choix = " + val);
        $("#choix").append(`${val}`);

    }
}

//* Désactive la question
function DisableQuestion(inputs) {

    console.log('FONCTION DISABLE_QUESTION');
    
    Array.from(inputs, item => {
        item.setAttribute('disabled', 'disabled')
            // console.log(inputs);
    });

}

// localStorage.removeItem('disableTab');
async function DisableAnsweredQuestions() {
    // setTimeout(function() {
        await NameQuestion();

        let disableTab = JSON.parse(localStorage.getItem("disableTab")) || [];
    
        console.log(disableTab);
    
        Array.from(disableTab, Q => {
            console.log(Q)
            console.log(document.querySelector(`#question4`));
            console.log(document.querySelector(`#question${Q}`));
            let inputs = document.querySelectorAll(`#question${Q} input`)
            console.log(inputs);
            DisableQuestion(inputs);
        })
    // }, 1000);

}
// DisableAnsweredQuestions();

