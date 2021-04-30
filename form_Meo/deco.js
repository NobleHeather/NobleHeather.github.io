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

